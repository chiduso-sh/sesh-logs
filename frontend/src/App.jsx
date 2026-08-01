import './App.css'

function App() {
  return (
    <main>
      <h1>Sesh logs</h1>
      <p>After session thoughts</p>

      <form>
        <label>
          Workout
          <input type="text" placeholder="e.g. Pull day — 5x5 pull-ups" />
        </label>

        <label>
          Reflection
          <textarea placeholder="e.g. Felt strong today, but my grip was weak" />
        </label>

        <label>Log sesstion</label>
        <button type="button">add sesh</button>
      </form>
    </main>
  )
}

export default App
