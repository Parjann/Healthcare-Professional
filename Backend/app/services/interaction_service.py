from sqlalchemy.orm import Session
from app.models.interaction import Interaction

def create_interaction(db: Session, data):
    interaction = Interaction(**data.dict())
    db.add(interaction)
    db.commit()
    db.refresh(interaction)
    return interaction

def get_interaction(db: Session, interaction_id: int):
    return db.query(Interaction).filter(Interaction.id == interaction_id).first()

def update_interaction(db: Session, interaction_id: int, updates: dict):
    interaction = get_interaction(db, interaction_id)
    for key, value in updates.items():
        setattr(interaction, key, value)
    db.commit()
    db.refresh(interaction)
    return interaction