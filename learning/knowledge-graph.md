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
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## repo
- status: seed
- depends-on: git
- introduced: —
- last-reviewed: —
- evidence: —

## commits
- status: seed
- depends-on: git
- introduced: —
- last-reviewed: —
- evidence: —

## npm
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## vite
- status: seed
- depends-on: npm
- introduced: —
- last-reviewed: —
- evidence: —

## react-component
- status: seed
- depends-on: javascript
- introduced: —
- last-reviewed: —
- evidence: —

## jsx
- status: seed
- depends-on: react-component
- introduced: —
- last-reviewed: —
- evidence: —

## localhost
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## css
- status: seed
- depends-on: none
- introduced: —
- last-reviewed: —
- evidence: —

## react-state
- status: seed
- depends-on: react-component
- introduced: —
- last-reviewed: —
- evidence: —

## event-handling
- status: seed
- depends-on: react-component
- introduced: —
- last-reviewed: —
- evidence: —

## controlled-inputs
- status: seed
- depends-on: react-state
- introduced: —
- last-reviewed: —
- evidence: —

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
