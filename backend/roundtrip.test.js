import './testGuard.js'
import { after, before, test } from 'node:test'
import { start, stop } from './testServer.js'
import assert from 'node:assert'
import pool from './db.js'


const username = 'test_roundtrip' + Math.random().toString(36).slice(2)
let baseUrl

before(() => {
  baseUrl = start()
})

after(async () => {
  await pool.query("DELETE FROM users WHERE username = $1", [username])
  await pool.end()
  stop()
})
test('save a nested session, then read it back with its exercises + sets', async () => {
  const creds = { username, password: 'longenough1' }
  await fetch(`${baseUrl}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  })
  const loginRes = await fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  })
  const { token } = await loginRes.json()

  const payload = {
    workout: 'Test day',
    reflection: 'felt fine',
    exercises: [
      { name: 'Squat', sets: [{ reps: 5, weight: 100 }, { reps: 8, weight: null }] },
    ],
  }
  const postRes = await fetch(`${baseUrl}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(payload),
  })
  const { id } = await postRes.json() 

  const getRes = await fetch(`${baseUrl}/api/sessions/${id}`, {
    headers: { 'Authorization': 'Bearer ' + token },
  })
  const tree = await getRes.json()


  assert.strictEqual(tree.exercises.length, 1)
  assert.strictEqual(tree.exercises[0].name, 'Squat')
  assert.strictEqual(tree.exercises[0].sets.length, 2)
})
