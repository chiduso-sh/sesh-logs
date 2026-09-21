// The entry point: `npm start` (and Render) run THIS file.
// app.js builds the app; this is the only place that starts it listening.

// TODO(you): import the app that app.js exports (default export, so no curly braces)
import app from './app.js'

const PORT = process.env.PORT || 3000

// TODO(you): start the app listening on PORT, logging the same
// "Server running on ..." message the old server.js printed


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
