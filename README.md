# Mini Campaign Manager

Mini Campaign Manager monorepo. Goal: build small full-stack MarTech app for creating, scheduling, sending, and tracking email campaigns.

Current repo status: Phase 1 foundation done. Project has monorepo scaffold, PostgreSQL migrations, Sequelize models, Express bootstrap, `GET /health`, Docker wiring, env setup, and minimal frontend shell. Auth, recipients, campaign CRUD, send flow, seed data, and tests still pending.

## Tech Stack

- Monorepo: Yarn workspaces
- Backend: Node.js, Express 4, Sequelize 6, sequelize-typescript, Zod
- Frontend: React 18, TypeScript, Vite, Tailwind CSS
- Database: PostgreSQL 15
- Infra: Docker Compose

## Project Structure

```text
mini-campaign-manager/
|- docker-compose.yml
|- package.json
|- .env.example
|- packages/
   |- api/
   |- db/
   |- frontend/
```

## Current Scope

Implemented now:

- Root monorepo scaffold and workspace commands
- DB migrations for `users`, `campaigns`, `recipients`, `campaign_recipients`
- Required indexes from PRD
- Typed Sequelize models with associations
- Express app bootstrap with centralized error handling
- Health endpoint at `GET /health`
- Frontend placeholder shell and shared API contract types
- Local and Docker env wiring
- One-command local dev script

Not implemented yet:

- Auth flow
- Recipients API and hooks
- Campaign CRUD and send/schedule actions
- Seed data
- Jest/Supertest API tests

## Quick Start

Recommended path for current repo: local dev with Dockerized Postgres.

1. Install dependencies:

```bash
yarn install
```

2. Start full local dev stack:

```bash
yarn dev
```

3. Open app and API:

- Frontend: `http://localhost:5173`
- API health: `http://localhost:4000/health`

Notes:

- If port `5173` already busy, Vite auto-picks next free port like `5174`
- Current frontend is foundation placeholder, not final product UI yet

## Docker Start

You can also boot full stack with Docker:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- API: `http://localhost:4000`
- Postgres: `localhost:${POSTGRES_PORT}`

If local ports conflict, change values in `/.env` first.

## Manual Setup

If you want to run API and frontend on host machine and only keep Postgres in Docker:

1. Install dependencies:

```bash
yarn install
```

2. Start Postgres:

```bash
yarn dev:db
```

3. Run migrations:

```bash
yarn db:migrate
```

4. Start API:

```bash
yarn dev:api
```

5. Start frontend in new terminal:

```bash
yarn dev:frontend
```

## Available Commands

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start DB, wait for healthy DB, run migrations, start API and frontend |
| `yarn dev:db` | Start PostgreSQL container only |
| `yarn dev:setup` | Start DB, wait, migrate |
| `yarn dev:api` | Start Express API in watch mode |
| `yarn dev:frontend` | Start Vite frontend |
| `yarn db:migrate` | Run Sequelize migrations |
| `yarn db:seed` | Run seeders when they exist |
| `yarn build` | Build all workspaces |


## Testing

Test suite not added yet. Phase 6 in `ai-tasks/phase6.md` covers required Jest + Supertest work.

Planned API test command:

```bash
yarn workspace @campaign/api test
```

## How I Used OpenCode (alternative to Claude Code)

### 1. What tasks I delegated to OpenCode

- Scaffolded monorepo root, workspace manifests, Dockerfiles, and Compose setup
- Wrote Sequelize migrations and typed model classes
- Bootstrapped Express app, error middleware, and `GET /health`
- Set up frontend placeholder shell and shared API contract types
- Fixed local-vs-Docker env mismatch and added one-command local dev script

### 2. Real prompts I used

- `follow @ai-tasks/phase1.md`
- `run yarn dev:api and fix the errors`
- `add one-command full local dev script`

### 3. Where OpenCode was wrong or needed correction

- Initial env setup used Docker hostname `db` in local `DATABASE_URL`; that broke `yarn dev:api` on host machine and had to be corrected to `localhost`
- Initial full-stack Docker boot ran into host port conflicts; needed manual debugging and safer local port choices
- README requirements in PRD assume later phases like auth, seed data, and tests exist; had to keep this README honest about current scope instead of pretending whole app already shipped

### 4. What I would not let OpenCode do and why

- Pick real production secrets or credentials; secrets need human ownership
- Force-push, reset, or delete unrelated local state; too destructive
- Invent completed features or fake test results; README and docs must match actual repo state
- Make product decisions without review when they affect UX, security, or business rules

