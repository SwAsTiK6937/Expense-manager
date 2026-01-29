# Cloud-Based Expense Tracker

A SaaS-style personal finance web application for tracking daily expenses, categorizing spending, setting monthly budgets, and viewing analytics. Built for the cloud with a clear separation between frontend, backend API, and database.

## Product Vision

**"People don't know where their money goes."**

This app helps users:
- Track daily expenses with categories (Food, Travel, Rent, Shopping, Entertainment, Custom)
- Set monthly budgets and see remaining balance
- View analytics: category breakdown (pie), spending over time (line), monthly comparison (bar)
- Access data securely from anywhere via cloud infrastructure

Design language: **Notion UI + Mint functionality + Stripe dashboard polish** — minimal, clean, professional SaaS.

## Architecture

```
User Browser
    ↓
Frontend (Next.js) — S3 / Amplify on AWS
    ↓
Backend API (Express) — EC2 on AWS
    ↓
Database (PostgreSQL) — RDS on AWS
```

- **Frontend**: React (Next.js 14), Tailwind CSS, Recharts, dark/light mode, responsive.
- **Backend**: Node.js + Express, REST API, JWT authentication, MVC-style structure, CloudWatch logging.
- **Database**: PostgreSQL (RDS-ready schema in `backend/src/db/schema.sql`).

## Quick Start (Local)

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ (or use Docker)

### 1. Database

Create a database and run the schema:

```bash
# If using Docker for PostgreSQL:
docker run -d --name expense-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=expense_tracker -p 5432:5432 postgres:15

# Run migrations
cd backend
cp .env.example .env
# Edit .env: set DATABASE_URL if needed (default: postgresql://postgres:postgres@localhost:5432/expense_tracker)
npm install
npm run db:migrate
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

API runs at `http://localhost:4000`. Endpoints: `/api/auth/*`, `/api/expenses/*`, `/api/budgets`, `/api/analytics`, `/health`.

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:4000 (default)
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```
expm/
├── backend/                 # Express API
│   ├── src/
│   │   ├── config/          # env, db
│   │   ├── controllers/     # auth, expenses, budgets, analytics
│   │   ├── middleware/     # auth, validate, requestLogger, errorHandler
│   │   ├── routes/
│   │   ├── db/              # schema.sql, migrate
│   │   ├── utils/           # logger (CloudWatch-capable)
│   │   └── index.ts
│   ├── .env.example
│   └── package.json
├── frontend/                # Next.js app
│   ├── src/
│   │   ├── app/             # pages: landing, login, register, dashboard, analytics, profile
│   │   ├── components/      # Nav, AddExpenseModal, BudgetCard
│   │   ├── context/         # AuthContext
│   │   └── lib/             # api client
│   ├── .env.example
│   └── package.json
├── docs/
│   └── AWS_DEPLOYMENT.md    # AWS setup: EC2, RDS, S3/Amplify, IAM, CloudWatch
└── README.md
```

## Core Features

- **Auth**: Register, login, logout. JWT stored in `localStorage`. Passwords hashed with bcrypt.
- **Expenses**: Add, edit, delete, list with filters (date range, category). Categories: Food, Travel, Rent, Shopping, Entertainment, Custom.
- **Budgets**: Set monthly budget; view spent, remaining, percentage used with progress bar.
- **Analytics**: Total spent, average daily spend, highest category; pie (category breakdown), line (spending over time), bar (monthly comparison).

## Security

- JWT authentication; no credentials in code (env vars).
- Input validation (express-validator) on all API inputs.
- CORS enabled; in production restrict origin to your frontend URL.
- Designed for IAM roles on EC2 (no hardcoded AWS keys in production).

## Observability

- Every API request is logged (method, path, status, duration).
- Errors and warnings are logged.
- When `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are set and `NODE_ENV=production`, logs are sent to **AWS CloudWatch Logs** (log group configurable via `CLOUDWATCH_LOG_GROUP`).

## Deployment on AWS

See **[docs/AWS_DEPLOYMENT.md](docs/AWS_DEPLOYMENT.md)** for:

- EC2: backend hosting, Node, process manager, env
- RDS: PostgreSQL, security group, connection string
- S3 + CloudFront or Amplify: frontend hosting
- IAM: roles for EC2, CloudWatch
- CloudWatch: log group, metrics (request count, errors)

## Future Extensions (Design Only)

The architecture is prepared for (not implemented):

- Email/SMS alerts (e.g. budget threshold)
- AI spending insights (separate service calling API)
- CSV export (new API route + download)
- Mobile app (same REST API + JWT)

## License

Proprietary / Portfolio use.
