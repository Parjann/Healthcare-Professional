from app.core.llm import llm

def detect_intent(state):

    prompt = f"""
    Classify the intent:
    Options:
    - log
    - edit
    - fetch
    - followup
    - summarize

    Text: {state["input"]}
    Return ONLY one word.
    """

    response = llm.invoke(prompt)

    intent = response.content.strip().lower()

    return {
    "intent": intent,
    "input": state["input"]  
}