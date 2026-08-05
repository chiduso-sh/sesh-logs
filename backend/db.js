import Database from 'better-sqlite3'

// open the database file (creates sessions.db if it doesn't exist yet)
const db = new Database('sessions.db')

// define the sessions table if it isn't already there
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    workout TEXT,
    reflection TEXT
  )
`)

export default db
