import './testGuard.js'
import { after, before, test } from 'node:test'
import assert from 'node:assert'
import pool from './db.js'
import { start, stop } from './testServer.js'


const username = 'test_signup' + Math.random().toString(36).slice(2)
let baseUrl

before(() => {
  baseUrl = start()
})

after(async () => {
  await pool.query("DELETE FROM users WHERE username = $1", [username])
  await pool.end()
  stop()
})
test('signing up the same username twice returns 409 the second time', async () => {
  // a random username so this test is repeatable (never collides with an existing user)
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'longenough1' }),
  }

  const first = await fetch(`${baseUrl}/api/signup`, opts)
  assert.strictEqual(first.status, 201)
  const second = await fetch(`${baseUrl}/api/signup`, opts) // same username again
  assert.strictEqual(second.status, 409)
})
