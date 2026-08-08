import express from 'express'
import cors from 'cors'
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
