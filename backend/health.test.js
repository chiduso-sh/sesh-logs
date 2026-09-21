import { test, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'

let server
let BASE

// Runs once, before the test: start OUR OWN copy of the app on any free port.
before(() => {
  server = app.listen(0)
  BASE = `http://localhost:${server.address().port}`
})

// Runs once, after the test: shut down the server we started.
after(() => {
  server.close()
})

test('GET /health answers 200 with status ok', async () => {
  const res = await fetch(`${BASE}/health`)

  assert.strictEqual(res.status, 200)

  const body = await res.json()

  assert.strictEqual(body.status, 'ok')
})
