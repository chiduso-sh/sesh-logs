import express from 'express'
// create the server application
const app = express()

// the port this server listens on
const PORT = 3000

// a route: for a GET request to "/", send a response back
app.get('/', (req, res) => {
  res.send('wesh')
})

// a route that returns a list of sessions as JSON data
app.get('/api/sessions', (req, res) => {
  const sessions = [
    // TODO(you): put 2 session objects here, each with
    // an id, a workout, and a reflection (like the ones in your React app)
    {
        id: crypto.randomUUID(),
        workout: 'Pull ups',
        reflection: 'Was aiit'
    },
    {
        id: crypto.randomUUID(),
        workout: 'Push ups',
        reflection: 'Was aiit'
    }
  ]
  res.json(sessions)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
