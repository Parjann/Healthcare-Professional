# 🧠 AI-First CRM – HCP Interaction Module

An AI-powered Customer Relationship Management (CRM) system designed for pharmaceutical field representatives to log and manage interactions with Healthcare Professionals (HCPs).

This project implements a **Log Interaction Screen** with both:

* 📝 Structured Form Input
* 💬 Conversational AI Chat Interface (LangGraph + LLM)

---

## 🚀 Project Overview

This system enables field reps to efficiently log HCP interactions using AI assistance. Instead of manually filling out forms, users can describe interactions in natural language, and the system automatically extracts and structures the data.

### Example:

> "Met Dr. Sharma, discussed oncology drug, gave 2 samples, he was positive"

➡️ Automatically converted into structured CRM data.

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Redux (State Management)
* Tailwind CSS
* Google Inter Font

### Backend

* FastAPI (Python)
* PostgreSQL (Database)
* SQLAlchemy ORM

### AI Layer

* LangGraph (Agent Workflow)
* Groq API

  * `gemma2-9b-it` (Primary Model)
  * `llama-3.3-70b-versatile` (Optional)

---

## 🧠 Key Features

* ✅ Log interactions via form
* ✅ Log interactions via AI chat
* ✅ Automatic data extraction (LLM)
* ✅ Sentiment detection (Positive / Neutral / Negative)
* ✅ Edit existing interactions
* ✅ AI-generated follow-up suggestions
* ✅ Interaction summarization
* ✅ Clean and responsive UI

---

## 🤖 LangGraph AI Agent

The LangGraph agent acts as an intelligent assistant for sales representatives.

### Responsibilities:

* Understand natural language input
* Extract structured CRM data
* Decide which tool to execute
* Maintain conversational context
* Suggest follow-up actions

---

## 🛠️ LangGraph Tools

### 1. Log Interaction Tool

* Converts chat input into structured data
* Extracts:

  * HCP Name
  * Topics
  * Sentiment
  * Materials
  * Notes
* Saves interaction to database

---

### 2. Edit Interaction Tool

* Updates existing interaction records
* Example:

  > "Change sentiment to neutral"

---

### 3. Fetch Interaction Tool

* Retrieves past interactions
* Example:

  > "Show last meeting with Dr Sharma"

---

### 4. Suggest Follow-up Tool

* Recommends next steps using AI
* Example:

  * Schedule follow-up meeting
  * Share product brochure

---

### 5. Summarize Interaction Tool

* Converts long notes into concise summaries

---

## 🧩 System Architecture

```
User (Form / Chat)
        ↓
Frontend (React + Redux)
        ↓
FastAPI Backend
        ↓
LangGraph Agent
        ↓
LLM (Groq)
        ↓
PostgreSQL Database
```

---

## 📁 Project Structure

```
backend/
│
├── app/
│   ├── main.py
│   ├── api/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── langgraph/
│
├── requirements.txt
├── .env
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/ai-crm-hcp.git
cd ai-crm-hcp
```

---

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # (Linux/Mac)
venv\Scripts\activate     # (Windows)
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Setup PostgreSQL

Create database:

```sql
CREATE DATABASE hcp_crm;
```

---

### 5. Configure Environment Variables

Create `.env` file:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/hcp_crm
GROQ_API_KEY=your_groq_api_key
```

---

### 6. Run Backend Server

```bash
uvicorn app.main:app --reload
```

---

### 7. API Documentation

Open in browser:

```
http://127.0.0.1:8000/docs
```

---

## 🔌 API Endpoints

### Interaction APIs

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| POST   | `/interaction/log`       | Create interaction |
| PUT    | `/interaction/edit/{id}` | Update interaction |
| GET    | `/interaction/{id}`      | Fetch interaction  |

---

### AI APIs

| Method | Endpoint   | Description            |
| ------ | ---------- | ---------------------- |
| POST   | `/ai/chat` | Process AI interaction |

---

## 🗄️ Database Schema

### Interaction Table

| Field     | Type    |
| --------- | ------- |
| id        | Integer |
| hcp_name  | String  |
| date      | Date    |
| time      | Time    |
| topics    | Text    |
| sentiment | String  |
| materials | Text    |
| notes     | Text    |
| follow_up | Text    |

---

## 🎥 Demo Video

A 10–15 minute walkthrough demonstrating:

* Frontend interaction logging
* AI chat functionality
* All 5 LangGraph tools
* Code structure explanation

---

## 💡 Key Highlights

* AI-first design approach
* Real-world pharma CRM use case
* LangGraph-powered decision making
* Clean modular backend architecture
* Scalable system design

---

## 📌 Future Improvements

* Role-based authentication
* Voice input support
* Advanced analytics dashboard
* Multi-HCP interaction tracking
* Offline mode for field reps

---

## 👨‍💻 Author

**Parjan Hussain**

---

## 📤 Submission

Submit via:
https://forms.gle/g76jGd47P8T86gQ69

---

## ⭐ Final Note

This project demonstrates how AI can transform traditional CRM systems into intelligent, conversational platforms, improving productivity and user experience for field representatives.

---
