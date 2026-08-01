# File map

<!-- Every file/folder is either explained or parked — no mystery boxes. -->
<!-- known: explained in the learner's own words | parked: honest one-liner for now, deep dive scheduled | generated: machine-made, never edit, always rebuildable -->

## /
- .git/ — generated (2026-07-31) — git's private store of all your snapshots/history; never edit by hand → [[repo]]
- learning/project.md — known (2026-07-31) — your project, MVP, and trunk
- learning/plan.md — known (2026-07-31) — the build plan and locked decisions → [[writing-a-plan]]
- learning/knowledge-graph.md — known (2026-07-31) — the living map of what you actually know
- learning/file-map.md — known (2026-07-31) — this file: why every file in the repo exists

## frontend/  (the React app — one of the two separate programs → [[frontend-backend-separation]])
- frontend/index.html — known (2026-08-01) — the single page the browser loads; React injects the app into it
- frontend/package.json — known (2026-08-01) — project ID card: dependencies + scripts (npm run dev) → [[package-json]]
- frontend/.gitignore — known (2026-08-01) — tells git what not to track (e.g. node_modules) → [[gitignore]]
- frontend/node_modules/ — generated (2026-08-01) — downloaded package code; never edit; rebuild with npm install → [[dependencies]]
- frontend/package-lock.json — generated (2026-08-01) — exact locked versions of every package
- frontend/src/ — known (2026-08-01) — where your React code lives
- frontend/src/main.jsx — known (2026-08-01) — entry point: mounts React into index.html
- frontend/src/App.jsx — known (2026-08-01) — your main component; you rewrote it to render the "Sesh logs" page → [[react-component]] [[jsx]]
- frontend/src/index.css — parked (styling, section 2) — global styles
- frontend/src/App.css — parked (styling, section 2) — styles for the App component
- frontend/src/assets/ — parked (section 2) — images/static assets used by components
- frontend/public/ — parked (section 2) — static files served as-is
- frontend/vite.config.js — parked (section 4) — Vite's settings
- frontend/eslint.config.js — parked (section 8) — code style-checker config
- frontend/README.md — parked — Vite's default readme
