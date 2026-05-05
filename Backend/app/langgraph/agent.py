from langgraph.graph import StateGraph
from app.core.llm import llm
import json

def extract_data(state):
    user_input = state["input"]

    prompt = f"""
    Extract CRM interaction data in JSON format:
    Fields: hcp_name, topics, sentiment, materials, notes

    Text: {user_input}
    """

    response = llm.invoke(prompt)

    try:
        data = json.loads(response.content)
    except:
        data = {"notes": user_input}

    return {"structured_data": data}

builder = StateGraph(dict)

builder.add_node("extract", extract_data)

builder.set_entry_point("extract")
builder.set_finish_point("extract")

graph = builder.compile()