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
- status: practicing
- depends-on: database
- introduced: 2026-07-31
- last-reviewed: 2026-08-05
- evidence: wrote SELECT * FROM sessions with db.prepare(...).all(); understood empty table = empty result

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

## in-memory-storage
- status: practicing
- depends-on: array-state
- introduced: 2026-08-05
- last-reviewed: 2026-08-06
- evidence: built it, then replaced it with the database and deleted it; contrasted "lost on restart" (memory) vs "survives" (disk/db)

## dead-code-removal
- status: practicing
- depends-on: db-to-server
- introduced: 2026-08-06
- last-reviewed: 2026-08-06
- evidence: identified the unused in-memory array as dead code, reasoned it was safe to delete (grep the identifier; table name ≠ variable), removed it, and verified nothing broke

## api
- status: practicing
- depends-on: frontend-backend-separation
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: built the server side (GET /api/sessions) AND consumed it from React via fetch — full round trip across the two programs

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
- status: practicing
- depends-on: localhost
- introduced: 2026-08-01
- last-reviewed: 2026-08-05
- evidence: set const PORT = 3000 and had the server listen on it; reinforced port = which program the browser reaches

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

## useEffect
- status: practicing
- depends-on: react-state
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: added useEffect(() => loadSessions(), []) to auto-load on mount; explained that no dependency array = runs every render → infinite loop

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
- evidence: wrote setSessions([...sessions, newSession]) after several guided attempts; then reused replace-don't-mutate unprompted in clearList (setSessions([]))

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
- status: practicing
- depends-on: react-component
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: built SessionItem({ session }) and passed session={session} from App's map; cleared up the "map lives in the parent, child renders one" confusion

## module-imports
- status: practicing
- depends-on: react-component
- introduced: 2026-08-01
- last-reviewed: 2026-08-01
- evidence: added `export default SessionItem` and imported it into App with `import SessionItem from './SessionItem'`

## nodejs
- status: practicing
- depends-on: javascript
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: ran `node server.js`; hit and fixed a MODULE_NOT_FOUND from running in the wrong folder

## express
- status: practicing
- depends-on: nodejs
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: wrote a minimal server: import express, const app = express(), app.listen(PORT, callback)

## working-directory
- status: practicing
- depends-on: nodejs
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: learned commands run relative to the current folder — cd backend fixed "Cannot find module ...\server.js"

## module-systems
- status: introduced
- depends-on: module-imports
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: set "type": "module" so the backend uses import (ES modules) instead of require (CommonJS)

## server
- status: practicing
- depends-on: backend
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: started an Express server and saw it hold the terminal open — explained a server never "finishes", it listens

## routes
- status: practicing
- depends-on: express
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: wrote app.get('/', (req,res) => res.send('wesh')); learned the server needs a restart to load new code (no hot reload)

## http-methods
- status: practicing
- depends-on: routes
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: GET (read) vs POST (write): added an app.post route and POSTed from React; saw the server log the received session

## request-body
- status: practicing
- depends-on: http-methods
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: sent a session in the POST body via JSON.stringify + Content-Type header; server read it with express.json() → req.body

## request-response
- status: practicing
- depends-on: server
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: traced the full cycle: browser GET / → handler runs → res.send → browser shows the response

## ports
- status: seed
- depends-on: localhost
- introduced: —
- last-reviewed: —
- evidence: —

## fetch
- status: practicing
- depends-on: api
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: used fetch() to call /api/sessions from React; used console.log to inspect the fetched data while debugging

## json
- status: practicing
- depends-on: api
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: built a res.json route returning an array of session objects; saw JSON vs plain text; fixed a missing-comma syntax error and a not-called crypto.randomUUID

## http-from-react
- status: practicing
- depends-on: fetch, react-component
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: wired a "load from server" button to fetch API data and setSessions(data); debugged a setSessions([data]) double-nesting bug

## cors
- status: practicing
- depends-on: api
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: hit a real CORS block (5173→3000), explained cross-origin, fixed it with app.use(cors()) after npm install cors

## async-await
- status: practicing
- depends-on: javascript
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: wrote an async function with two awaits (await fetch, await res.json)

## middleware
- status: practicing
- depends-on: express
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: added app.use(cors()) and app.use(express.json()) — saw express.json() populate req.body from the POST

## tables
- status: practicing
- depends-on: sql
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: created a sessions table with columns id/workout/reflection

## schema
- status: practicing
- depends-on: tables
- introduced: 2026-08-05
- last-reviewed: 2026-08-06
- evidence: authored a users table schema (id PRIMARY KEY, username UNIQUE, password_hash); learned one .db file holds many tables after mistakenly overwriting sessions

## sqlite-postgres
- status: introduced
- depends-on: postgresql
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: using SQLite locally (a single .db file); same SQL that transfers to Postgres at deploy

## crud
- status: practicing
- depends-on: sql
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: Read (SELECT) + Create (INSERT); debugged assigning .run()'s metadata into req.body; verified data survives a full server restart

## parameterized-queries
- status: introduced
- depends-on: sql
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: used ? placeholders with .run(id, workout, reflection) instead of pasting values into SQL (explained: prevents SQL injection)

## db-to-server
- status: practicing
- depends-on: server, database
- introduced: 2026-08-05
- last-reviewed: 2026-08-05
- evidence: wired db.js into server via import; predicted importing runs db.js and creates sessions.db

## password-hashing-bcrypt
- status: practicing
- depends-on: authentication
- introduced: 2026-08-06
- last-reviewed: 2026-08-06
- evidence: hash on signup + await bcrypt.compare on login; verified stored value is a $2b$10$ hash; wrong password / unknown user both give 401

## environment-variables
- status: introduced
- depends-on: none
- introduced: 2026-08-06
- last-reviewed: 2026-08-06
- evidence: read the JWT secret from process.env.JWT_SECRET (with a dev fallback); understands secrets shouldn't be hardcoded/committed — real value set at deploy

## jwt
- status: practicing
- depends-on: authentication
- introduced: 2026-08-06
- last-reviewed: 2026-08-06
- evidence: issued a token with jwt.sign({id}, secret) on login; saw the 3 parts (header.payload.signature) and understood payload is signed-not-encrypted (readable, not forgeable)

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
