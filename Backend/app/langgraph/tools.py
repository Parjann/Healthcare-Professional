from app.services.ai_extractor import extract_interaction_data
from app.services.interaction_service import create_interaction, update_interaction, get_interaction
from app.db.database import SessionLocal
from app.core.llm import get_llm


# Tool 1: Log Interaction
def log_interaction_tool(state):
    db = SessionLocal()

    user_input = state.get("input", "")

    extracted = extract_interaction_data(user_input)

    interaction = create_interaction(db, extracted)

    return {
        "output": f"Interaction logged for {interaction.hcp_name}",
        "data": extracted,
        "input": user_input,   # 🔥 preserve state
        "intent": state.get("intent")
    }


# Tool 2: Edit Interaction
def edit_interaction_tool(state):
    db = SessionLocal()

    interaction_id = state.get("interaction_id")
    updates = state.get("updates")

    updated = update_interaction(db, interaction_id, updates)

    return {
        "output": "Interaction updated",
        "data": updates,
        "input": state.get("input"),
        "intent": state.get("intent")
    }


# Tool 3: Fetch Interaction
def fetch_interaction_tool(state):
    db = SessionLocal()

    interaction_id = state.get("interaction_id")

    interaction = get_interaction(db, interaction_id)

    return {
        "output": "Fetched interaction",
        "data": str(interaction),
        "input": state.get("input"),
        "intent": state.get("intent")
    }


# Tool 4: Suggest Follow-up
def suggest_followup_tool(state):
    llm = get_llm()

    user_input = state.get("input", "")

    prompt = f"""
    Suggest follow-up actions for this interaction:
    {user_input}
    """

    response = llm.invoke(prompt)

    return {
        "output": response.content,
        "input": user_input,
        "intent": state.get("intent")
    }


# Tool 5: Summarize Interaction
def summarize_tool(state):
    llm = get_llm()

    user_input = state.get("input", "")

    prompt = f"""
    Summarize this interaction:
    {user_input}
    """

    response = llm.invoke(prompt)

    return {
        "output": response.content,
        "input": user_input,
        "intent": state.get("intent")
    }