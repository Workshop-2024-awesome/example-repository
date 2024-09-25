# Status
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Workshop-2024-awesome/example-repository/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Workshop-2024-awesome/example-repository/tree/main)

# ❓ What this is about

An example repository for our workshop in 2024. 

# 💡 How to start

## ⛵️ Required ports
- `5432` for postgres
- `6379` for Redis
- `3000` for the backend
- `5173` for the client

## ⚙️ Required tooling
- Docker (https://docs.docker.com/engine/install/)
- nodeJS (https://nodejs.org/en)
- pnpm (https://pnpm.io/installation)

## 💻 Starting commands for local env

```bash
# Start infrastructure
> docker-compose up -d

# Start the backend
> cd server
> pnpm run start:dev

# Start the client
> cd ../client
> pnpm run dev
```
