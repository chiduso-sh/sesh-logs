import { test } from 'node:test'
import assert from 'node:assert'
import { computeStreak } from './streak.js'

// example: no sessions means no streak
test('empty list → streak of 0', () => {
  assert.strictEqual(computeStreak([]), 0)
})

// your turn: one session dated today should give a streak of 1
test('one session today → streak of 1', () => {
  const today = new Date().toISOString()
  const sessions = [{ created_at: today }]
  // TODO(you): assert that computeStreak(sessions) equals 1
  //   use assert.strictEqual(actual, expected)
  assert.strictEqual(computeStreak(sessions), 1)
})
