import { useState, useEffect } from 'react'
import './App.css'
import SessionItem from './SessionItem'

function App() {
  const [workout, setWorkout] = useState('')
  const [reflection, setReflection] = useState('')
  const [sessions, setSessions] = useState([])

  // the JWT — start from localStorage so a refresh keeps you logged in
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault() // stop the form from reloading the page
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginUsername, password: loginPassword }),
    })
    const data = await res.json()
    // TODO(you): if we got a token (data.token), save it two places:
    //   into state with setToken(...), AND into localStorage.setItem('token', ...)
    if(data.token){
      setToken(data.token)
      localStorage.setItem('token', data.token)
    }
  }

  async function handleAdd() {
    const newSession = { id: crypto.randomUUID(), workout, reflection }

    // send the new session to the backend with a POST request
    await fetch('http://localhost:3000/api/sessions', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      body: JSON.stringify(newSession)
    })

    setWorkout('')
    setReflection('')
    setSessions([...sessions, newSession])
  }

  function clearList(){
    setSessions([])
  }

  function handleLogout() {
    // TODO(you): log out — clear the token from state (setToken('')) AND
    //   remove it from localStorage (localStorage.removeItem('token'))
  }

  // fetch the sessions from the backend API
  async function loadSessions() {
    if (!token) return // not logged in yet — nothing to load
    const res = await fetch('http://localhost:3000/api/sessions', {
      headers : { 'Authorization': 'Bearer ' + token}
    })
    const data = await res.json() 
    if (Array.isArray(data)) setSessions(data)
  }

  // load whenever the token changes (already-logged-in on first load, and right after logging in)
  useEffect(() => {
    loadSessions()
  }, [token])

  return (
    <main>
      <h1>Sesh logs</h1>
      <p>After session thoughts</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit">log in</button>
      </form>

      <form>
        <label>
          Workout
          <input
            type="text"
            placeholder="e.g. Pull day — 5x5 pull-ups"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
          />
        </label>

        <label>
          Reflection
  
          <textarea
            value={reflection} onChange={(e) => setReflection(e.target.value)}
            placeholder="e.g. Felt strong today, but my grip was weak"
          />
        </label>

        <button type="button" onClick={() => handleAdd()}>add sesh</button>
      </form>


      <ul>
        List
        {sessions.map((session) => (
          <SessionItem key={session.id} session={session}/>
        ))}
      </ul>

      <button type='button' onClick={() => clearList()}>clear</button>
      <button type='button' onClick={() => loadSessions()}>load from server</button>
    </main>
  )
}

export default App
