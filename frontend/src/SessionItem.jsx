// A SessionItem shows ONE session. It receives that session as a prop.
function SessionItem({ session }) {
  return (
    <li>
      <strong>{session.workout}</strong>
      <p>{session.reflection}</p>
    </li>
  )
}

export default SessionItem
