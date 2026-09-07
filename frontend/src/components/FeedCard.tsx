interface Session {
    id: string,
    workout: string,
    created_at: string,
    reflection: string,
}

interface FeedCardProps {
  session: Session,
  onSelect: (id: string) => void
}

const FeedCard = ({onSelect, session}: FeedCardProps) => {
  return (
    <div className="feed-card" onClick={() => {onSelect(session.id)}}>
  <div className="card-top" >
    <span className="sesh-name">{session.workout}</span>
    
    <span className="sesh-date">{new Date(session.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
  </div>
  <div className="card-reflect">
    <p>{session.reflection}</p>
  </div>
</div>
  )
}

export default FeedCard
