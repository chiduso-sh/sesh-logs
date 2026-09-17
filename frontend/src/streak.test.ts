import { test } from 'node:test'
import assert from 'node:assert'
import { computeStreak } from './streak.ts';


// example: no sessions means no streak
test('empty list → streak of 0', () => {
  assert.strictEqual(computeStreak([]), 0)
})

// your turn: one session dated today should give a streak of 1
test('one session today → streak of 1', () => {
  const today = new Date().toISOString()
  const sessions = [{ created_at: today }]
  assert.strictEqual(computeStreak(sessions), 1)
})
