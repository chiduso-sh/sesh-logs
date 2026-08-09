import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from './db.js'
// create the server application
const app = express()
app.use(cors())
app.use(express.json()) // parse incoming JSON request bodies onto req.body
// the port this server listens on
const PORT = 3000

// secret used to sign JWTs — from an env var in production, dev fallback for now
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

// middleware: allow the request through only if it carries a valid JWT
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.replace('Bearer ', '') // strip the "Bearer " prefix // strip the "Bearer " prefix
  
  if (!token) return res.status(401).json({ error: 'No token' })

  try {
    // TODO(you): verify the token — jwt.verify(token, JWT_SECRET) returns the decoded payload
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
app.get('/api/sessions', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM sessions WHERE user_id = ?').all(req.userId)
  res.json(rows)
})

// a route that receives a new session via POST
app.post('/api/sessions', requireAuth, (req, res) => {
  const { id, workout, reflection } = req.body
  db.prepare('INSERT INTO sessions (id, workout, reflection, user_id) VALUES (?, ?, ?, ?)').run(id, workout, reflection, req.userId)
  res.status(201).json(req.body) // 201 = "Created"; send the saved session back
})

// sign up: create a new user with a hashed password
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body

    const password_hash = await bcrypt.hash(password, 10)
     db.prepare(`INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)`).run( crypto.randomUUID(), username, password_hash )

  res.status(201).json({ username }) // send back the username (never the hash)
})

// log in: verify the password and issue a JWT
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  // find the user by username (.get returns ONE row, or undefined)
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  // TODO(you): compare `password` to `user.password_hash` with bcrypt.compare(...), and AWAIT it
  const match = await bcrypt.compare(password, user.password_hash)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })

  // TODO(you): create a token with jwt.sign({ id: user.id }, JWT_SECRET)
  const token = await jwt.sign({id:user.id}, JWT_SECRET)
  res.json({ token })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
