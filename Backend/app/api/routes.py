from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.schemas.interaction import InteractionCreate
from app.services import interaction_service
from app.langgraph.agent import graph

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/interaction/log")
def log_interaction(data: InteractionCreate, db: Session = Depends(get_db)):
    return interaction_service.create_interaction(db, data)

@router.post("/ai/chat")
def ai_chat(input: dict):
    result = graph.invoke({"input": input["message"]})
    return result