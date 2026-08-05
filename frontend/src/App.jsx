import { useState, useEffect } from 'react'
import './App.css'
import SessionItem from './SessionItem'

function App() {
  const [workout, setWorkout] = useState('')
  const [reflection, setReflection] = useState('')
  const [sessions, setSessions] = useState([])

  async function handleAdd() {
    const newSession = { id: crypto.randomUUID(), workout, reflection }

    // send the new session to the backend with a POST request
    await fetch('http://localhost:3000/api/sessions', {
      // TODO(you): set method to 'POST';
      //   add headers: { 'Content-Type': 'application/json' };
      //   set body to JSON.stringify(newSession)
      method : 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newSession)
    })

    setWorkout('')
    setReflection('')
    setSessions([...sessions, newSession])
  }

  function clearList(){
    setSessions([])
  }

  // fetch the sessions from the backend API
  async function loadSessions() {
    const res = await fetch('http://localhost:3000/api/sessions')
    const data = await res.json()
    setSessions(data)
  }

  // run once, right after the page first loads: fetch the sessions
  useEffect(() => {
    loadSessions()
  }, [])

  return (
    <main>
      <h1>Sesh logs</h1>
      <p>After session thoughts</p>

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
