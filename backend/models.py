from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database import Base

class PickupRequest(Base):
    __tablename__ = "pickup_requests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String)
    address = Column(String)
    scrap_type = Column(String)
    estimated_weight_kg = Column(Float)
    is_completed = Column(Boolean, default=False)
