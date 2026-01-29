Expense Manager 💸

A cloud-ready full-stack expense tracking application.

A modern personal finance web app for tracking daily expenses, setting budgets, and visualizing spending patterns. Built with a clean separation between frontend and backend, following real-world SaaS architecture.

✨ Features
Authentication

User registration & login

JWT-based authentication

Passwords hashed with bcrypt

Expenses

Add, edit, delete expenses

Categories: Food, Travel, Rent, Shopping, Entertainment, Custom

Filter by date & category

Budgets

Set monthly budget

View spent vs remaining

Progress indicator

Analytics

Category breakdown (pie chart)

Spending over time (line chart)

Monthly comparison (bar chart)

🛠 Tech Stack
Frontend

Next.js 14

React

Tailwind CSS

Recharts

Responsive UI (dark/light mode)

Backend

Node.js + Express

REST API

JWT authentication

MVC-style structure

Database

PostgreSQL

📂 Project Structure
expm/
├── backend/      # Express API
├── frontend/     # Next.js app
├── docs/         # Deployment notes
└── docker-compose.yml

🚀 Getting Started (Local)
1. Database (Docker)
docker run -d --name expense-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=expense_tracker \
  -p 5432:5432 postgres:15

2. Backend
cd backend
cp .env.example .env
npm install
npm run dev


Runs on: http://localhost:4000

3. Frontend
cd frontend
cp .env.example .env.local
npm install
npm run dev


Open: http://localhost:3000

🔐 Security

JWT authentication

No secrets in code (uses env variables)

Input validation on all APIs

CORS enabled

☁️ Cloud-Ready Design

The project is structured to be deployable on cloud platforms:

Frontend → S3 / Vercel / Amplify

Backend → EC2 / Render / Railway

Database → RDS / Supabase

(See docs/AWS_DEPLOYMENT.md for detailed setup)

📈 Future Ideas

Planned extensions (not implemented yet):

CSV export

Email budget alerts

AI spending insights

Mobile app (same API)

📄 License

Portfolio / educational use.
