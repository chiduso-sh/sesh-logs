import { test } from 'node:test'
import assert from 'node:assert'

const BASE = 'http://localhost:3000'

// INTEGRATION test: it hits the REAL running server, so start the server first!
test('signing up the same username twice returns 409 the second time', async () => {
  // a random username so this test is repeatable (never collides with an existing user)
  const username = 'test_' + Math.random().toString(36).slice(2)
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'longenough1' }),
  }

  const first = await fetch(`${BASE}/api/signup`, opts)
  // TODO(you): assert the first signup SUCCEEDED — first.status should be 201
  assert.strictEqual(first.status, 201)
  const second = await fetch(`${BASE}/api/signup`, opts) // same username again
  // TODO(you): assert the duplicate was REJECTED — second.status should be 409
  assert.strictEqual(second.status, 409)
})
