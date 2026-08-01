# Learning plan: Workout Reflection Log

## Locked decisions
- Language: **JavaScript** — one language for frontend and backend; simplest on-ramp; the most tutorials/answers anywhere.
- Frontend: **React + Vite** — keeps frontend a clean, separate, visible piece; no hidden magic; current standard starting point.
- Backend: **Node.js + Express** — same language as the frontend; the most beginner-documented Node backend; explicit routes.
- Database: **PostgreSQL** (SQLite locally to start) — data is relational (users ↔ their sessions); most transferable SQL skill.
- Auth: **Roll your own — bcrypt + JWT** — deliberately understand auth end to end; strongest "I get how this works" story for recruiters.
- Hosting: **Vercel (frontend) + Render (backend + Postgres)** — deploy the separate pieces to separate homes; generous free tiers; no AWS overwhelm.

## Sections

### 1. Project setup + first page live locally  [x] DONE
**Deliverable:** the React app running on localhost showing a "Workout Log" home page, with git tracking the code.
**Concepts:** git, repo, commits, npm, vite, react-component, jsx, localhost

- [x] 1.1 Start git — turn this folder into a repo and make your first commit
- [x] 1.2 Scaffold the React app with Vite and tour the files it creates
- [x] 1.3 Run the dev server and see your app live on localhost
- [x] 1.4 Make it say "Workout Log" — your first real React edit

### 2. Styling + interactivity  [ ] not started
**Deliverable:** a styled session-logging form where typing and clicking update the screen (nothing saved yet).
**Concepts:** css, react-state, event-handling, controlled-inputs, props

- [x] 2.1 Lay out the session form in JSX (a text input, a reflection box, a button)
- [x] 2.2 Style the page with CSS so it looks like a real form
- [ ] 2.3 Wire up state — capture what you type (useState + controlled inputs)
- [ ] 2.4 Handle the click — add the typed session to an on-screen list
- [ ] 2.5 Split a session item into its own component that receives props

### 3. A backend server that responds  [ ] not started
**Deliverable:** a Node/Express server running locally that answers a test request in the browser.
**Concepts:** nodejs, express, server, routes, http-methods, request-response, ports

### 4. Frontend talks to backend (the API)  [ ] not started
**Deliverable:** submitting the form sends data to the server and you see the server receive it.
**Concepts:** api, fetch, json, http-from-react, cors, async-await

### 5. Remembering things (database)  [ ] not started
**Deliverable:** logged sessions are saved to a database and survive a restart; the history list reads from it.
**Concepts:** sql, tables, schema, sqlite-postgres, crud, db-to-server, environment-variables

### 6. Accounts + private data (auth)  [ ] not started
**Deliverable:** you can sign up, log in, and only see your own sessions.
**Concepts:** password-hashing-bcrypt, jwt, protected-routes, users-sessions-relationship, login-state

### 7. The core feature: reflection + consistency view  [ ] not started
**Deliverable:** each session saves a reflection prompt, and a streak/calendar shows your consistency.
**Concepts:** data-modeling-feature, dates, streak-computation, derived-data-rendering

### 8. Tests + safety rails  [ ] not started
**Deliverable:** a few automated tests that catch breakage, plus basic input validation.
**Concepts:** automated-test, testing-a-route, validation, error-handling

### 9. Going live (deployment)  [ ] not started
**Deliverable:** a real URL you can send to anyone — frontend on Vercel, backend + DB on Render.
**Concepts:** deployment, hosting, prod-env-variables, build-step, connecting-deployed-pieces
