import pool from './db.js'
import crypto from 'crypto'

// Save a whole session tree (session + exercises + sets) as ONE all-or-nothing unit.
export async function saveSession({ workout, reflection, exercises = [] }, userId) {
  // Grab ONE dedicated connection from the pool. A transaction's BEGIN/COMMIT must
  // all run on the SAME connection — so we can't use pool.query() here, which may
  // hand back a different connection on each call.
  const client = await pool.connect()

  try {
    await client.query('BEGIN')   // open the transaction — nothing is permanent until COMMIT

    // 1) the session row — the server generates the id (not the client)
    const sessionId = crypto.randomUUID()
    await client.query(
      'INSERT INTO sessions (id, workout, reflection, user_id, created_at) VALUES ($1, $2, $3, $4, $5)',
      [sessionId, workout, reflection, userId, new Date().toISOString()]
    )

    // 2) each exercise — the loop index i becomes its position (preserves order)
    for (let i = 0; i < exercises.length; i++) {
      const ex = exercises[i]
      const exerciseId = crypto.randomUUID()
      await client.query(
        'INSERT INTO exercises (id, session_id, name, position) VALUES ($1, $2, $3, $4)',
        [exerciseId, sessionId, ex.name, i]
      )

      // 3) each set inside that exercise — same move, one level deeper
      for (let j = 0; j < ex.sets.length; j++) {
        const s = ex.sets[j]
        const setId = crypto.randomUUID()
        await client.query(
          'INSERT INTO sets (id, exercise_id, reps, weight, position) VALUES ($1, $2, $3, $4, $5)',
          [setId, exerciseId, s.reps, s.weight, j]
        )
      }
    }

    await client.query('COMMIT')  // every insert succeeded — make it all permanent
    return sessionId
  } catch (err) {
    await client.query('ROLLBACK')
    throw err                     // re-throw so the caller (the route) knows the save failed
  } finally {
    client.release()              // ALWAYS hand the connection back to the pool, success or fail
  }
}
