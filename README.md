# Hacktrix Project: Financial Assistant

A sophisticated financial tracking and goal-setting application with an integrated AI assistant.

## Features

- **Mission Control**: Track financial goals (missions) with an intent-based schema.
- **Achievements**: Unlock milestones as you progress through your financial journey.
- **AI Assistant**: A specialized Goal Bot to help you refine your financial strategies.
- **Modern Stack**: Built with Next.js 15, React 19, Supabase, and LangGraph.

---

## Tech Stack

### Frontend & API
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database & Auth**: Supabase (SSR)
- **Icons**: Lucide React

### AI Assistant Service
- **Framework**: FastAPI
- **Orchestration**: LangGraph, LangChain
- **AI Models**: Ollama (local) or OpenAI
- **Communication**: WebSockets

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v20 or higher
- **Python**: v3.11 or higher
- **Supabase**: A free account at [supabase.com](https://supabase.com)
- **Ollama**: (Optional) For running local LLMs

### 2. Clone the Repository
```bash
git clone https://github.com/Aakash-Sriram/HacktrixProjec.git
cd HacktrixProjec
```

### 3. Setup Environment Variables
Copy the example environment file and fill in your Supabase credentials:
```bash
cp .env.example .env
```

### 4. Database Setup (Supabase)
1. Create a new project in your Supabase dashboard.
2. Run the SQL migrations found in `supabase/migrations/` in order:
   - `20260416193000_user_missions_and_achievements.sql`
   - `20260416201500_add_delete_policies_for_missions_and_achievements.sql`
   - `20260416213000_refactor_missions_to_intent_schema.sql`

### 5. Install Dependencies & Run Frontend
```bash
npm install
npm run dev
```
The app will be available at `http://localhost:3000`.

### 6. Setup & Run AI Assistant
1. Navigate to the service directory:
```bash
cd server/services/goal_bot
```
2. Create a virtual environment and install dependencies:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
pip install -r requirements.txt
```
3. Run the service:
```bash
uvicorn main:app --reload --port 8000
```
The AI assistant will listen for WebSocket connections at `ws://localhost:8000/ws/chat`.

---

## Project Structure

- `app/`: Next.js application routes and layouts.
- `features/`: Domain-specific components, actions, and logic (Missions, Achievements, Auth).
- `server/services/goal_bot/`: Python-based AI assistant service.
- `supabase/migrations/`: Database schema and RLS policies.
- `shared/`: Shared utilities and constants.
- `utils/supabase/`: Supabase client configuration for Server and Client components.

---

## Development

- **Formatting**: The project uses ESLint and Prettier.
- **Testing**: Run tests using `node --test` or appropriate test runners.

---

## License
[MIT](LICENSE)
