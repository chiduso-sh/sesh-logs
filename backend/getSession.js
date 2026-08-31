import pool from './db.js'

// Fold the flat JOIN rows into ONE nested session object. (Your 18.2 assembler.)
function assembleSession(rows) {
  if (rows.length === 0) return null

  const session = {
    id: rows[0].session_id,
    workout: rows[0].workout,
    reflection: rows[0].reflection,
    created_at: rows[0].created_at,
    exercises: [],
  }

  const byExercise = {}
  for (const row of rows) {
    if (row.exercise_id === null) continue // skip the filler row a LEFT JOIN gives a childless session
    if (!byExercise[row.exercise_id]) {
      const ex = { name: row.exercise_name, position: row.ex_pos, sets: [] }
      byExercise[row.exercise_id] = ex
      session.exercises.push(ex)
    }
    byExercise[row.exercise_id].sets.push({
      reps: row.reps,
      weight: row.weight,
      position: row.set_pos,
    })
  }

  return session
}

// Read ONE session (with its exercises + sets) that belongs to this user.
// Returns the nested object, or null if it doesn't exist OR isn't theirs.
export async function getSession(id, userId) {
  const res = await pool.query(
    `SELECT s.id AS session_id, s.workout, s.reflection, s.created_at,
            e.id AS exercise_id, e.name AS exercise_name, e.position AS ex_pos,
            st.reps, st.weight, st.position AS set_pos
     FROM sessions s
     LEFT JOIN exercises e ON e.session_id = s.id
     LEFT JOIN sets st ON st.exercise_id = e.id
     WHERE s.id = $1
      AND s.user_id = $2
     ORDER BY e.position, st.position`,
    [id, userId]
  )
  return assembleSession(res.rows)
}
