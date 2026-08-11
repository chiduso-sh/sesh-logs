// count consecutive days (ending today) that have at least one session
export function computeStreak(sessions) {
  // a Set of unique day-labels like "Fri Aug 10 2026"
  const days = new Set(
    sessions
      .filter((s) => s.created_at)
      .map((s) => new Date(s.created_at).toDateString())
  )

  let streak = 0
  let day = new Date() // start from today
  while (days.has(day.toDateString())) {
    streak++
    day.setDate(day.getDate() - 1)
  }
  return streak
}
