from langgraph.graph import StateGraph
from app.langgraph.router import detect_intent
from app.langgraph.tools import (
    log_interaction_tool,
    edit_interaction_tool,
    fetch_interaction_tool,
    suggest_followup_tool,
    summarize_tool
)


def add_memory(state):
    history = state.get("history", [])
    history.append(state["input"])

    return {
        **state,
        "history": history
    }


def route(state):
    intent = state["intent"].lower()

    if intent == "log":
        return "log"
    elif intent == "edit":
        return "edit"
    elif intent == "fetch":
        return "fetch"
    elif intent == "followup":
        return "followup"
    elif intent == "summarize":
        return "summarize"
    else:
        return "log"


builder = StateGraph(dict)

# Nodes
builder.add_node("intent", detect_intent)
builder.add_node("memory", add_memory)
builder.add_node("log", log_interaction_tool)
builder.add_node("edit", edit_interaction_tool)
builder.add_node("fetch", fetch_interaction_tool)
builder.add_node("followup", suggest_followup_tool)
builder.add_node("summarize", summarize_tool)

# Flow
builder.set_entry_point("intent")

builder.add_edge("intent", "memory")

builder.add_conditional_edges(
    "memory",
    route,
    {
        "log": "log",
        "edit": "edit",
        "fetch": "fetch",
        "followup": "followup",
        "summarize": "summarize",
    }
)

builder.set_finish_point("log")
builder.set_finish_point("edit")
builder.set_finish_point("fetch")
builder.set_finish_point("followup")
builder.set_finish_point("summarize")

graph = builder.compile()