# 🏥 AI Medical Chatbot (React + LangChain)

A full-stack AI medical chatbot with a modern **React** frontend and a **Python (Flask)** backend.
Uses a **Retrieval-Augmented Generation (RAG)** pipeline (LangChain) + **Pinecone** + **Groq** for fast, context-aware medical answers.



---

## 🔗 Live Demo

[Open Live Demo](https://medical-chatbot-ui-m0h7.onrender.com) *(replace with your real link)*

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Quickstart (Local)](#quickstart-local)

   * [Prerequisites](#prerequisites)
   * [Backend Setup](#backend-setup)
   * [Frontend Setup](#frontend-setup)
5. [Environment Variables](#environment-variables)
6. [Run with Docker (optional)](#run-with-docker-optional)
7. [Deployment (Render)](#deployment-render)
8. [API Examples](#api-examples)
9. [Project Structure](#project-structure)
10. [Contributing](#contributing)
11. [License & Contact](#license--contact)

---

## Features

* Modern, responsive React UI (Vite + Tailwind)
* Retrieval-Augmented Generation using **LangChain**
* Fast inferencing via **Groq LPU**
* Semantic search with **Pinecone** vector DB
* Decoupled frontend & backend for scalable deployment
* Containerized (optional) for reproducible builds

---

## Tech Stack

| Layer            | Technology                             |
| ---------------- | -------------------------------------- |
| Frontend         | React, Vite, Tailwind CSS              |
| Backend          | Python, Flask (Gunicorn in production) |
| RAG / AI         | LangChain, Groq API (LLaMA3 8B)        |
| Vector DB        | Pinecone                               |
| Deployment       | Render (static site + web service)     |
| Containerization | Docker (optional)                      |

---

## Architecture

```
User → React UI (Static Site)
         └── /get API call ──▶ Flask Backend (LangChain RAG)
                                  ├─▶ Pinecone (retrieve docs)
                                  └─▶ Groq LPU (generate answer)
```

---

## Quickstart (Local)

### Prerequisites

* Node.js v18+
* Python 3.9+
* Git
* Pinecone API key
* Groq API key

### Clone

```bash
git clone https://github.com/atharvnikam38/AI-Medical-Chatbot.git
cd AI-Medical-Chatbot
```

---

### Backend Setup (Flask)

```bash
cd backend

# create virtualenv
python -m venv venv
# mac / linux
source venv/bin/activate
# windows (PowerShell)
venv\Scripts\Activate.ps1

# install
pip install -r requirements.txt

# create .env (see Environment Variables section)
cp .env.example .env

# run (development)
python app.py
# or (prod-like) with gunicorn
# gunicorn --bind 0.0.0.0:10000 app:app
```

Backend default: `http://localhost:10000`

---

### Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend default: `http://localhost:5173`

> If frontend needs to proxy `/get` to backend in dev, configure Vite proxy in `vite.config.js`:

```js
server: {
  proxy: {
    '/get': 'http://localhost:10000'
  }
}
```

---

## Environment Variables

Create a `.env` (or use `.env.example`) in `/backend`:

```ini
# backend/.env
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENV=your_pinecone_env          # optional (region)
PINECONE_INDEX=your_pinecone_index_name
GROQ_API_KEY=your_groq_key
GROQ_MODEL=Llama-3-8b                   # optional default
FLASK_RUN_PORT=10000
```

**Do not commit** `.env` or secrets.

---

## Run with Docker (optional)

Example quick run (adjust Dockerfile in `backend` and `frontend` as needed):

```bash
# build backend image
docker build -t ai-medical-backend ./backend

# run backend
docker run -e PINECONE_API_KEY=... -e GROQ_API_KEY=... -p 10000:10000 ai-medical-backend
```

You can add a `docker-compose.yml` to orchestrate frontend + backend.

---

## Deployment (Render)

Recommended: 2 services on Render

1. **Static Site** — React build (deploy `frontend/dist`)

   * Configure static site to serve frontend assets.
   * Add rewrite rule to proxy `/get` to backend URL if necessary.
2. **Web Service** — Flask app (Gunicorn)

   * Add environment variables in Render dashboard (Pinecone & Groq keys).
   * Start command: `gunicorn --bind 0.0.0.0:$PORT app:app`

Ensure CORS settings or reverse proxy rewrites are configured so the frontend can call the backend.

---

## API Examples

### GET request (example)

```js
// fetch example from frontend
const q = encodeURIComponent("What are common symptoms of pneumonia?");
fetch(`/get?question=${q}`)
  .then(r => r.json())
  .then(res => console.log(res));
```

### Sample response

```json
{
  "answer": "Pneumonia commonly presents with cough, fever, shortness of breath...",
  "source_docs": [
    { "id": "doc1", "score": 0.88, "text": "..." }
  ],
  "metadata": { "model": "groq-lpu-llama3-8b" }
}
```

(Adjust according to your backend implementation.)

---

## Project Structure (suggested)

```
AI-Medical-Chatbot/
├─ backend/
│  ├─ app.py
│  ├─ requirements.txt
│  ├─ langchain_utils.py
│  ├─ pinecone_client.py
│  └─ .env.example
├─ frontend/
│  ├─ src/
│  ├─ package.json
│  ├─ vite.config.js
│  └─ tailwind.config.js
├─ README.md
└─ assets/
   └─ screenshot.png
```

---

## Contributing

* Fork the repo → create a feature branch → open a PR with description.
* Keep PRs small and focused.
* Add tests or manual testing steps if you change RAG / retrieval code.

---

## Troubleshooting

* `PermissionError` running `npm` on Windows: run PowerShell as Administrator or enable script execution for that session.
* If vector retrieval returns empty: confirm Pinecone index name & environment, and that embeddings were uploaded.
* For Groq errors: verify API key and model name, and ensure request payload matches Groq API expectations.

---

## License & Contact

**License:** MIT — see `LICENSE` file.
**Author:** Atharv Nikam

* Email: [atharvnikam38@gmail.com](mailto:atharvnikam38@gmail.com)
* GitHub: [https://github.com/atharvnikam38](https://github.com/atharvnikam38)

---


