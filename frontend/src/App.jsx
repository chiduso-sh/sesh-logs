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
  // holds an auth error message ('' = no error) — drives the error toast
  const [authError, setAuthError] = useState('')

  const [authMode, setAuthMode] = useState('login')

  async function handleLogin(e) {
    e.preventDefault() // stop the form from reloading the page
    setAuthLoading(true)
    setAuthError('') // clear any stale error at the start of a fresh attempt
    try {
      const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      })
      const data = await res.json()
      if (data.token) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
      } else {
        //HTTP error that try won't throw
        setAuthError(data.error || 'Invalid details, Please try again')
      }
    } catch {
      setAuthError('Could not reach the server, Please try again')
    } finally {
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
    setAuthMode('login')
  }

  async function handleSignup(e) {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    try {
      const signUpRes = await fetch(`${API}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      })
    if(!signUpRes.ok){
      const signUpData = await signUpRes.json()
      setAuthError(signUpData.error || 'Username taken twin')
      return
    }
      
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
      else{
        setAuthError(data.error || 'Signed up, but sign-in failed — try logging in')
      }
    } catch {
      setAuthError('Could not reach the server, Please try again')
    } finally {
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

  // auto-dismiss the error toast a few seconds after it appears
  useEffect(() => {
    if (!authError) return // no error showing → nothing to schedule
    const timer = setTimeout(() => setAuthError(''), 4500) // clear the toast after 4.5s
    return () => clearTimeout(timer)
  }, [authError])

  

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

      {authError && (
        <div className="toast" role="alert">
          <span className="toast-msg">{authError}</span>
          <button
            className="toast-close"
            type="button"
            aria-label="Dismiss"
            onClick={() => setAuthError('')}
          >×</button>
        </div>
      )}
      { !token ? (
      authMode === 'signup' ? (
        /* ---- Sign-up view (the designed panel) ---- */
        <section className="signup-screen auth-view">
          <div className="signup-panel">
            <span className="signup-eyebrow">New here</span>
            <div className="signup-head">
              <h2 className="signup-title">Create your account</h2>
              <p className="signup-sub">Set a username and password to start logging sessions.</p>
            </div>

            <form className="signup-form" onSubmit={handleSignup}>
              <label className="signup-field-label">
                Username
                <input
                  className="signup-field"
                  type="text"
                  placeholder="choose a username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </label>
              <label className="signup-field-label">
                Password
                <input
                  className="signup-field"
                  type="password"
                  placeholder="choose a password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </label>

              <button className="btn signup-cta" type="submit" disabled={authLoading} >Create account</button>
            </form>
          </div>
          <p className="auth-switch">
            Already have an account?{' '}
            <button className="auth-switch-link" type="button" onClick={() => setAuthMode('login')}>Log in</button>
          </p>
        </section>
      ) : (
        /* ---- Login view ---- */
        <div className="auth-view">
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
          </form>
          <p className="auth-switch" style={{ marginTop: 'var(--space-3)' }}>
            Don&rsquo;t have an account?{' '}
            <button className="auth-switch-link" type="button" onClick={() => setAuthMode('signup')}>Create an account &rarr;</button>
          </p>
        </div>
      )
      ) : (
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
      ) }

      <ModelViewer />
    </main>
  )
}

export default App
