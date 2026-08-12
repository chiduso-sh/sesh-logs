# Sesh logs

A private workout-reflection tracker with a consistency streak. Log a session and a quick reflection, and see how many days in a row you've actually shown up.

**Live app → [workoutjournal.vercel.app](https://workoutjournal.vercel.app)**

> Heads-up: the backend runs on a free tier that sleeps after ~15 min idle, so the **first** request after a while can take ~30–50s to wake. After that it's snappy.

<!-- TODO: add a screenshot — drop an image in the repo and reference it here, e.g. ![Sesh logs](./screenshot.png) -->
![Sesh logs](image.png)

## Features

- **Accounts** — sign up and log in; each user only ever sees their own sessions.
- **Log sessions** — a workout plus an after-session reflection, saved with a timestamp.
- **Consistency streak** — counts consecutive days you've logged, computed from your history.
- **Persistent** — data lives in a cloud Postgres database, so it survives restarts and follows you across devices.
- **Considered UI** — a black-and-silver design system with a decorative 3D accent (toggleable).

## Tech stack

| Layer | Choice |
| --- | --- |
| Frontend | React + Vite (deployed on Vercel) |
| Backend | Node.js + Express (deployed on Render) |
| Database | PostgreSQL (`pg`) |
| Auth | Self-built — `bcrypt` password hashing + JWTs |
| Tests | Node's built-in test runner (`node:test`) |

## Architecture

```
Browser ──> Vercel (React frontend) ──HTTPS──> Render (Express API) ──> Postgres
```

Two separate programs talking over a JSON API. The frontend never touches the database directly — it sends an `Authorization: Bearer <JWT>` on each request, and the API verifies the token, then scopes every query to that user.

## How it works (the interesting bits)

- **Auth:** passwords are hashed with bcrypt (never stored in plaintext). On login the server verifies the hash and issues a signed JWT. A small middleware validates that JWT on protected routes and attaches the user's id to the request.
- **Per-user data:** every session row carries a `user_id`; reads filter by it and writes stamp it, so users are fully isolated in one shared table.
- **Config-driven:** the frontend's API URL and the backend's port, database URL, JWT secret, and allowed CORS origin all come from environment variables, with local fallbacks — so the same code runs locally and in production.

## Running locally

**Prerequisites:** Node 20+ and a PostgreSQL connection string (a free managed Postgres works).

**Backend**
```bash
cd backend
npm install
# create backend/.env with your database URL (this file is gitignored):
#   DATABASE_URL=postgresql://user:pass@host/dbname
node --env-file=.env server.js
```

**Frontend** (in a second terminal)
```bash
cd frontend
npm install
npm run dev
```
Then open the URL Vite prints (default `http://localhost:5173`). With no `VITE_API_URL` set, the frontend talks to `http://localhost:3000` automatically.

**Tests**
```bash
cd frontend && node --test     # streak logic (unit)
cd backend  && node --test     # signup route (integration — server must be running)
```

## Environment variables

| Where | Variable | Purpose |
| --- | --- | --- |
| Frontend (Vercel) | `VITE_API_URL` | Base URL of the deployed backend |
| Backend (Render) | `DATABASE_URL` | Postgres connection string |
| Backend (Render) | `JWT_SECRET` | Secret used to sign/verify tokens |
| Backend (Render) | `FRONTEND_URL` | The one origin allowed by CORS |
| Backend (Render) | `PORT` | Provided automatically by the host |

## Roadmap

Ideas parked for a v2: structured sets/reps and progressions, charts and trends, reminders, tags/search, and sharing.

---

Built as my first end-to-end full-stack project — designed, built, tested, and deployed from an empty folder.
