from langchain.tools import tool
from app.services.ai_extractor import extract_interaction_data
from app.services.interaction_service import create_interaction
from app.db.database import SessionLocal


@tool
def log_interaction(input: str) -> str:
    """Log a CRM interaction from natural language input"""

    db = SessionLocal()

    data = extract_interaction_data(input)

    interaction = create_interaction(db, data)

    return f"Interaction logged for {interaction.hcp_name}"


@tool
def summarize_interaction(input: str) -> str:
    """Summarize a CRM interaction"""

    from app.core.llm import get_llm
    llm = get_llm()

    response = llm.invoke(f"Summarize this:\n{input}")

    return response.content


@tool
def suggest_followup(input: str) -> str:
    """Suggest follow-up actions for an interaction"""

    from app.core.llm import get_llm
    llm = get_llm()

    response = llm.invoke(f"Suggest follow-up:\n{input}")

    return response.content