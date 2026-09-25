import os
import httpx
from typing import List
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, status, Query
from sqlalchemy.orm import Session

import models
import schemas
from database import engine, get_db

# Initialize database schema
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kabadiwala Connect API",
    description="Backend service linking Mobile App (P1) with MobileNetV3 AI Inference (P6)",
    version="1.0.0"
)

# Route aligned with P6 active inference endpoint (/analyze)
AI_SERVICE_URL = os.getenv("AI_SERVICE_URL", "http://127.0.0.1:8001/analyze")


@app.get("/")
def home():
    return {"message": "Kabadiwala Connect Backend is running!"}


# ==========================================
# 1. AI PROXY ENDPOINT
# ==========================================

@app.post("/api/v1/ai/analyze", response_model=schemas.AIAnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Forwards user uploaded images to the P6 MobileNetV3 AI Inference service.
    Applies the 0.85 confidence guardrail.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must be an image."
        )

    try:
        # Read file bytes correctly into file_bytes
        file_bytes = await file.read()
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                AI_SERVICE_URL,
                files={"image": (file.filename, file_bytes, file.content_type)}
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"AI service error: {response.text}"
            )

        data = response.json()
        predicted_class = data.get("predicted_class", "NOT_SURE")
        confidence = float(data.get("confidence", 0.0))

        # Enforce 0.85 Confidence Guardrail
        suggested_action = "auto_accept" if confidence >= 0.85 else "manual_selection_required"

        return schemas.AIAnalysisResponse(
            predicted_class=predicted_class,
            confidence=confidence,
            suggested_action=suggested_action
        )

    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Could not connect to AI Inference service at {AI_SERVICE_URL}: {str(exc)}"
        )


# ==========================================
# 2. PRICING & RECYCLER MATCHING
# ==========================================

@app.get("/api/v1/prices", response_model=List[schemas.MaterialPriceResponse])
def get_material_prices(db: Session = Depends(get_db)):
    """Returns price per kg for all registered e-waste classes."""
    return db.query(models.MaterialPrice).all()


@app.get("/api/v1/recyclers/match", response_model=List[schemas.RecyclerResponse])
def match_recyclers(
    category: str = Query(..., description="E-waste category, e.g. CABLE_WIRE"),
    db: Session = Depends(get_db)
):
    """Filters recyclers that accept a specified e-waste category."""
    all_recyclers = db.query(models.Recycler).all()
    
    # In-memory filter for SQLite JSON compatibility
    matched = [
        recycler for recycler in all_recyclers
        if recycler.accepted_categories and category.upper() in [c.upper() for c in recycler.accepted_categories]
    ]
    return matched


# ==========================================
# 3. PICKUP REQUEST ENDPOINTS
# ==========================================

@app.post(
    "/pickups/", 
    response_model=schemas.PickupRequestResponse, 
    status_code=status.HTTP_201_CREATED,
    tags=["Pickups"]
)
def create_pickup(request: schemas.PickupRequestCreate, db: Session = Depends(get_db)):
    """Creates a pickup request with optional AI classification telemetry."""
    data = request.model_dump()
    
    # Fallback guardrail: ensure scrap_type receives a valid classification
    data["scrap_type"] = request.user_confirmed_class or request.ai_predicted_class or request.scrap_type
    
    if not data["scrap_type"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A valid scrap_type, user_confirmed_class, or ai_predicted_class must be provided."
        )

    db_pickup = models.PickupRequest(**data, status=models.PickupStatus.PENDING)
    db.add(db_pickup)
    db.commit()
    db.refresh(db_pickup)
    return db_pickup


@app.get(
    "/pickups/", 
    response_model=List[schemas.PickupRequestResponse],
    tags=["Pickups"]
)
def get_all_pickups(db: Session = Depends(get_db)):
    """Retrieves all pickup requests."""
    return db.query(models.PickupRequest).all()


# ==========================================
# 4. TRANSACTION ENDPOINTS
# ==========================================

@app.post("/api/v1/transactions", response_model=schemas.TransactionResponse, status_code=status.HTTP_201_CREATED)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    pickup = db.query(models.PickupRequest).filter(models.PickupRequest.id == transaction.pickup_id).first()
    if not pickup:
        raise HTTPException(status_code=404, detail="Pickup request not found")
        
    recycler = db.query(models.Recycler).filter(models.Recycler.id == transaction.recycler_id).first()
    if not recycler:
        raise HTTPException(status_code=404, detail="Recycler not found")

    db_transaction = models.Transaction(
        pickup_id=transaction.pickup_id,
        recycler_id=transaction.recycler_id,
        final_weight_kg=transaction.final_weight_kg,
        total_payout=transaction.total_payout,
        status=models.TransactionStatus.INITIATED
    )
    
    pickup.status = models.PickupStatus.ASSIGNED
    
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.post("/api/v1/e-waste/scan-and-match")
async def scan_and_match(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # 1. Run inference via P6 AI engine proxy
    ai_result = await analyze_image(file)
    predicted_cat = ai_result.predicted_class
    
    # 2. Query price per kg
    price_item = db.query(models.MaterialPrice).filter(
        models.MaterialPrice.category == predicted_cat
    ).first()
    
    # 3. Query matching recyclers accepting this category
    all_recyclers = db.query(models.Recycler).all()
    matched_recyclers = [
        r for r in all_recyclers
        if r.accepted_categories and predicted_cat.upper() in [c.upper() for c in r.accepted_categories]
    ]
    
    return {
        "classification": ai_result,
        "price_per_kg": price_item.price_per_kg if price_item else 0.0,
        "matched_recyclers": matched_recyclers
    }