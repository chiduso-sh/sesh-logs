import { useState } from 'react'
import './App.css'

function App() {
  const [workout, setWorkout] = useState('')
  const [reflection, setReflection] = useState('')


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

        <label>Log sesstion</label>
        <button type="button">add sesh</button>
      </form>


      <p>Live preview — workout: {workout}</p>
      <p>{reflection}</p>
    </main>
  )
}

export default App
