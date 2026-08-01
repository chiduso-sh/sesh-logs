# Project: Workout Reflection Log

## About me
- Computer engineering student; comfortable in the terminal (npm, installing packages).
- Familiar with React, but self-describes as stuck in "tutorial hell" — knows pieces, hasn't built and shipped a real thing consistently.
- Motivation: build real, scalable products to show recruiters; wants to finally be proficient after years of wanting it.
- Genuine interests: calisthenics, reading literary fiction / psychology / philosophy. Loses track of time in a good book.
- The itch: can't stay consistent documenting thoughts after workout sessions — the app's job is to make that easy enough to actually do.

## The idea
A private web app for logging calisthenics sessions and capturing a short reflection after each one. It shows your history and a simple consistency view (streak/calendar) so you can actually *see* whether you're showing up. The whole point is to lower the friction of reflecting after training so it becomes a habit.

## MVP
### In
- Log a workout session (date + what you did, free text to start)
- A short reflection prompt after the session (e.g. "How did that feel? What did you notice?")
- A history list of past sessions
- A consistency view — simple streak or calendar showing whether you're showing up
- Accounts / login so the log is private to you

### Parking lot (v2)
- Structured exercises (sets, reps, weight, progressions)
- Charts and analytics / trends
- Reminders or notifications
- Tags, search, mood tracking
- Sharing, social, export

## The trunk — core components

### Source control (git)
The professional save-and-undo system that records snapshots of the code, so you can experiment freely and rewind mistakes. In place from day one, before any features.

### Frontend (React)
The part users see and click — the session form, reflection prompt, history list, streak view. Runs in the browser. Where existing React knowledge lives.

### Backend (server)
Code that runs on a server, not in the browser. Handles what the browser can't be trusted with: saving sessions, checking who's logged in, deciding who can see what. The trusted brain and guard.

### Database
Where workout entries and reflections live permanently so they survive closing the tab and are available across devices. The backend reads from and writes to it.

### Authentication
How the app knows you are you and keeps your log private — sign up, log in, stay logged in. A portfolio-strong skill when done properly.

### API (how the pieces talk)
The frontend and backend are separate programs that communicate by sending messages over HTTP — "save this session" / "done." That contract is the API.

### Where the code runs (local vs. deployed)
During building, everything runs on your machine (localhost). Deployed means it runs on an internet-reachable computer. Knowing the difference prevents a lot of confusion later.

### Deployment
The step that turns the laptop demo into a live URL you can send to a recruiter — what makes it a real product instead of a tutorial.
