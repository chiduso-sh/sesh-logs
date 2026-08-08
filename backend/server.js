import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import db from './db.js'
// create the server application
const app = express()
app.use(cors())
app.use(express.json()) // parse incoming JSON request bodies onto req.body
// the port this server listens on
const PORT = 3000


// a route: for a GET request to "/", send a response back
app.get('/', (req, res) => {
  res.send('wesh')
})

// a route that returns the current list of sessions as JSON data
app.get('/api/sessions', (req, res) => {
  const rows = db.prepare('SELECT * FROM sessions').all()
  res.json(rows)
})

// a route that receives a new session via POST
app.post('/api/sessions', (req, res) => {
  const { id, workout, reflection } = req.body
  db.prepare('INSERT INTO sessions (id, workout, reflection) VALUES (?, ?, ?)').run(id, workout, reflection)
  res.status(201).json(req.body) // 201 = "Created"; send the saved session back
})

// sign up: create a new user with a hashed password
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body

  // TODO(you): hash the password. Use bcrypt.hash(password, 10) and AWAIT it.
    const password_hash = await bcrypt.hash(password, 10)
  // TODO(you): INSERT a new user into the users table.
  //   columns: id (use crypto.randomUUID()), username, password_hash

  db.prepare(`INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)`).run( crypto.randomUUID(), username, password_hash )

  res.status(201).json({ username }) // send back the username (never the hash)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
