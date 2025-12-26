from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import time
import asyncio
import os
import replicate
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
import database, models, schemas
from routers.auth import get_current_active_user

router = APIRouter(prefix="/video", tags=["video"])

class VideoGenerationRequest(BaseModel):
    prompt: str

class VideoGenerationResponse(BaseModel):
    video_url: str
    status: str

@router.post("/generate", response_model=VideoGenerationResponse)
async def generate_video(
    request: VideoGenerationRequest, 
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(database.get_db)
):
    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
        
    try:
        # Check for API Token
        if not os.environ.get("REPLICATE_API_TOKEN"):
             # Fallback to mock if no token for demo purposes, or raise error
             # For now, let's keep the mock behavior if no token is present to avoid breaking the app immediately
             print("Warning: REPLICATE_API_TOKEN not set. Using mock.")
             await asyncio.sleep(2)
             mock_url = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
             
             # Save mock to DB
             db_video = models.Video(user_id=current_user.id, prompt=request.prompt, url=mock_url)
             db.add(db_video)
             db.commit()
             db.refresh(db_video)
             
             return VideoGenerationResponse(video_url=mock_url, status="completed")

        # Real Replicate Call
        output = replicate.run(
            "stability-ai/stable-video-diffusion:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            input={
                "prompt": request.prompt,
                "seconds_per_frame": 0.1,
                "video_length": "14_frames_with_svd"
            }
        )
        # Replicate returns a URL (or list of URLs)
        video_url = output if isinstance(output, str) else output[0]
        
        # Save to DB
        db_video = models.Video(user_id=current_user.id, prompt=request.prompt, url=video_url)
        db.add(db_video)
        db.commit()
        db.refresh(db_video)

        return VideoGenerationResponse(video_url=video_url, status="completed")

    except Exception as e:
        print(f"Error generating video: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history", response_model=list[schemas.Video])
def get_history(
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(database.get_db)
):
    return db.query(models.Video).filter(models.Video.user_id == current_user.id).order_by(models.Video.created_at.desc()).all()
