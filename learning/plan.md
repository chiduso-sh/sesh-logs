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

### 2. Styling + interactivity  [x] DONE
**Deliverable:** a styled session-logging form where typing and clicking update the screen (nothing saved yet).
**Concepts:** css, react-state, event-handling, controlled-inputs, props

- [x] 2.1 Lay out the session form in JSX (a text input, a reflection box, a button)
- [x] 2.2 Style the page with CSS so it looks like a real form
- [x] 2.3 Wire up state — capture what you type (useState + controlled inputs)
- [x] 2.4 Handle the click — add the typed session to an on-screen list
- [x] 2 .5 Split a session item into its own component that receives props

### 3. A backend server that responds  [x] DONE
**Deliverable:** a Node/Express server running locally that answers a test request in the browser.
**Concepts:** nodejs, express, server, routes, http-methods, request-response, ports

- [x] 3.1 Create the backend/ folder, initialize a Node project, install Express
- [x] 3.2 Write a minimal Express server that starts and listens on a port
- [x] 3.3 Add your first route and see its response in the browser
- [x] 3.4 Add a route that returns JSON (a placeholder sessions list)

### 4. Frontend talks to backend (the API)  [x] DONE
**Deliverable:** submitting the form sends data to the server and you see the server receive it.
**Concepts:** api, fetch, json, http-from-react, cors, async-await

- [x] 4.1 Fetch the sessions from the backend and display them (fetch + async/await), fixing the CORS error that appears
- [x] 4.2 Auto-load the sessions when the page opens (useEffect)
- [x] 4.3 Send a new session to the backend with a POST request
- [x] 4.4 Backend receives the POST and stores it (in-memory); frontend shows it

### 5. Remembering things (database)  [x] DONE
**Deliverable:** logged sessions are saved to a database and survive a restart; the history list reads from it.
**Concepts:** sql, tables, schema, sqlite-postgres, crud, db-to-server, environment-variables

- [x] 5.1 Add SQLite and create the sessions table (install + connect + schema)
- [x] 5.2 Make GET read the sessions from the database (SELECT)
- [x] 5.3 Make POST insert a new session into the database (INSERT)
- [x] 5.4 Confirm data survives a restart; remove the old in-memory array

### 6. Accounts + private data (auth)  [x] DONE
**Deliverable:** you can sign up, log in, and only see your own sessions.
**Concepts:** password-hashing-bcrypt, jwt, protected-routes, users-sessions-relationship, login-state

- [x] 6.1 Add a users table and install bcrypt + jsonwebtoken
- [x] 6.2 Signup route — hash the password with bcrypt and store the user
- [x] 6.3 Login route — verify the password and issue a JWT
- [x] 6.4 Auth middleware — protect the sessions routes by checking the JWT
- [x] 6.5 Scope sessions to the logged-in user (user_id column + filter)
- [x] 6.6 Frontend login — a login form that stores the token and sends it on sessions requests
- [x] 6.7 Frontend polish — signup form, logout, and show/hide the app based on login state

### 7. The core feature: reflection + consistency view  [x] DONE
**Deliverable:** each session saves a reflection prompt, and a streak/calendar shows your consistency.
**Concepts:** data-modeling-feature, dates, streak-computation, derived-data-rendering

- [x] 7.1 Give each session a date (created_at column + server sets it on insert)
- [x] 7.2 Show each session's date (and reflection) in the list
- [x] 7.3 Compute and display a consistency streak (days in a row)

### 8. Tests + safety rails  [x] DONE
**Deliverable:** a few automated tests that catch breakage, plus basic input validation.
**Concepts:** automated-test, testing-a-route, validation, error-handling

- [x] 8.1 Write your first automated test — extract computeStreak to a module and test it (node:test)
- [x] 8.2 Validate input on the write routes — reject missing fields with a 400
- [x] 8.3 Handle errors gracefully + write a test for a route

### 9. A design pass — make it look intentional  [x] DONE
**Deliverable:** the app looks clean and cohesive (a color + spacing system, a styled auth screen, and a proper app layout) in both logged-out and logged-in states.
**Concepts:** css-variables, layout, visual-hierarchy, responsive-basics
Note: implemented a black/silver design the learner created in claude.ai/design (imported via DesignSync), then toured the CSS techniques.

- [x] 9.1 A color + spacing system (CSS variables) + base typography
- [x] 9.2 Style the auth screen as a centered card
- [x] 9.3 Style the app: header + logout, streak badge, form, session cards

### 10. Going live (deployment)  [ ] not started
**Deliverable:** a real URL you can send to anyone — frontend on Vercel, backend + DB on Render.
**Concepts:** deployment, hosting, prod-env-variables, build-step, connecting-deployed-pieces

- [x] 10.1 Make the app config-driven: API base URL from an env var (frontend) + PORT from env (backend)
- [x] 10.2 Move the database to Postgres so data survives on the host (migrate db.js + queries)
- [x] 10.3 Push the latest code to GitHub
- [x] 10.4 Deploy the backend + a Postgres database to Render (set JWT_SECRET, DATABASE_URL) — live at https://workoutjournal-8zgp.onrender.com
- [ ] 10.5 Deploy the frontend to Vercel (point VITE_API_URL at the Render backend)
- [ ] 10.6 Connect + go live: allow the Vercel origin in CORS, then test the live app end to end
