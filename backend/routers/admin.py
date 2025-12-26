from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import models, schemas, database
from routers.auth import get_current_admin

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/stats")
def get_stats(current_user: models.User = Depends(get_current_admin), db: Session = Depends(database.get_db)):
    user_count = db.query(models.User).count()
    # Mocking video count for now as we haven't stored video history in DB yet
    video_count = 154 
    return {
        "active_users": user_count,
        "total_videos_generated": video_count,
        "revenue": user_count * 29.99 # Mock revenue based on user count
    }

@router.get("/users", response_model=list[schemas.User])
def get_users(skip: int = 0, limit: int = 100, current_user: models.User = Depends(get_current_admin), db: Session = Depends(database.get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users
