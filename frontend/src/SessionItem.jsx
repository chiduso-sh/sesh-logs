// A SessionItem shows ONE session. It receives that session as a prop.
function SessionItem({ session }) {
  return (
    <li>
      <small>{new Date(session.created_at).toLocaleDateString()}</small>
      <strong>{session.workout}</strong>
      <p>{session.reflection}</p>
    </li>
  )
}

export default SessionItem
