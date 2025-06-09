from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SpamMessageBase(BaseModel):
    message_type: str
    sender: str
    content: str

class SpamMessageCreate(SpamMessageBase):
    pass

class SpamMessageResponse(SpamMessageBase):
    id: int
    user_id: int
    is_spam: bool
    confidence_score: float
    created_at: datetime

    class Config:
        orm_mode = True 