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


class LotStatus(str, enum.Enum):
    CREATED = "created"
    AVAILABLE = "available"
    SOLD = "sold"


class PickupRequest(Base):
    __tablename__ = "pickup_requests"

    id = Column(Integer, primary_key=True, index=True)

    # Customer ownership
    customer_id = Column(Integer, nullable=True, index=True)

    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False, index=True)
    address = Column(String(255), nullable=False)
    scrap_type = Column(String(50), nullable=False)

    # Customer estimated weight
    estimated_weight_kg = Column(Float, nullable=False)

    # Collector actual collected weight
    actual_weight_kg = Column(Float, nullable=True)

    # Preferred pickup time
    preferred_time = Column(String(100), nullable=True)

    # AI & Media Fields for P1 + P6 Integration
    image_url = Column(String(500), nullable=True)
    ai_predicted_class = Column(String(50), nullable=True)
    ai_confidence = Column(Float, nullable=True)
    user_confirmed_class = Column(String(50), nullable=True)

    status = Column(
        Enum(PickupStatus),
        default=PickupStatus.PENDING,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    transactions = relationship(
        "Transaction",
        back_populates="pickup"
    )

    # One pickup can create one lot
    lot = relationship(
        "Lot",
        back_populates="pickup",
        uselist=False
    )


class Lot(Base):
    __tablename__ = "lots"

    id = Column(Integer, primary_key=True, index=True)

    # Pickup from which this lot was created
    pickup_id = Column(
        Integer,
        ForeignKey("pickup_requests.id"),
        nullable=False,
        unique=True,
        index=True
    )

    # Customer-friendly / internal material category
    material_category = Column(
        String(50),
        nullable=False,
        index=True
    )

    # Final weight recorded by collector
    actual_weight_kg = Column(
        Float,
        nullable=False
    )

    status = Column(
        Enum(LotStatus),
        default=LotStatus.CREATED,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    pickup = relationship(
        "PickupRequest",
        back_populates="lot"
    )
    offers = relationship(
    "Offer",
    back_populates="lot"
)


class OfferStatus(str, enum.Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"


class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index=True)

    # Lot being offered on
    lot_id = Column(
        Integer,
        ForeignKey("lots.id"),
        nullable=False,
        index=True
    )

    # Recycler making the offer
    recycler_id = Column(
        Integer,
        ForeignKey("recyclers.id"),
        nullable=False,
        index=True
    )

    # Recycler's offered price per kg
    price_per_kg = Column(
        Float,
        nullable=False
    )

    status = Column(
        Enum(OfferStatus),
        default=OfferStatus.PENDING,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    lot = relationship(
        "Lot",
        back_populates="offers"
    )

    recycler = relationship(
        "Recycler",
        back_populates="offers"
    )
    


class MaterialPrice(Base):
    __tablename__ = "material_prices"

    id = Column(Integer, primary_key=True, index=True)

    category_name = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    price_per_kg = Column(
        Float,
        nullable=False
    )

    last_updated = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )


class Recycler(Base):
    __tablename__ = "recyclers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(100),
        nullable=False
    )

    location = Column(
        String(255),
        nullable=False
    )

    accepted_categories = Column(
        JSON,
        nullable=False,
        default=list
    )

    phone = Column(
        String(20),
        nullable=False
    )

    transactions = relationship(
        "Transaction",
        back_populates="recycler"
    )

    offers = relationship(
    "Offer",
    back_populates="recycler"
)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    pickup_id = Column(
        Integer,
        ForeignKey("pickup_requests.id"),
        nullable=False
    )

    recycler_id = Column(
        Integer,
        ForeignKey("recyclers.id"),
        nullable=False
    )

    final_weight_kg = Column(
        Float,
        nullable=False
    )

    total_payout = Column(
        Float,
        nullable=False
    )

    status = Column(
        Enum(TransactionStatus),
        default=TransactionStatus.INITIATED,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    pickup = relationship(
        "PickupRequest",
        back_populates="transactions"
    )

    recycler = relationship(
        "Recycler",
        back_populates="transactions"
    )


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    google_uid = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    role = Column(
        String(20),
        nullable=False,
        default="customer"
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )