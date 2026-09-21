import { after, before, test } from 'node:test'
import assert from 'node:assert'
import app from './app.js';


let server
let BASE


before(() => {
  server = app.listen(0)
  BASE = `http://localhost:${server.address().port}`
})

after(() => {
    server.close()
})
test('signing up the same username twice returns 409 the second time', async () => {
  // a random username so this test is repeatable (never collides with an existing user)
  const username = 'test_' + Math.random().toString(36).slice(2)
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'longenough1' }),
  }

  const first = await fetch(`${BASE}/api/signup`, opts)
  assert.strictEqual(first.status, 201)
  const second = await fetch(`${BASE}/api/signup`, opts) // same username again
  assert.strictEqual(second.status, 409)
})
