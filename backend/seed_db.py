import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, SessionLocal, Base
import models


def seed_database():
    print("Resetting database schema...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        print("Seeding all 8 P6 material classes...")
        prices = [
            models.MaterialPrice(category_name="CABLE_WIRE", price_per_kg=45.0),
            models.MaterialPrice(category_name="COMPUTER_LAPTOP", price_per_kg=120.0),
            models.MaterialPrice(category_name="FRIDGE_AC", price_per_kg=35.0),
            models.MaterialPrice(category_name="MOBILE_TABLET", price_per_kg=150.0),
            models.MaterialPrice(category_name="NOT_SURE", price_per_kg=15.0),
            models.MaterialPrice(category_name="OTHER_ELECTRONICS", price_per_kg=25.0),
            models.MaterialPrice(category_name="TV_MONITOR", price_per_kg=40.0),
            models.MaterialPrice(category_name="WASHING_APPLIANCE", price_per_kg=30.0),
        ]
        db.add_all(prices)

        print("Seeding demo recyclers...")
        recyclers = [
            models.Recycler(
                name="EcoRecycle Hub Pune",
                location="Hadapsar Industrial Area, Pune",
                phone="+919876543210",
                accepted_categories=[
                    "COMPUTER_LAPTOP",
                    "MOBILE_TABLET",
                    "CABLE_WIRE",
                    "OTHER_ELECTRONICS"
                ]
            ),
            models.Recycler(
                name="Green Scrap Solutions",
                location="Pimpri MIDC, Pune",
                phone="+919812345678",
                accepted_categories=[
                    "FRIDGE_AC",
                    "WASHING_APPLIANCE",
                    "TV_MONITOR",
                    "CABLE_WIRE",
                    "NOT_SURE"
                ]
            )
        ]
        db.add_all(recyclers)

        db.commit()
        print("Database seeded successfully.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
