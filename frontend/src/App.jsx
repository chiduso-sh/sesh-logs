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

  // ---- group sessions into month buckets, newest month first ----
  // 1) copy the array, then sort newest-first. We copy with [...sessions] because
  //    .sort() rearranges the array IN PLACE — sorting state directly would mutate it.
  const ordered = [...sessions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  // 2) walk the ordered list and drop each session into a bucket named by its month.
  const byMonth = {}
  for (const session of ordered) {
    const label = new Date(session.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if(!byMonth[label]){
      byMonth[label] = []
    }
    byMonth[label].push(session)
  }

  const trainedDays =  sessions.map((session) => (
    new Date(session.created_at).toDateString()
  ))

  const last7 = []

  // walk the last 7 days: 6 days ago (i=6) up to today (i=0)
  for (let i = 6; i >= 0; i--) {
    const day = new Date()          // start from right now
    day.setDate(day.getDate() - i)  // step the date back i days
    last7.push(trainedDays.includes(day.toDateString()))
  }
  

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
      <div className="win-body">
        {/* ---- slim icon rail ---- */}
        <div className="icons">
          <div className="icons-logo">S</div>

          {/* History — the active view (inert for now, no routing yet) */}
          <button className="icons-btn is-on" type="button" title="History">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4h12v12H4z" stroke="currentColor" strokeWidth="1.5"/><path d="M4 8h12M8 8v8" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>

          <div className="icons-spacer"></div>

          <button className="icons-btn" type="button" title="Log out" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 7l3 3-3 3M15 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* ---- list column (the feed lives here) ---- */}
        <section className="list-col">
          <div className="list-top">
            <span className="list-h">History<small>{sessions.length} sessions</small></span>
            <button className="btn-new" type="button">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              New session
            </button>
          </div>
          <div className="list-scroll">
            <div className="home-streak">
              <span className="streak-flame">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M10 2c.6 2.4-.7 3.6-1.9 4.8C6.7 8.1 5.5 9.4 5.5 12a4.5 4.5 0 0 0 9 0c0-1.6-.7-2.8-1.5-3.8-.3 1-.9 1.6-1.7 1.9.4-2.3-.4-4.6-1.8-8.1z" fill="currentColor"/></svg>
              </span>
              <div className="streak-main">
                <div className="streak-num"><b>{streak}</b><span>day streak</span></div>
              </div>
              <div className="streak-dots">
                {/* 7 last-days dots — wired to real data in the next step */}
                {last7.map((last, i) => (
                  <i className={last ? 'on' : ''} key={i}></i>
                ))}
              </div>
            </div>

            {Object.entries(byMonth).map(([label, sessions]) => (
              <div className="feed-month" key={label}>
                <div className='month-head'>
                  {label}
                </div>
                {sessions.map((session) => (
                  <div className="feed-card" key={session.id}>
                    <div className="card-top">
                      <span className="sesh-name">{session.workout}</span>
                      
                      <span className="sesh-date">{new Date(session.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="card-reflect">
                      <p>{session.reflection}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
      ) }

      <ModelViewer />
    </main>
  )
}

export default App
