# Knowledge graph

<!-- statuses: seed → introduced → practicing → understood -->
<!-- seed: not yet taught | introduced: explained once | practicing: used it with help | understood: explained in own words + passed a quiz -->

## javascript
- status: introduced
- depends-on: none
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: explained why one language across frontend+backend helps a beginner (after a nudge)

## frontend
- status: introduced
- depends-on: none
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: defined frontend vs backend correctly

## backend
- status: introduced
- depends-on: frontend
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: named data storage + security/auth as backend-only jobs

## frontend-backend-separation
- status: introduced
- depends-on: frontend, backend
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: explained separation = you see how the pieces connect, no hidden magic

## sql
- status: introduced
- depends-on: database
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: reasoned that related data (users ↔ sessions) fits relational tables (after a nudge)

## postgresql
- status: introduced
- depends-on: sql
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: chose Postgres as the relational DB

## authentication
- status: introduced
- depends-on: backend
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: explained why rolling own auth serves the "understand + impress recruiters" goal

## deployment
- status: introduced
- depends-on: frontend-backend-separation
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: explained separate build → separate deploy

## database
- status: seed
- depends-on: backend
- introduced: —
- last-reviewed: —
- evidence: —

## api
- status: seed
- depends-on: frontend-backend-separation
- introduced: —
- last-reviewed: —
- evidence: —

## local-vs-deployed
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## git
- status: practicing
- depends-on: none
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: predicted git init would make the folder watched; ran init/add/commit and read the results

## repo
- status: practicing
- depends-on: git
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: identified the hidden .git folder as the repo after running git init

## commits
- status: practicing
- depends-on: git
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: made first commit with own message; read it back in git log (hash, author, HEAD -> master)

## staging
- status: practicing
- depends-on: git
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: predicted correctly that git add moves files to "changes to be committed"

## git-status
- status: practicing
- depends-on: git
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: read and decoded untracked → staged → "working tree clean" across the lesson

## npm
- status: practicing
- depends-on: none
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: ran npm create vite + npm install; explained node_modules as installed packages that can be redownloaded

## vite
- status: practicing
- depends-on: npm
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: scaffolded the frontend/ app with the react template and got the dev server running

## package-json
- status: introduced
- depends-on: npm
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: toured as the project's dependency list + scripts (the "shopping list")

## dependencies
- status: practicing
- depends-on: npm
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: explained node_modules holds installed package code, large, redownloadable via npm install

## gitignore
- status: practicing
- depends-on: git
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: explained why git should ignore node_modules (large, rebuildable, no need to snapshot)

## dev-server
- status: introduced
- depends-on: vite
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: got npm run dev serving the app and observed live output

## port
- status: introduced
- depends-on: localhost
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: saw the app on port 5173; port explained as which running program the browser talks to

## react-component
- status: practicing
- depends-on: javascript
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: explained App's job is to return the UI; wrote their own App component

## jsx
- status: practicing
- depends-on: react-component
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: authored JSX (h1/p with own text); learned {} injects live JS values

## jsx-single-parent
- status: practicing
- depends-on: jsx
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: predicted the "adjacent JSX elements must be wrapped" error and stated the one-parent rule (fragments <>…</> as the alt wrapper)

## hot-reload
- status: practicing
- depends-on: dev-server
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: correctly predicted the browser updates on save with no manual refresh (Vite HMR)

## reading-errors
- status: practicing
- depends-on: none
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: read the error overlay calmly, identified cause, and predicted the fix during a deliberate break

## localhost
- status: practicing
- depends-on: none
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: identified the app running at localhost:5173 on their own machine

## css
- status: practicing
- depends-on: none
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: wrote real input/textarea/button rules; learned comma (this-and-that) vs space (descendant) selectors after a live bug

## flexbox
- status: introduced
- depends-on: css
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: used the provided flex-column layout on form/label (explained by me, not yet authored solo)

## form-elements
- status: practicing
- depends-on: jsx
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: authored a form with input, textarea, label, and button; used self-closing tags correctly after a couple of iterations

## react-state
- status: practicing
- depends-on: react-component
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: explained a plain variable won't trigger a re-render; authored a second useState for reflection

## event-handling
- status: practicing
- depends-on: react-component
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: wired onClick to handleAdd; learned a type="submit" button inside a form reloads the page and wipes state

## array-state
- status: practicing
- depends-on: react-state
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: added useState([]) for sessions and appended objects {id, workout, reflection} on click

## immutability
- status: practicing
- depends-on: array-state
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: wrote setSessions([...sessions, newSession]) after several guided attempts; understands push won't trigger a re-render (needs reinforcement)

