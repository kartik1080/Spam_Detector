from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, spam_filter, user
from app.database import engine, Base

# Create database tables

app = FastAPI()
# origin = [
#     "http://localhost:5173"
# ] 
Base.metadata.create_all(bind=engine)
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(user.router, prefix="/api/users", tags=["Users"])
app.include_router(spam_filter.router, prefix="/api/spam", tags=["Spam Filter"])

@app.get("/")
async def root():
    return {"message": "Welcome to AI Spam Filter API"} 