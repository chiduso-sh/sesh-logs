# Sesh logs

A private workout-reflection tracker with a consistency streak. Build a session from your exercises — each with its sets, reps, and weight — add a quick reflection, and see how many days in a row you've actually shown up.

**Live app → [seshlogs.vercel.app](https://seshlogs.vercel.app)**

> Heads-up: the backend runs on a free tier that sleeps after ~15 min idle, so the **first** request after a while can take ~30–50s to wake. After that it's snappy.

![Sesh logs — history feed](screenshot-feed.png)

<p align="center">
  <img src="screenshot-session.png" width="49%" alt="Session detail — exercises and sets" />
  <img src="screenshot-builder.png" width="49%" alt="Session builder" />
</p>

## Features

- **Accounts** — sign up and log in; each user only ever sees their own sessions.
- **Structured sessions** — build a workout from a set of exercises, each logged with its own sets of reps and (optional) weight — leave weight blank for bodyweight moves. A free-text reflection captures how it went.
- **Consistency streak** — counts consecutive days you've logged, computed from your history.
- **Persistent** — data lives in a cloud Postgres database, so it survives restarts and follows you across devices.
- **Considered, responsive UI** — a black-and-silver design system that reflows from a two-pane desktop layout to a mobile view, with a decorative 3D accent (toggleable).

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

- **A session is a tree.** The data model is relational: `sessions → exercises → sets`, wired with foreign keys (`exercises.session_id`, `sets.exercise_id`). A single reflection stays on the session alongside its exercises.
- **All-or-nothing writes.** Saving a built session inserts the session, its exercises, and every set inside **one database transaction** — if any part fails, the whole thing rolls back, so you never end up with a half-saved session.
- **Flat rows → nested object.** Reading a session back runs a `LEFT JOIN` across the three tables and folds the repeated flat rows into one nested object (a childless session comes back with an empty `exercises` list rather than a 404).
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
cd backend  && node --test     # signup route + a full save→read round-trip (integration — server must be running)
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

Shipped so far: accounts, structured sessions (exercises + sets), the consistency streak, a responsive desktop/mobile UI. Parked ideas for later: cardio/duration exercises, charts and trends, editing saved sessions, tags/search, reminders, and sharing.

---

Built as my first end-to-end full-stack project — designed, built, tested, and deployed from an empty folder.
