// The test-server plumbing, in one place instead of copied into every test file.
// app.listen(0) picks any free port, so the URL isn't known until it's running —
// which is why this exports functions and not a plain value.
import app from './app.js'

let server

// Starts our own copy of the app and reports where to reach it.
export function start() {
  server= app.listen(0)
  const baseUrl = `http://localhost:${server.address().port}`
  return baseUrl
}

// Shuts down the server this file started.
export function stop() {
  server.close()
}
