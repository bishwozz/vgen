from fastapi import APIRouter

router = APIRouter(prefix="/subscription", tags=["subscription"])

@router.get("/plans")
def get_plans():
    return [
        {
            "id": "free",
            "name": "Free",
            "price": 0,
            "features": ["1 Video per day", "Standard Quality", "Watermark"]
        },
        {
            "id": "pro",
            "name": "Pro",
            "price": 29.99,
            "features": ["Unlimited Videos", "HD Quality", "No Watermark", "Fast Generation"]
        }
    ]
