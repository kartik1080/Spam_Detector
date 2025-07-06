# AI-Powered Spam Detection System

## Overview
This project is an AI-powered spam detection system featuring a FastAPI backend with machine learning capabilities and a modern React frontend built with Vite. The system allows users to register, log in, and check messages for spam using a trained ML model.

---

## Features
- **User Authentication**: Register, login, and manage user profiles.
- **Spam Detection**: Classifies messages as spam or not spam using a trained ML model.
- **RESTful API**: FastAPI backend for handling authentication, spam detection, and user management.
- **Modern Frontend**: Responsive React UI with Vite for fast development and build.

---

## Project Structure
```
backend/
  app/
    api/           # API endpoints (auth, spam_filter, user)
    ml/            # Machine learning model and logic
    models/        # Database models
    schemas/       # Pydantic schemas
    database.py    # Database setup
    main.py        # FastAPI app entry point
frontend/
  src/             # React source code (components, pages, contexts)
  public/          # Static assets
  index.html       # Main HTML file
  package.json     # Frontend dependencies
requirements.txt   # Python dependencies
```

---

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- (Recommended) Virtual environment for Python

### Backend Setup
1. **Create and activate a virtual environment:**
   ```powershell
   python -m venv Myvenv
   .\Myvenv\Scripts\activate
   ```
2. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```
3. **Run the FastAPI server:**
   ```powershell
   uvicorn backend.app.main:app --reload
   ```
   The API will be available at `http://127.0.0.1:8000`.

### Frontend Setup
1. **Install dependencies:**
   ```powershell
   cd frontend
   npm install
   ```
2. **Start the development server:**
   ```powershell
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

## API Endpoints
- `POST /auth/register` — Register a new user
- `POST /auth/login` — User login
- `POST /spam/detect` — Check if a message is spam
- `GET /user/profile` — Get user profile

(See `backend/app/api/` for more details.)

---

## Machine Learning
- The spam detection model is implemented in `backend/app/ml/spam_detector.py`.
- You can retrain or update the model as needed.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
This project is licensed under the MIT License.

---

## Acknowledgements
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [scikit-learn](https://scikit-learn.org/)
