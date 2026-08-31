import { test } from 'node:test'
import assert from 'node:assert'

const BASE = 'http://localhost:3000'

// INTEGRATION test: it hits the REAL running server, so start the server first!
test('save a nested session, then read it back with its exercises + sets', async () => {
  // 1) make a fresh user + log in to get a token
  const username = 'test_' + Math.random().toString(36).slice(2)
  const creds = { username, password: 'longenough1' }
  await fetch(`${BASE}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  })
  const loginRes = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  })
  const { token } = await loginRes.json()

  // 2) POST a nested session: 1 exercise, 2 sets (one weighted, one bodyweight)
  const payload = {
    workout: 'Test day',
    reflection: 'felt fine',
    exercises: [
      { name: 'Squat', sets: [{ reps: 5, weight: 100 }, { reps: 8, weight: null }] },
    ],
  }
  const postRes = await fetch(`${BASE}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(payload),
  })
  const { id } = await postRes.json() // the route returns the new session's id

  // 3) GET it back as the nested tree
  const getRes = await fetch(`${BASE}/api/sessions/${id}`, {
    headers: { 'Authorization': 'Bearer ' + token },
  })
  const tree = await getRes.json()

  // 4) assert the tree matches what we saved

  assert.strictEqual(tree.exercises.length, 1)
  assert.strictEqual(tree.exercises[0].name, 'Squat')
  assert.strictEqual(tree.exercises[0].sets.length, 2)
})
