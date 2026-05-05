from pydantic import BaseModel
from datetime import date, time

class InteractionCreate(BaseModel):
    hcp_name: str
    date: date
    time: time
    topics: str
    sentiment: str
    materials: str | None = None
    notes: str | None = None
    follow_up: str | None = None

class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True