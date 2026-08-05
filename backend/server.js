import express from 'express'

// create the server application
const app = express()

// the port this server listens on
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
