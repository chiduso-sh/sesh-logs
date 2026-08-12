import pg from 'pg'

// A connection pool to the Postgres database.
// Reads the connection string from the DATABASE_URL environment variable.
// A "pool" reuses a set of open connections instead of opening a new one
// per query — faster, and how you're meant to talk to Postgres.
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // managed Postgres (Render/Neon) requires SSL
})

// Create the tables once, when the app starts (same SQL, Postgres runs it).
await pool.query(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    workout TEXT,
    reflection TEXT,
    user_id TEXT,
    created_at TEXT
  )
`)

await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password_hash TEXT
  )
`)

export default pool
