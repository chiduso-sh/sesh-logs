// A SessionItem shows ONE session. It receives that session as a prop.
function SessionItem({ session }) {
  return (
    <li className="session-card">
      <small className="session-date">{new Date(session.created_at).toLocaleDateString()}</small>
      <strong className="session-workout">{session.workout}</strong>
      <p className="session-reflection">{session.reflection}</p>
    </li>
  )
}

export default SessionItem
