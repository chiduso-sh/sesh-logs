# Design brief — v4 (AI interview + navigation shell)

Brief to hand to a designer (or Claude Design). Self-contained by design — it
restates the product and the design system so it needs no other context.

Scope decided 2026-09-16: design the **interview** and the **navigation model**
up front, because the interview is the product's centerpiece and routing can't
be structured until the screens are known. Settings, upgrade, and search detail
get designed inline in the sections that build them.

---

I need designs for two parts of an existing web app. Please produce artboards
for both desktop and mobile (phone-first — most use happens on a phone).

## The product

"Sesh logs" — a training reflection journal. You log a workout (exercises,
sets, reps, weight), and then an AI interviews you about it: it asks 2–3
follow-up questions grounded in what you just did and what you wrote in
previous sessions, and that back-and-forth exchange becomes your saved
reflection. The journal is the product; the exercise log is the context that
makes the AI's questions specific and personal.

## Existing design system — please match it exactly

Aesthetic: brushed metal at night. Near-black ground, silver text, hairline
borders, faint metallic sheens. Dark mode only.

Colors:
  bg           #0b0b0e   near-black page
  surface      #16161b   cards, raised panels
  surface-2    #1e1e25   inputs, hovers
  border       #2b2b33   hairline borders
  text         #c8c8d2   silver body text
  text-strong  #f2f2f6   headings, emphasis
  muted        #83838f   secondary / metadata
  accent       #d9d9e3   silver accent (buttons, highlights)
  accent-ink   #0b0b0e   dark text sitting on a silver fill

Metallic treatments (use these rather than flat fills):
  metal-text   linear-gradient(180deg, #fff 0%, #d4d4de 42%, #85858f 100%)
  metal-fill   linear-gradient(180deg, #f5f5f9 0%, #d6d6e0 46%, #b3b3bf 100%)
  metal-panel  linear-gradient(180deg, rgba(255,255,255,.05), transparent 55%)
  sheen        rgba(255,255,255,0.08)
  glow         rgba(212,212,222,0.14)

Spacing scale: 4 / 8 / 16 / 24 / 40 / 64px. Radius 12px, large 18px.
Type: system sans for body; Oswald (condensed) for display headings and labels.
Page background carries two faint radial silver glows, top-centre and bottom.

Already designed and NOT to be redesigned: the history feed (month-grouped
session cards with a streak bar), the session detail panel, the login and
signup screens. New work should sit alongside these comfortably.

## Part 1 — The AI interview (the centerpiece)

This is the screen that matters most. The flow:

1. The user has just finished logging a session and saved it.
2. The AI's first question appears, STREAMING IN word by word (please show a
   mid-stream state, not just the finished state).
3. The user types an answer in a text input.
4. The AI asks a second question informed by that answer.
5. After ~3 exchanges the user finishes and the transcript is saved.

It should NOT look like a generic chatbot. This is a private journal, and the
reading experience afterwards matters as much as the writing experience — the
saved transcript is something you re-read weeks later. Consider whether the
questions and answers should even be visually distinguished as "chat bubbles"
at all, or whether something closer to an interview transcript or a printed
Q&A reads better. I'd like you to have an opinion here.

States to cover:
  - Empty / just started, before the first question arrives
  - Mid-stream (question being typed out by the AI)
  - Awaiting the user's answer
  - Two or three exchanges deep, scrolling
  - Finished — the completed transcript as it appears in the session detail
  - "Skip — I'll write it myself" — a plain textarea fallback, always
    reachable, never buried. This path must feel like a legitimate choice,
    not a punishment.
  - Degraded: the AI is unavailable, so it falls back to the plain textarea
    with a calm, non-alarming explanation
  - Quota exhausted: the user has used their free AI interviews for the
    month, with an upgrade prompt that doesn't feel aggressive — the plain
    journal must still be fully usable and unlimited

## Part 2 — The navigation shell

The app currently has a fixed two-pane desktop layout: a slim vertical icon
rail on the far left, then a scrolling list column, then a detail panel that
slides in from the right. On phones the rail is hidden and the detail panel
goes full-screen. Everything is currently an overlay — nothing has its own URL.

I'm rebuilding it so every screen is a real route:
  /              the history feed
  /session/:id   a single session (log + reflection transcript)
  /session/new   the session builder
  /settings      account, preferences, plan
  /login         auth

What I need:
  - How the existing two-pane desktop layout maps onto real routes — the
    feed should ideally stay visible alongside an open session on desktop
  - Mobile navigation: how you move between feed, a session, creating a new
    session, and settings. There is currently no way to reach settings on a
    phone at all, and the only persistent action is a floating "+" button.
  - A settings screen: account details, units preference (kg/lb), plan and
    usage ("7 of 10 AI reflections used this month"), log out, delete account
  - Edit and delete affordances on a saved session, plus the LOCKED state —
    see below. Currently there is no way to fix a typo or remove a mis-logged
    session at all.

### The end-of-day lock (please design this carefully)

A deliberate product rule: **entries lock at midnight.** A journal you can
silently rewrite is a draft, not a record, so after the day ends a session's
reflection can no longer be edited and the session can no longer be deleted.
The exercise log (reps, weight) stays correctable forever — you correct data,
you don't revise testimony.

This needs to read as a considered principle, not a bug or a punishment. It
should feel like the app taking the journal seriously. Please design:

  - A session still inside its window — editable, ideally with some quiet
    signal that it won't be editable forever
  - A locked session — the reflection is permanent, the exercise log is still
    correctable. The asymmetry has to be legible: why can I fix these numbers
    but not that paragraph?
  - How the reason is communicated. A greyed-out button with no explanation
    reads as broken. One short line of copy is probably enough, but the
    wording matters a lot here and I'd welcome a suggestion.
  - The delete confirmation, which should mention that deletion is only
    possible today
  - Search over past reflections — where the entry point lives and what
    results look like

## Constraints

- Phone-first. Assume one-handed use, possibly right after training.
- Dark only. No light mode.
- Keep it restrained — the existing design is quiet and typographic, and the
  AI feature should feel like a natural extension of a journal, not a
  bolted-on chatbot.
- Accessibility matters: real focus states, adequate tap targets (44px),
  and text contrast that holds against the near-black ground.
