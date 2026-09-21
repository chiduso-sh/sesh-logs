import { test } from 'node:test'
import assert from 'node:assert'

const BASE = 'http://localhost:3000'

// INTEGRATION test: it hits the REAL running server, so start the server first!
test('GET /health answers 200 with status ok', async () => {
  const res = await fetch(`${BASE}/health`)

  // TODO(you): assert the status code is the one curl showed us.
  // Same shape as signup.test.js: assert.strictEqual(actual, expected)
  assert.strictEqual(res.status, 200)

  const body = await res.json()

  // TODO(you): assert the body matches what the route now sends back.
  // `body` is an object, not a number - so compare one of its properties.
  assert.strictEqual(body.status, 'ok')
})
