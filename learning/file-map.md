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
- backend/server.js — known (2026-08-05) — Express server; GET / + GET /api/sessions (JSON), cors enabled → [[express]] [[server]] [[routes]] [[json]] [[api]] [[cors]] [[middleware]]
- backend/package.json — known (2026-08-05) — the backend's ID card; lists express + cors, "type":"module" → [[package-json]] [[express]] [[module-systems]]
- backend/.gitignore — known (2026-08-05) — keeps the backend's node_modules out of git → [[gitignore]]
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
- frontend/src/App.jsx — known (2026-08-05) — main component; form + list, auto-loads sessions from the API on mount → [[react-state]] [[controlled-inputs]] [[event-handling]] [[array-state]] [[list-rendering]] [[props]] [[fetch]] [[async-await]] [[http-from-react]] [[useEffect]]
- frontend/src/SessionItem.jsx — known (2026-08-01) — displays one session; receives it via props → [[props]] [[module-imports]]
- frontend/src/App.css — known (2026-08-01) — your styles for the form (you wrote input/textarea/button rules) → [[css]] [[flexbox]]
- frontend/src/index.css — parked (base styles) — Vite's global base: color variables, dark-mode, #root centering (not yet reviewed line-by-line)
- frontend/src/assets/ — parked (section 2) — images/static assets used by components
- frontend/public/ — parked (section 2) — static files served as-is
- frontend/vite.config.js — parked (section 4) — Vite's settings
- frontend/eslint.config.js — parked (section 8) — code style-checker config
- frontend/README.md — parked — Vite's default readme
