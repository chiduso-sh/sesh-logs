import { useState, useEffect } from 'react'
import './App.css'
import SessionItem from './SessionItem'
import ModelViewer from './ModelViewer'
import { computeStreak } from './streak'

function App() {
  const [workout, setWorkout] = useState('')
  const [reflection, setReflection] = useState('')
  const [sessions, setSessions] = useState([])

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  // the JWT — start from localStorage so a refresh keeps you logged in
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // true while a login/signup request is in flight — drives the spinner overlay
  const [authLoading, setAuthLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault() // stop the form from reloading the page
    // TODO(you): flip the spinner ON — should this line sit here (before the try) or inside it?
    setAuthLoading(true)
    try {
      const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      })
      const data = await res.json()
      if(data.token){
        setToken(data.token)
        localStorage.setItem('token', data.token)
      }
    } finally {
      // TODO(you): flip the spinner OFF — this block always runs, even if the fetch threw
      setAuthLoading(false)
    }
  }

  async function handleAdd() {
   const newSession = { id: crypto.randomUUID(), workout, reflection, created_at: new Date().toISOString() }

    // send the new session to the backend with a POST request
    await fetch(`${API}/api/sessions`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      body: JSON.stringify(newSession)
    })

    setWorkout('')
    setReflection('')
    setSessions([...sessions, newSession])
  }


  function handleLogout() {
    setToken('')
    localStorage.removeItem('token')
  }

  async function handleSignup() {
    // create the account...
    setAuthLoading(true)
    try {
      await fetch(`${API}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      })
      // ...then log in right away to get a token
      const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      })
      const data = await res.json()
      if (data.token) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
      }
    } finally{
      setAuthLoading(false)
    }
  }

  // fetch the sessions from the backend API
  async function loadSessions() {
    if (!token) return // not logged in yet — nothing to load
    const res = await fetch(`${API}/api/sessions`, {
      headers : { 'Authorization': 'Bearer ' + token}
    })
    const data = await res.json()
    if (Array.isArray(data)) setSessions(data)
  }

  // load whenever the token changes (already-logged-in on first load, and right after logging in)
  useEffect(() => {
    loadSessions()
  }, [token])

  const streak = computeStreak(sessions)

  return (
    <main className="app-shell">
      <h1 className="brand">Sesh logs</h1>
      <p className="tagline">After session thoughts</p>

      {authLoading && (
        <div className="auth-overlay" role="status">
          <span className="spinner" aria-hidden="true"></span>
          <span className="auth-overlay-label">Signing you in…</span>
        </div>
      )}
      { !token ?
      <form className="auth-form card" onSubmit={handleLogin}>
        <input
          className="field"
          type="text"
          placeholder="username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          className="field"
          type="password"
          placeholder="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={authLoading}>log in</button>
        <button className="btn btn-secondary" type="button" onClick={handleSignup} disabled={authLoading}>sign up</button>
      </form>

      :
      <section className="app">
        <p className="streak">
          <span className="streak-num">{streak}</span>
          <span className="streak-label">day streak</span>
        </p>
      <form className="sesh-form">
        <label className="field-label">
          Workout
          <input
            className="field"
            type="text"
            placeholder="e.g. Pull day — 5x5 pull-ups"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
          />
        </label>

        <label className="field-label">
          Reflection

          <textarea
            className="field textarea"
            value={reflection} onChange={(e) => setReflection(e.target.value)}
            placeholder="e.g. Felt strong today, but my grip was weak"
          />
        </label>

        <button className="btn btn-primary btn-block" type="button" onClick={() => handleAdd()}>add sesh</button>
      </form>


      <ul className="sesh-list">
        List
        {sessions.map((session) => (
          <SessionItem key={session.id} session={session}/>
        ))}
      </ul>

      <div className="util-row">
        <button className="btn btn-quiet" type='button' onClick={() => loadSessions()}>load from server</button>
        <button className="btn btn-quiet" type="button" onClick={handleLogout}>log out</button>
      </div>
      </section>
      }

      <ModelViewer />
    </main>
  )
}

export default App
