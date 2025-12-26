from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import video, subscription, auth, admin
from database import engine
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Video Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(video.router)
app.include_router(subscription.router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "AI Video Generator API is running"}
