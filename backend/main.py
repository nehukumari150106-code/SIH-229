from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Kabadiwala Backend is running!"}

# Create a new scrap pickup request
@app.post("/pickups/", response_model=schemas.PickupRequestResponse)
def create_pickup(request: schemas.PickupRequestCreate, db: Session = Depends(get_db)):
    new_pickup = models.PickupRequest(**request.model_dump())
    db.add(new_pickup)
    db.commit()
    db.refresh(new_pickup)
    return new_pickup

# Get all scrap pickup requests
@app.get("/pickups/", response_model=list[schemas.PickupRequestResponse])
def get_all_pickups(db: Session = Depends(get_db)):
    return db.query(models.PickupRequest).all()
