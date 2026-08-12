# File map

<!-- Every file/folder is either explained or parked — no mystery boxes. -->
<!-- known: explained in the learner's own words | parked: honest one-liner for now, deep dive scheduled | generated: machine-made, never edit, always rebuildable -->

## /
- .git/ — generated (2026-07-31) — git's private store of all your snapshots/history; never edit by hand → [[repo]]
- learning/project.md — known (2026-07-31) — your project, MVP, and trunk
- learning/plan.md — known (2026-07-31) — the build plan and locked decisions → [[writing-a-plan]]
- learning/knowledge-graph.md — known (2026-07-31) — the living map of what you actually know
- learning/file-map.md — known (2026-07-31) — this file: why every file in the repo exists

## backend/  (the Node/Express server — the other separate program → [[frontend-backend-separation]] [[nodejs]])
- backend/server.js — known (2026-08-10) — Express server; auth, per-user sessions, validation (400s) + try/catch (409) → [[express]] [[routes]] [[api]] [[crud]] [[jwt]] [[protected-routes]] [[middleware]] [[users-sessions-relationship]] [[dates]] [[validation]] [[error-handling]]
- backend/signup.test.js — known (2026-08-10) — integration test: hits the live /api/signup route (201 then 409) → [[testing-a-route]] [[automated-test]]
- backend/package.json — known (2026-08-06) — backend deps: express, cors, better-sqlite3, bcrypt, jsonwebtoken; "type":"module" → [[package-json]] [[module-systems]]
- backend/db.js — known (2026-08-12) — Postgres connection Pool from DATABASE_URL; creates sessions + users tables → [[sql]] [[tables]] [[sqlite-postgres]] [[db-to-server]]
- backend/.env — known (2026-08-12, GITIGNORED) — holds the secret DATABASE_URL (Postgres connection string); never committed
- backend/sessions.db — generated (obsolete) — old local SQLite file, no longer used after the Postgres move
- backend/sessions.db — generated (2026-08-05) — the actual SQLite database file (your data lives here); gitignored
- backend/.gitignore — known (2026-08-05) — keeps node_modules and sessions.db out of git → [[gitignore]]
- backend/node_modules/ — generated (2026-08-05) — installed package code; rebuild with npm install → [[dependencies]]
- backend/package-lock.json — generated (2026-08-05) — exact locked versions for the backend

## frontend/  (the React app — one of the two separate programs → [[frontend-backend-separation]])
- frontend/index.html — known (2026-08-01) — the single page the browser loads; React injects the app into it
- frontend/package.json — known (2026-08-01) — project ID card: dependencies + scripts (npm run dev) → [[package-json]]
- frontend/.gitignore — known (2026-08-01) — tells git what not to track (e.g. node_modules) → [[gitignore]]
- frontend/node_modules/ — generated (2026-08-01) — downloaded package code; never edit; rebuild with npm install → [[dependencies]]
- frontend/package-lock.json — generated (2026-08-01) — exact locked versions of every package
- frontend/src/ — known (2026-08-01) — where your React code lives
- frontend/src/main.jsx — known (2026-08-01) — entry point: mounts React into index.html
- frontend/src/App.jsx — known (2026-08-11) — main component; auth gating, sessions CRUD, streak, config-driven API base (VITE_API_URL) → [[react-state]] [[fetch]] [[useEffect]] [[login-state]] [[conditional-rendering]] [[streak-computation]] [[prod-env-variables]]
- frontend/src/SessionItem.jsx — known (2026-08-10) — displays one session: formatted date + workout + reflection → [[props]] [[derived-data-rendering]] [[dates]]
- frontend/src/streak.js — known (2026-08-10) — pure computeStreak logic, extracted from App so it's testable → [[streak-computation]]
- frontend/src/streak.test.js — known (2026-08-10) — node:test unit tests for computeStreak → [[automated-test]]
- frontend/src/App.css — known (2026-08-11) — black/silver component styles (cards, buttons, streak hero, session cards) + the fixed .model-stage accent → [[css]] [[css-variables]]
- frontend/src/ModelViewer.jsx — known (2026-08-11) — React wrapper: mounts the decorative 3D accent on a canvas via useEffect/useRef, loads three from a CDN → [[useEffect]]
- frontend/src/parallettes.js — parked (deep-dive on request) — Three.js/WebGL scene for the rotating parallettes; imported from your design, decorative, not yet authored/explained line-by-line
- frontend/src/index.css — known (2026-08-11) — the design system: color + spacing variables, metallic gradients, base typography → [[css-variables]]
- frontend/src/assets/ — parked (section 2) — images/static assets used by components
- frontend/public/ — parked (section 2) — static files served as-is
- frontend/vite.config.js — parked (section 4) — Vite's settings
- frontend/eslint.config.js — parked (section 8) — code style-checker config
- frontend/README.md — parked — Vite's default readme
