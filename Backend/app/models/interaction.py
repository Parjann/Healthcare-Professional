from sqlalchemy import Column, Integer, String, Date, Time, Text
from app.db.database import Base

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String, index=True)
    date = Column(Date)
    time = Column(Time)
    topics = Column(String)
    sentiment = Column(String)
    materials = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    follow_up = Column(String, nullable=True)
