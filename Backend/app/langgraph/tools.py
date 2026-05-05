from app.services.ai_extractor import extract_interaction_data, extract_edit_data
from app.services.interaction_service import create_interaction, update_interaction, get_interaction, get_latest_interaction
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
        "input": user_input,
        "intent": state.get("intent")
    }


# Tool 2: Edit Interaction
def edit_interaction_tool(state):
    db = SessionLocal()

    user_input = state.get("input", "")
    updates = extract_edit_data(user_input)

    interaction_id = state.get("interaction_id")
    if not interaction_id:
        latest = get_latest_interaction(db)
        if latest:
            interaction_id = latest.id

    if interaction_id and updates:
        updated = update_interaction(db, interaction_id, updates)

    return {
        "output": "Interaction updated",
        "data": updates,
        "input": user_input,
        "intent": state.get("intent")
    }

# Tool 3: Fetch Interaction
def fetch_interaction_tool(state):
    db = SessionLocal()

    interaction_id = state.get("interaction_id")
    
    if not interaction_id:
        interaction = get_latest_interaction(db)
    else:
        interaction = get_interaction(db, interaction_id)

    data = None
    if interaction:
        data = {
            "hcp_name": interaction.hcp_name or "",
            "date": str(interaction.date) if interaction.date else "",
            "time": str(interaction.time)[:5] if interaction.time else "",
            "topics": interaction.topics or "",
            "sentiment": interaction.sentiment or "Neutral",
            "materials": interaction.materials or "",
            "notes": interaction.notes or "",
            "follow_up": interaction.follow_up or ""
        }

    output_message = "Fetched interaction details."
    if data:
        output_message = f"Fetched interaction details for {data.get('hcp_name') or 'HCP'}:\n"
        for key, value in data.items():
            if value:
                formatted_key = key.replace('_', ' ').title()
                output_message += f"- **{formatted_key}**: {value}\n"
    else:
        output_message = "No interactions found."

    return {
        "output": output_message,
        "data": data,
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