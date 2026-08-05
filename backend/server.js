import express from 'express'
import cors from 'cors'
// create the server application
const app = express()
app.use(cors())
app.use(express.json()) // parse incoming JSON request bodies onto req.body
// the port this server listens on
const PORT = 3000

// our in-memory store of sessions (lives as long as the server runs)
let sessions = [
  { id: crypto.randomUUID(), workout: 'Pull ups', reflection: 'Was aiit' },
  { id: crypto.randomUUID(), workout: 'Push ups', reflection: 'Was aiit' },
]

// a route: for a GET request to "/", send a response back
app.get('/', (req, res) => {
  res.send('wesh')
})

// a route that returns the current list of sessions as JSON data
app.get('/api/sessions', (req, res) => {
  res.json(sessions)
})

// a route that receives a new session via POST
app.post('/api/sessions', (req, res) => {
  // TODO(you): add the new session (req.body) to the sessions array
  res.status(201).json(req.body) // 201 = "Created"; send the saved session back
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
