interface StreakBarProp {
    streak: number,
    last7: number
}


const StreakBar = ({streak, last7}: StreakBarProp) => {

  return(
    <div className="home-streak">
      <span className="streak-flame">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M10 2c.6 2.4-.7 3.6-1.9 4.8C6.7 8.1 5.5 9.4 5.5 12a4.5 4.5 0 0 0 9 0c0-1.6-.7-2.8-1.5-3.8-.3 1-.9 1.6-1.7 1.9.4-2.3-.4-4.6-1.8-8.1z" fill="currentColor"/></svg>
      </span>
      <div className="streak-main">
        <div className="streak-num"><b>{streak}</b><span>day streak</span></div>
      </div>
      <div className="streak-dots">
        {last7.map((last, i) => (
          <i className={last ? 'on' : ''} key={i}></i>
        ))}
      </div>
    </div>
              
  )
}

export default StreakBar