## list-rendering
- status: practicing
- depends-on: array-state
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: rendered sessions with .map + key={session.id}; debugged arrow block-body `=> {}` (no return) vs `=> ()` (implicit return)

## controlled-inputs
- status: practicing
- depends-on: react-state
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: wired both fields with value + onChange; learned a controlled input freezes if onChange never calls the setter

## props
- status: seed
- depends-on: react-component
- introduced: —
- last-reviewed: —
- evidence: —

## nodejs
- status: seed
- depends-on: javascript
- introduced: —
- last-reviewed: —
- evidence: —

## express
- status: seed
- depends-on: nodejs
- introduced: —
- last-reviewed: —
- evidence: —

## server
- status: seed
- depends-on: backend
- introduced: —
- last-reviewed: —
- evidence: —

## routes
- status: seed
- depends-on: express
- introduced: —
- last-reviewed: —
- evidence: —

## http-methods
- status: seed
- depends-on: routes
- introduced: —
- last-reviewed: —
- evidence: —

## request-response
- status: seed
- depends-on: server
- introduced: —
- last-reviewed: —
- evidence: —

## ports
- status: seed
- depends-on: localhost
- introduced: —
- last-reviewed: —
- evidence: —

## fetch
- status: seed
- depends-on: api
- introduced: —
- last-reviewed: —
- evidence: —

## json
- status: seed
- depends-on: api
- introduced: —
- last-reviewed: —
- evidence: —

## http-from-react
- status: seed
- depends-on: fetch, react-component
- introduced: —
- last-reviewed: —
- evidence: —

## cors
- status: seed
- depends-on: api
- introduced: —
- last-reviewed: —
- evidence: —

## async-await
- status: seed
- depends-on: javascript
- introduced: —
- last-reviewed: —
- evidence: —

## tables
- status: seed
- depends-on: sql
- introduced: —
- last-reviewed: —
- evidence: —

## schema
- status: seed
- depends-on: tables
- introduced: —
- last-reviewed: —
- evidence: —

## sqlite-postgres
- status: seed
- depends-on: postgresql
- introduced: —
- last-reviewed: —
- evidence: —

## crud
- status: seed
- depends-on: sql
- introduced: —
- last-reviewed: —
- evidence: —

## db-to-server
- status: seed
- depends-on: server, database
- introduced: —
- last-reviewed: —
- evidence: —

## environment-variables
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## password-hashing-bcrypt
- status: seed
- depends-on: authentication
- introduced: —
- last-reviewed: —
- evidence: —

## jwt
- status: seed
- depends-on: authentication
- introduced: —
- last-reviewed: —
- evidence: —

## protected-routes
- status: seed
- depends-on: routes, jwt
- introduced: —
- last-reviewed: —
- evidence: —

## users-sessions-relationship
- status: seed
- depends-on: tables
- introduced: —
- last-reviewed: —
- evidence: —

## login-state
- status: seed
- depends-on: jwt, react-state
- introduced: —
- last-reviewed: —
- evidence: —

## data-modeling-feature
- status: seed
- depends-on: schema
- introduced: —
- last-reviewed: —
- evidence: —

## dates
- status: seed
- depends-on: javascript
- introduced: —
- last-reviewed: —
- evidence: —

## streak-computation
- status: seed
- depends-on: dates
- introduced: —
- last-reviewed: —
- evidence: —

## derived-data-rendering
- status: seed
- depends-on: react-state
- introduced: —
- last-reviewed: —
- evidence: —

## automated-test
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## testing-a-route
- status: seed
- depends-on: automated-test, routes
- introduced: —
- last-reviewed: —
- evidence: —

## validation
- status: seed
- depends-on: request-response
- introduced: —
- last-reviewed: —
- evidence: —

## error-handling
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## hosting
- status: seed
- depends-on: deployment
- introduced: —
- last-reviewed: —
- evidence: —

## prod-env-variables
- status: seed
- depends-on: environment-variables, deployment
- introduced: —
- last-reviewed: —
- evidence: —

## build-step
- status: seed
- depends-on: vite
- introduced: —
- last-reviewed: —
- evidence: —

## connecting-deployed-pieces
- status: seed
- depends-on: deployment, api
- introduced: —
- last-reviewed: —
- evidence: —

## writing-a-plan
- status: introduced
- depends-on: none
- introduced: 2026-07-31
- last-reviewed: 2026-07-31
- evidence: co-wrote this build plan and owned every stack decision

## reviewing-a-diff
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## claude-md-agent-memory
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —
