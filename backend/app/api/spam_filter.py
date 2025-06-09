from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.spam import SpamMessage
from app.schemas.spam import SpamMessageCreate, SpamMessageResponse
from app.ml.spam_detector import SpamDetector
from typing import List
import os
from dotenv import load_dotenv
from app.api.auth import get_current_user

load_dotenv()

router = APIRouter()
spam_detector = SpamDetector()

@router.post("/check", response_model=SpamMessageResponse)
async def check_spam(
    message: SpamMessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if message is spam using ML model
    is_spam, confidence_score = spam_detector.predict(message.content)
    
    # Create spam message record
    db_message = SpamMessage(
        user_id=current_user.id,
        message_type=message.message_type,
        sender=message.sender,
        content=message.content,
        is_spam=is_spam,
        confidence_score=confidence_score
    )
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    return db_message

@router.get("/spam-list", response_model=List[SpamMessageResponse])
async def get_spam_list(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    spam_messages = db.query(SpamMessage).filter(
        SpamMessage.user_id == current_user.id,
        SpamMessage.is_spam == True
    ).all()
    return spam_messages

@router.delete("/spam/{message_id}")
async def delete_spam_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    message = db.query(SpamMessage).filter(
        SpamMessage.id == message_id,
        SpamMessage.user_id == current_user.id
    ).first()
    
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db.delete(message)
    db.commit()
    return {"message": "Spam message deleted successfully"} 