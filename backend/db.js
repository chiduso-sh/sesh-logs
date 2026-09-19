import pg from 'pg'

// A connection pool to the Postgres database.
// Reads the connection string from the DATABASE_URL environment variable.
// A "pool" reuses a set of open connections instead of opening a new one
// per query — faster, and how you're meant to talk to Postgres.
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})


export default pool
