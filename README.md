# Mini Campaign Manager

Mini Campaign Manager is yarn monorepo for creating, scheduling, sending, and tracking email campaigns. Stack combines Express API, React + Vite frontend, PostgreSQL, Sequelize migrations, and Docker Compose local setup.

## Quick Start

1. Start full stack:

```bash
SEED=true docker compose up --build
```

2. Open app: `http://localhost:5173`
3. Sign in with seeded demo account:

- Email: `demo@example.com`
- Password: `password123`

Notes:

- Compose waits for Postgres health, runs migrations before API boot, and uses `http://api:4000` for container-to-container Vite proxying
- Demo data loads only when `SEED=true`; `.env.example` now defaults to `false` for safer non-demo environments
- Set `SEED=false` if you want to keep existing data on later restarts

## Manual Setup

1. Install dependencies:

```bash
yarn install
```

2. Copy local env file:

```bash
cp .env.example .env
```

3. Start Postgres only:

```bash
docker compose up -d db
```

4. Run database migrations:

```bash
yarn db:migrate
```

5. Seed demo data:

```bash
yarn db:seed
```

6. Start API in one terminal:

```bash
yarn workspace @campaign/api dev
```

7. Start frontend in second terminal:

```bash
yarn workspace @campaign/frontend dev
```

App URLs:

- Frontend: `http://localhost:5173`
- API health: `http://localhost:4000/health`

## Useful Commands

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start local dev flow with Dockerized Postgres, migrations, API, and frontend |
| `yarn dev:db` | Start PostgreSQL container only |
| `yarn dev:setup` | Start DB, wait for health, run migrations |
| `yarn workspace @campaign/api dev` | Run API in watch mode |
| `yarn workspace @campaign/frontend dev` | Run frontend in watch mode |
| `yarn db:migrate` | Run Sequelize migrations |
| `yarn db:seed` | Load demo data |
| `yarn workspace @campaign/api test` | Run API Jest + Supertest suite |
| `yarn workspace @campaign/frontend build` | Run frontend production build |

## Environment Variables

| Variable | Default | Notes |
| --- | --- | --- |
| `POSTGRES_DB` | `campaign_manager` | Docker Compose Postgres database name |
| `POSTGRES_USER` | `campaign` | Docker Compose Postgres user |
| `POSTGRES_PASSWORD` | `campaign` | Docker Compose Postgres password |
| `POSTGRES_PORT` | `55433` | Host port exposed for local Postgres access |
| `DATABASE_URL` | `postgresql://campaign:campaign@localhost:55433/campaign_manager` | Local API and migration connection string |
| `APP_ORIGIN` | `http://localhost:5173` | Primary allowed browser origin for cookie-backed write requests |
| `ALLOWED_ORIGINS` | empty | Extra comma-separated trusted origins for cookie-backed write requests |
| `TEST_DATABASE_URL` | Derived from `DATABASE_URL` | Optional override for Jest database |
| `JWT_SECRET` | `change_me_in_production` | Session signing secret |
| `JWT_EXPIRES_IN` | `7d` | JWT lifetime |
| `CAMPAIGN_PROCESSOR_POLL_MS` | `2000` | Poll interval for scheduled-send and stuck-send recovery sweeps |
| `PORT` | `4000` | API port |
| `FRONTEND_PORT` | `5173` | Vite dev server port |
| `VITE_API_PROXY_TARGET` | `http://localhost:4000` | Local frontend proxy target for `/api`; Docker Compose overrides this to `http://api:4000` |
| `SEED` | `false` | Compose startup seeding toggle; set to `true` only when you want demo data loaded |

## Testing

Run API tests with:

```bash
yarn workspace @campaign/api test
```

## Workspace Layout

```text
mini-campaign-manager/
|- docker-compose.yml
|- package.json
|- packages/
|  |- api/
|  |- db/
|  |- frontend/
```

## How I Used Claude Code

### 1. Tasks I delegated

- Scaffolded repo structure and yarn workspace wiring
- Implemented campaign, recipient, and auth flows across API and frontend
- Added migrations, seed data, and test coverage for core business rules
- Tightened Docker Compose, startup checks, and frontend error handling polish

### 2. Real prompts I used

- `follow ai-tasks/phase1.md`
- `follow ai-tasks/phase6.md`
- `follow ai-tasks/phase7.md`

### 3. Where Claude Code needed correction

- Infra defaults had to stay aligned across `.env.example`, Docker Compose, and Vite proxy settings
- Error UX needed review so mutation failures surfaced globally instead of only inside local forms and modals
- README copy needed final human pass to keep setup steps honest and consistent with actual scripts

### 4. What I would not delegate

- Choosing production secrets or deployment credentials
- Destructive git operations on shared work without explicit approval
- Product or security decisions that change business rules without review
- Claiming tests or runtime behavior passed without actually verifying them
