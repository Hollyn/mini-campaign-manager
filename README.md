# Mini Campaign Manager

Mini Campaign Manager is yarn monorepo for creating, scheduling, sending, and tracking email campaigns. Stack combines Express API, React + Vite frontend, PostgreSQL, Sequelize migrations, and Docker Compose local setup.

## Quick Start

1. Start full stack:

```bash
docker compose up
```

2. Open app: `http://localhost:5173`
3. Sign in with seeded demo account:

- Email: `demo@example.com`
- Password: `password123`

Notes:

- Compose waits for Postgres health, runs migrations before API boot, and uses `http://api:4000` for container-to-container Vite proxying
- Demo data loads on first-run defaults so `docker compose up` gives working login right away
- Set `SEED=false` in `.env` if you want later restarts without reseeding demo data

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
| `SEED` | `true` | Compose startup seeding toggle; set to `false` after first seeded boot if you want later restarts without demo reload |

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

I used Claude Code as an implementation and review partner, not as autopilot.

- Scaffolding the yarn monorepo shape and keeping API, frontend, and DB workspaces aligned
- Drafting contract-first API shapes, validation boundaries, and typed request/response models for auth, campaigns, and recipients
- Generating first-pass backend and frontend code for campaign CRUD, scheduling, recipient management, and send simulation
- Drafting integration tests for critical business rules, then tightening them after manual review and verification
- Reviewing Docker Compose startup flow, environment defaults, and README setup steps for consistency gaps

### 2. Real prompts I used

- `Design contract-first API shapes for auth, campaigns, and recipients in this yarn monorepo. Define request/response types, validation needs, error response shape, and business-rule edge cases before writing handlers.`
- `Implement the campaign send flow in Express + Sequelize so POST /campaigns/:id/send returns 202 immediately, marks campaign status as sending, processes pending recipients asynchronously with simulated latency and random sent/failed outcomes, and finishes with campaign status sent.`
- `Write Jest + Supertest coverage for the highest-risk business rules: editing a non-draft campaign should return 409, scheduling in the past should return 422, and sending should leave no campaign recipients in pending state.`

### 3. Where Claude Code needed correction

- I had to verify infrastructure alignment across `.env.example`, `docker-compose.yml`, and the frontend proxy so local setup matched the documented commands
- I corrected generated code and README copy where it was too generic and did not fully reflect this repo's exact routes, startup flow, or environment defaults
- I did not trust async send logic or tests at face value; I manually verified status transitions, background processing behavior, and stats responses against the challenge requirements
- I reviewed error handling and frontend UX details to make sure API failures were surfaced clearly instead of getting trapped inside local component state

### 4. What I would not delegate

- Final decisions on business rules and API behavior, because correctness matters more than generation speed
- Security-sensitive choices such as auth behavior, trusted origins, and secret handling
- Claims that tests, Docker startup, or runtime behavior worked without actually running and checking them
- Destructive git actions or broad cleanup that could hide mistakes instead of fixing them explicitly
