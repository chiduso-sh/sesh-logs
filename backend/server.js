import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from './db.js'
// create the server application
const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json()) // parse incoming JSON request bodies onto req.body
// the port this server listens on
const PORT = process.env.PORT || 3000

// secret used to sign JWTs — from an env var in production, dev fallback for now
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

// middleware: allow the request through only if it carries a valid JWT
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.replace('Bearer ', '') // strip the "Bearer " prefix // strip the "Bearer " prefix
  
  if (!token) return res.status(401).json({ error: 'No token' })

  try {
     const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.id // remember who the user is, for the route to use
    next() // valid — let the request proceed to the route
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}


// a route: for a GET request to "/", send a response back
app.get('/', (req, res) => {
  res.send('wesh')
})

// a route that returns the current list of sessions as JSON data
app.get('/api/sessions', requireAuth, async (req, res) => {
  const result = await db.query('SELECT * FROM sessions WHERE user_id = $1', [req.userId])
  res.json(result.rows)
})

// a route that receives a new session via POST
app.post('/api/sessions', requireAuth, async (req, res) => {
  const { id, workout, reflection } = req.body

  if(!workout) return res.status(400).json({error: 'Log your workout sesh twin'})
  await db.query('INSERT INTO sessions (id, workout, reflection, user_id, created_at) VALUES ($1, $2, $3, $4, $5)', [id, workout, reflection, req.userId, new Date().toISOString()])
  res.status(201).json(req.body) // 201 = "Created"; send the saved session back
})

// sign up: create a new user with a hashed password
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body

    if(!username || !password) return res.status(400).json({error: 'Input your crendentials'})
    if(username.length < 3) return res.status(400).json({error: 'Username must be at least 3 characters'})
    if(password.length < 8) return res.status(400).json({error: 'Password must be at least 8 characters'})

    const password_hash = await bcrypt.hash(password, 10)
    try {
        await db.query('INSERT INTO users (id, username, password_hash) VALUES ($1, $2, $3)', [crypto.randomUUID(), username, password_hash])
        res.status(201).json({ username }) // send back the username (never the hash)
    } catch (error) {
        return res.status(409).json({ error: 'Username already taken' })
    }
})

// log in: verify the password and issue a JWT
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  // find the user by username (result.rows[0] is the first row, or undefined)
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username])
  const user = result.rows[0]
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.password_hash)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })

  const token = await jwt.sign({id:user.id}, JWT_SECRET)
  res.json({ token })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
