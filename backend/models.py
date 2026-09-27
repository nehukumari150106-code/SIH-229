from datetime import datetime, timezone
import enum
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Enum,
    JSON,
)
from sqlalchemy.orm import relationship
from database import Base

class PickupStatus(str, enum.Enum):
    PENDING = "pending"
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class TransactionStatus(str, enum.Enum):
    INITIATED = "initiated"
    COMPLETED = "completed"
    FAILED = "failed"


class PickupRequest(Base):
    __tablename__ = "pickup_requests"  # Fixed missing double-underscores

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False, index=True)
    address = Column(String(255), nullable=False)
    scrap_type = Column(String(50), nullable=False)
    estimated_weight_kg = Column(Float, nullable=False)
    
    # AI & Media Fields for P1 + P6 Integration
    image_url = Column(String(500), nullable=True)
    ai_predicted_class = Column(String(50), nullable=True)
    ai_confidence = Column(Float, nullable=True)
    user_confirmed_class = Column(String(50), nullable=True)
    
    status = Column(Enum(PickupStatus), default=PickupStatus.PENDING, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    transactions = relationship("Transaction", back_populates="pickup")


class MaterialPrice(Base):
    __tablename__ = "material_prices"

    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(50), unique=True, nullable=False, index=True)
    price_per_kg = Column(Float, nullable=False)
    last_updated = Column(
        DateTime, 
        default=lambda: datetime.now(timezone.utc), 
        onupdate=lambda: datetime.now(timezone.utc), 
        nullable=False
    )


class Recycler(Base):
    __tablename__ = "recyclers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    location = Column(String(255), nullable=False)
    accepted_categories = Column(JSON, nullable=False, default=list)
    phone = Column(String(20), nullable=False)

    # Relationships
    transactions = relationship("Transaction", back_populates="recycler")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    pickup_id = Column(Integer, ForeignKey("pickup_requests.id"), nullable=False)
    recycler_id = Column(Integer, ForeignKey("recyclers.id"), nullable=False)
    final_weight_kg = Column(Float, nullable=False)
    total_payout = Column(Float, nullable=False)
    status = Column(Enum(TransactionStatus), default=TransactionStatus.INITIATED, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    pickup = relationship("PickupRequest", back_populates="transactions")
    recycler = relationship("Recycler", back_populates="transactions")
