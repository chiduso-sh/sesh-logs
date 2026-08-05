import express from 'express'
// create the server application
const app = express()

// the port this server listens on
const PORT = 3000

// a route: for a GET request to "/", send a response back
app.get('/', (req, res) => {
  res.send('wesh')
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
