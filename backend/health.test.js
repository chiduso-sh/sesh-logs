import './testGuard.js'
import { test, before, after } from 'node:test'
import assert from 'node:assert'
import { start, stop } from './testServer.js'

// Runs once, before the test: start OUR OWN copy of the app on any free port.
let baseUrl

before(() => {
  baseUrl = start()
})


// Runs once, after the test: shut down the server we started.
after(() => {
  stop()
})

test('GET /health answers 200 with status ok', async () => {
  const res = await fetch(`${baseUrl}/health`)

  assert.strictEqual(res.status, 200)

  const body = await res.json()

  assert.strictEqual(body.status, 'ok')
})
