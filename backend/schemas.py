from pydantic import BaseModel

class PickupRequestCreate(BaseModel):
    name: str
    phone: str
    address: str
    scrap_type: str
    estimated_weight_kg: float

class PickupRequestResponse(PickupRequestCreate):
    id: int
    is_completed: bool

    class Config:
        from_attributes = True
