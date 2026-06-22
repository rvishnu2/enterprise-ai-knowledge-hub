from fastapi import FastAPI

from app.db.init_db import init_db
from app.api.auth import router as auth_router
from app.api.chat import router as chat_router

app = FastAPI()

@app.on_event("startup")

def startup():
    init_db()

app.include_router(auth_router)
app.include_router(chat_router)