from datetime import datetime, date
import json
import re
from app.core.llm import get_llm


def safe_json_load(text: str):
    """Extract JSON safely from LLM response"""
    try:
        return json.loads(text)
    except:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group())
        raise


def extract_interaction_data(user_input: str):
    llm = get_llm()

    current_date = datetime.now().strftime("%Y-%m-%d")
    current_time = datetime.now().strftime("%H:%M")

    prompt = f"""
You are a STRICT CRM data extraction system.

Return ONLY valid JSON. No explanation.

SCHEMA:
{{
  "hcp_name": string,
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "topics": string,
  "sentiment": "Positive" | "Neutral" | "Negative",
  "materials": string,
  "notes": string,
  "follow_up": string
}}

RULES:
- Always extract doctor names like "Dr Sharma" (never null if present)
- If "today" → use {current_date}
- If time not mentioned → use {current_time}
- Topics = main discussion (short)
- Sentiment:
    positive words → Positive
    negative words → Negative
    else → Neutral
- Materials: extract things like "2 samples", "brochure"
- Notes = short summary (NOT full sentence)
- If sentiment is Positive → suggest follow_up

EXAMPLE:
Input: Met Dr Sharma today, discussed cancer drug, gave 2 samples. He was very positive!
Output:
{{
  "hcp_name": "Dr Sharma",
  "date": "{current_date}",
  "time": "14:30",
  "topics": "cancer drug",
  "sentiment": "Positive",
  "materials": "2 samples",
  "notes": "Discussed cancer drug and provided samples",
  "follow_up": "Schedule revisit in 2 weeks"
}}

Now extract from:
{user_input}
"""

    response = llm.invoke(prompt)

    try:
        data = safe_json_load(response.content)

        # 🔥 Normalize + validate

        # Date
        if not data.get("date") or data["date"] == "today":
            data["date"] = date.today()
        else:
            data["date"] = datetime.strptime(data["date"], "%Y-%m-%d").date()

        # Time
        if not data.get("time"):
            data["time"] = current_time
        else:
            try:
                data["time"] = datetime.strptime(data["time"][:5], "%H:%M").strftime("%H:%M")
            except:
                data["time"] = current_time

        # Sentiment normalize
        if data.get("sentiment"):
            data["sentiment"] = data["sentiment"].capitalize()
        else:
            data["sentiment"] = "Neutral"

        # Hard validation
        if not data.get("hcp_name"):
            raise ValueError("hcp_name missing")

        return data

    except Exception as e:
        print("Extraction error:", e)

        return {
            "hcp_name": None,
            "date": date.today(),
            "time": current_time,
            "topics": "",
            "sentiment": "Neutral",
            "materials": "",
            "notes": user_input,
            "follow_up": ""
        }