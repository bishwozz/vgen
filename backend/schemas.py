from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    is_admin: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class VideoBase(BaseModel):
    prompt: str

class VideoCreate(VideoBase):
    pass

class Video(VideoBase):
    id: int
    user_id: int
    url: str
    created_at: datetime

    class Config:
        from_attributes = True
