from sqlalchemy import Boolean, Column, Float, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import nltk
nltk.download('punkt_tab')

class SpamMessage(Base):
    __tablename__ = "spam_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message_type = Column(String(10))  # "email" or "sms"
    sender = Column(String(255))
    content = Column(String(1000))  # Longer content for messages
    is_spam = Column(Boolean, default=True)
    confidence_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="spam_messages")