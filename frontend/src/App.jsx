import { useState } from 'react'
import './App.css'
import SessionItem from './SessionItem'

function App() {
  const [workout, setWorkout] = useState('')
  const [reflection, setReflection] = useState('')
  const [sessions, setSessions] = useState([])

  function handleAdd() {
    const newSession = { id: crypto.randomUUID(), workout, reflection }

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
    // TODO(you): put the fetched `data` into state so the list renders it
    //            (use your sessions setter)
  }

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
