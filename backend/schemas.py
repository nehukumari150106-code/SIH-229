from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from models import PickupStatus, TransactionStatus


# ==========================================
# 1. MATERIAL PRICE SCHEMAS
# ==========================================

class MaterialPriceBase(BaseModel):
    category_name: str
    price_per_kg: float = Field(..., gt=0, description="Price per kg must be greater than 0")


class MaterialPriceCreate(MaterialPriceBase):
    pass


class MaterialPriceResponse(MaterialPriceBase):
    id: int
    last_updated: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 2. RECYCLER SCHEMAS
# ==========================================

class RecyclerBase(BaseModel):
    name: str
    location: str
    accepted_categories: List[str]
    phone: str


class RecyclerCreate(RecyclerBase):
    pass


class RecyclerResponse(RecyclerBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 3. PICKUP REQUEST SCHEMAS
# ==========================================

class PickupRequestCreate(BaseModel):
    name: str
    phone: str
    address: str
    scrap_type: str
    estimated_weight_kg: float = Field(..., gt=0)
    image_url: Optional[str] = None
    ai_predicted_class: Optional[str] = None
    ai_confidence: Optional[float] = None
    user_confirmed_class: Optional[str] = None


class PickupRequestResponse(BaseModel):
    id: int
    name: str
    phone: str
    address: str
    scrap_type: str
    estimated_weight_kg: float
    image_url: Optional[str] = None
    ai_predicted_class: Optional[str] = None
    ai_confidence: Optional[float] = None
    user_confirmed_class: Optional[str] = None
    status: PickupStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 4. AI SERVICE SCHEMAS
# ==========================================

class AIAnalysisResponse(BaseModel):
    predicted_class: str
    confidence: float
    suggested_action: str = Field(
        ..., 
        description="'auto_accept' if confidence >= 0.85 else 'manual_selection_required'"
    )


# ==========================================
# 5. TRANSACTION SCHEMAS
# ==========================================

class TransactionCreate(BaseModel):
    pickup_id: int
    recycler_id: int
    final_weight_kg: float = Field(..., gt=0)
    total_payout: float = Field(..., ge=0)


class TransactionResponse(BaseModel):
    id: int
    pickup_id: int
    recycler_id: int
    final_weight_kg: float
    total_payout: float
    status: TransactionStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
