# Handoff: Sesh logs — the AI interview & the navigation shell

## Overview

Two new parts of **Sesh logs** (a private training-reflection journal, React + Vite frontend / Express + Postgres backend):

1. **The AI interview** — after saving a session, an AI asks 2–3 follow-up questions grounded in that session and previous ones. The exchange becomes the saved reflection. All states are designed: pre-first-question, mid-stream, awaiting answer, several exchanges deep, finished, the "write it myself" fallback, AI-unavailable, and monthly-quota-exhausted.
2. **The navigation shell** — every screen becomes a real route (today everything is an overlay with no URL), plus a settings screen, edit/delete affordances, the end-of-day lock, and the search entry point.

Design decisions confirmed with the product owner during this work:

| Decision | Answer |
| --- | --- |
| Mobile nav | Keep the top bar + floating "+". Add a **search glass** and an **avatar** to the top bar; the avatar navigates straight to `/settings` (no popover menu). No bottom tab bar. |
| Where the interview lives | Its own route, `/session/:id/reflect`, re-enterable later. |
| Desktop presentation | A **modal over the feed**. |
| Leaving mid-interview | Closable, but asks once: finish later / write it myself / keep going. Partial answers are saved. |
| Revisiting a finished interview | Same day, you can **add more exchanges**. |
| Transcript form | **Printed Q&A** — no bubbles, no avatars, no sender names. |
| Quota | Shape not decided; treat used/limit as **variables** (mock shows 7 of 10). |
| Settings scope | Exactly the brief's list: account, units, plan & usage, log out, delete account. Nothing more. |
| Streak unit | **Days** (as `App.jsx` computes — the older handoff doc's "week streak" is wrong). |
| Lock copy | "Locked at midnight. A record you can rewrite isn't a record." |

## About the Design Files

`Sesh logs — interview + nav shell.dc.html` is a **design reference created in HTML** — a prototype showing intended look and content, **not production code to copy**. It is a single canvas of static artboards (phone 390×844, desktop 1280×820–1000); nothing in it is interactive.

The task is to **recreate these designs in the existing frontend** (`frontend/src`, React + Vite) using that codebase's established patterns: CSS variables from `frontend/src/index.css`, component styles in `App.css`, the existing `FeedCard` / `StreakBar` / `Toast` components. Do not port the inline styles from the prototype — they are literal copies of the token values so the artboards could be written as one streaming file. **Use the CSS variables instead.**

The canvas also carries a recreation of the *current* UI (group `1a`) purely as a reference baseline. It is already built — nothing to implement there.

## Fidelity

**High-fidelity.** Colors, typography, spacing, radii and copy are final. Recreate pixel-accurately. Every value used in the prototype comes from `frontend/src/index.css`; where a raw value appears below with no token, it is a new value introduced by this design and is listed under *New tokens*.

Open the file in a browser to inspect any artboard; group badges `1a` / `1b` / `1c` label the three sections.

---

## Design Tokens

### Existing (from `frontend/src/index.css` `:root` — use the variables, not the hex)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0b0b0e` | page ground |
| `--surface` | `#16161b` | cards, panels, the session pane |
| `--surface-2` | `#1e1e25` | inputs, inactive buttons, hovers |
| `--border` | `#2b2b33` | every hairline |
| `--text` | `#c8c8d2` | body text, answers |
| `--text-strong` | `#f2f2f6` | headings, questions |
| `--muted` | `#83838f` | metadata, labels, placeholders |
| `--accent` | `#d9d9e3` | active dots, focus border, caret |
| `--accent-ink` | `#0b0b0e` | text on a silver fill |
| `--metal-fill` | `linear-gradient(180deg,#f5f5f9 0%,#d6d6e0 46%,#b3b3bf 100%)` | primary buttons, FAB, avatar, flame, active segment |
| `--metal-text` | `linear-gradient(180deg,#fff 0%,#d4d4de 42%,#85858f 100%)` | wordmark only |
| `--ring` | `rgba(217,217,227,0.65)` | focus ring (`box-shadow: 0 0 0 3px`) |
| `--radius` / `--radius-lg` | `12px` / `18px` | inputs & small tiles / cards & sheets |
| spacing | `4 / 8 / 16 / 24 / 40 / 64` | — |
| `--display` | `'Oswald', 'Segoe UI', system-ui` | all display type |
| `--sans` | `system-ui, 'Segoe UI', Roboto, Helvetica, Arial` | body copy |
| page background | two radial glows over `--bg`, `background-attachment: fixed` | as in `body` today |

### New tokens introduced by this design

| Name | Value | Use |
| --- | --- | --- |
| `--rule` | `#3a3a46` | the 2px reflection spine (already in `App.css` as a literal), plus the underline on quiet text links |
| `--dot-off` | `#33333d` | untrained streak dot / unused quota tick (already a literal today) |
| `--danger-text` | `#e5a5a5` | delete/destructive labels (matches the mobile handoff's log-out colour) |
| `--mark` | `rgba(217,217,227,0.16)` | search-hit highlight behind matched words |
| FAB shadow | `inset 0 1px 0 rgba(255,255,255,.7), 0 18px 34px -14px rgba(0,0,0,.9), 0 0 34px -10px rgba(217,217,227,.35)` | the floating "+" only |

### Type roles introduced

| Role | Spec |
| --- | --- |
| **Interview question** (live) | `--display`, 20px/1.35, weight 500, `letter-spacing:.03em`, `text-transform:uppercase`, `--text-strong` |
| **Interview question** (in a scrolled/saved transcript) | same, 17px (live view) / 15px (saved panel) |
| **Answer** | `--sans`, 16px/1.65 (15px in the saved panel), `--text`, `text-wrap:pretty` |
| **Exchange ordinal** | `--display`, 10–11px, weight 600, `letter-spacing:.2em`, uppercase, `--muted` — words, not digits: "ONE", "TWO", "QUESTION ONE" |
| **Section label** | `--display`, 11px, weight 600, `letter-spacing:.18em`–`.2em`, uppercase, `--muted` |
| **Status tag** (`Correctable` / `Final`) | 11px, `letter-spacing:.06em`, uppercase; pill `padding:3px 10px`, `border-radius:999px`, `--bg` fill + `--border` (the `Final` tag is borderless with a 12px padlock glyph) |
| **Quiet text link** | `--sans` 13–14px, `--text`, `border-bottom:1px solid #3a3a46`, `min-height:44px`, `white-space:nowrap` |

---

## Screens / Views

### Group 1b — The AI interview

Route `/session/:id/reflect`. Phone: full screen. Desktop: 720×600 modal centred over a dimmed (`rgba(0,0,0,.62)`) feed, `--surface` card, `--radius-lg`, `box-shadow:0 40px 100px -30px rgba(0,0,0,.95)`.

**Why it isn't a chat.** The saved reflection is re-read weeks later, so it is typeset as a printed Q&A: question in the condensed display face, answer in body text directly beneath it, a `1px --border` hairline with 24–26px of air between exchanges. No bubbles, no avatars, no "AI"/"You" labels, no timestamps per message. The reading order is the writing order.

#### Shared chrome — phone

- **Top bar**: `padding:16px`, `border-bottom:1px solid --border`, `display:flex; align-items:center; gap:12px`.
  - Back: 44×44, `--radius`, `--surface` + `--border`, a `←` glyph at 20px.
  - Centre column: "Reflection" (`--display` 17px/500, `letter-spacing:.02em`, `--text-strong`) over a context line (11px, `letter-spacing:.08em`, uppercase, `--muted`) reading `Push · saved just now` (or `· in your own words` on the fallback screens).
  - Right: progress in `--display` 11px/600, `letter-spacing:.14em`, `--muted` — `— / 03`, `01 / 03`, `03 / 03`.
- **Body**: `padding:28px 24px`, column.
- **Composer** (pinned, `flex:0 0 auto`): `border-top:1px solid --border`, `background:--bg`, `padding:14px 20px 22px`, column `gap:10px`.
  - Textarea: `--surface` + `--border`, `--radius`, `padding:14px`, `min-height:92px` (72px once the transcript is long), 16px text (never below 16px — iOS zoom), placeholder `Type your answer…` in `--muted`.
  - Action row: `space-between`. Left = the quiet link **"Skip — I'll write it myself"** (becomes **"Finish here"** once at least one answer exists). Right = **Answer** button: `--display` 14px/600, `letter-spacing:.04em`, uppercase, `min-height:44px`, `padding:0 22px`, `--radius`. Disabled = `--surface-2` + `--border` + `--muted`; enabled = `--metal-fill` + `--accent-ink` + `inset 0 1px 0 rgba(255,255,255,.75), 0 10px 24px -14px rgba(217,217,227,.5)`.

The skip link is in the same row as the primary action in **every** state — it is never behind a menu, and never styled as a warning.

#### 1b-1 — Just started

Before the first question. Body shows a "TONIGHT'S LOG" label + the log line (`Push ups — 20 reps, 20 reps`, 14px `--text`), a `1px --border` rule, then a status line: a 7px `--accent` dot at `opacity:.7` + `Reading your last few sessions…` (13px, `--muted`, `letter-spacing:.04em`). Composer textarea is inert at `opacity:.55` reading `The first question is on its way…`. Progress `— / 03`.

#### 1b-2 — Mid-stream (must be built)

"QUESTION ONE" label, then the question rendering word by word: `You hit twenty push-ups twice — same as Tues` followed by a **block caret** — `display:inline-block; width:9px; height:18px; background:--accent; vertical-align:-3px; animation: caret 1s step-end infinite` (`@keyframes caret { 0%,49%{opacity:1} 50%,100%{opacity:0} }`). Composer disabled; Answer button inactive. Stream at a readable cadence (~40–60ms/word); respect `prefers-reduced-motion` by rendering the finished question immediately (`index.css` already kills animations under that query).

#### 1b-3 — Awaiting the answer

Full question. Composer is focused: `border-color:--accent`, `box-shadow:0 0 0 3px --ring`, typed text in `--text-strong` with a 2px caret. Answer button enabled (metal). One-handed: everything tappable sits in the bottom third.

#### 1b-4 — Two/three exchanges deep, scrolling

Body becomes the scroll container, `padding:0 24px`, with a top fade so content passes under the bar: `mask-image: linear-gradient(to bottom, transparent 0, #000 34px)`. Answered pairs are laid out as label → question (17px) → answer (16px/1.65), separated by `height:1px; background:--border; margin:24px 0`. The newest question streams at the bottom. Composer textarea shrinks to `min-height:72px`; left link reads **"Finish here"**. Progress `03 / 03`.

#### 1b-5 — Finished: the transcript inside the session

This is the read view (`/session/:id`), not a separate screen. The Reflection block header gains a right-hand meta line: `Interviewed · 2 exchanges` (11px, `letter-spacing:.06em`, uppercase, `--muted`) — **generate the count from the data**. The transcript panel is the existing `.reflect-read` treatment (`--bg` fill, `--border`, `--radius`) at `padding:20px 18px`, containing per exchange: ordinal word, question (15px display uppercase), answer (15px/1.65), with `1px --border` rules at `margin:18px 0` between pairs. Below the panel, a quiet link **"Add another exchange"** — shown only while the session is unlocked (same-day).

The session's top bar here has a 44×44 overflow button (three 1.4px dots) on the right.

#### 1b-6 — Skip: write it yourself

A legitimate destination, not a downgrade: it gets its own heading. Body: `How did it go?` (`--display` 20px uppercase, `--text-strong`), sub `No prompts, no questions. Write as much or as little as you like.` (14px `--muted`), then a flex-1 textarea (`--surface`, `--border`, `--radius`, placeholder `Tonight…`). Footer is a **column**: the quiet link `Let the AI interview me instead` above a full-width metal **Save** (`min-height:48px`).

#### 1b-7 — Degraded: AI unavailable

Same page as 1b-6 with a calm notice above the textarea — `--surface` card, `--border`, plus `border-left:2px solid #3a3a46`, `--radius`, `padding:16px`:

> **NO QUESTIONS TONIGHT**
> The interviewer can't be reached right now. Write it yourself — the journal works exactly the same, and tomorrow's session will have questions again.

Footer: `Try again` link (left, `white-space:nowrap`) + metal **Save** (right). No red, no alert icon, no toast — this is not an error the user caused.

#### 1b-8 — Interviews used up this month

Same page, notice card carries the quota:

> **7 OF 10 INTERVIEWS USED**
> That's this month's interviews done. Writing your own reflection is unlimited and always will be — the journal isn't the paid part.

Then a 10-segment meter (`display:flex; gap:4px`, each `flex:1; height:3px; border-radius:2px`, filled `--accent`, empty `--dot-off`) — **segment count = the limit**, so it reads as "how many I get", not a percentage. Below: `More interviews` link + `Resets Oct 1` (12px `--muted`), both `white-space:nowrap` in a `flex-wrap` row. Only action in the footer is **Save**. The upgrade link leads out to the plan flow, which is designed separately.

#### 1b-9 — Desktop: modal over the feed

720×600 card. Header (`padding:24px 32px`, `border-bottom`): left column `Reflection · Push` (display 12px, `letter-spacing:.18em`, uppercase, `--muted`) over the log line (13px `--muted`); right: progress + a 32×32 close (`--bg` + `--border`, `--radius:9px`). Body `padding:28px 32px 0`, transcript measure capped at `max-width:560px`. Composer as on phone but `padding:18px 32px 22px`.

#### 1b-10 — Leaving mid-interview (asked once per interview)

Phone: scrim `rgba(0,0,0,.62)` + bottom sheet (`--surface`, `border-radius:18px 18px 0 0`, `border-top:1px solid --border`, `padding:28px 24px 26px`).

> **Leave the interview?**
> What you've answered so far is saved. You can pick the questions back up from the session today, or finish the reflection in your own words.

Actions, stacked full-width, `min-height:48px`: **Finish later** (metal, primary) · **Write it myself** (`--surface-2` + `--border`) · **Keep going** (quiet, 13px `--muted`, 44px). Desktop: the same content as a centred dialog. Ask once per interview, then remember the choice for that session.

---

### Group 1c — Navigation shell, the lock, settings, search

#### Route map

| Route | Chrome |
| --- | --- |
| `/` | feed column; rail History active |
| `/session/:id` | feed **stays visible** + session pane (a pane, not an overlay) |
| `/session/:id/reflect` | modal over the feed; phone full screen |
| `/session/new` | builder modal / phone bottom sheet (existing) |
| `/search?q=` | rail Search; phone top-bar glass |
| `/settings` | rail Settings; phone **the avatar is the link** |

The desktop rail keeps its current anatomy (62px, `--surface`, `border-right`, 34px metal logo tile, 40px `--radius:11px` buttons, `is-on` = `--bg` fill + `--border` + `--text-strong`) and gains **Search** (magnifier, below History) and **Settings** (three sliders, above Log out). Log out stays at the bottom.

#### Desktop `/session/42` — the feed stays put

The overlay panel becomes a real pane: rail 62px · feed column `flex:1` with `border-right:1px solid --border` · session pane **560px** `flex:0 0 auto`, `--surface`, **no scrim and no shadow**. The open session's feed card is marked with `border-left:2px solid --accent`. Feed cards in this two-pane state tighten to `padding:20px 22px`, title 21px, `margin-bottom:14px` (the roomy 26/28px card is for the single-column `/` view).

Pane header (`padding:22px 30px 16px`): `Session · today` label at left; at right **Edit** and **Delete** (34px tall, `padding:0 14px`, `--radius:10px`, `--bg` + `--border`; Delete's label in `--danger-text`) then the 34px close.

#### The end-of-day lock

The rule: the **reflection** locks at midnight and the session can no longer be deleted; the **exercise log stays correctable forever**. The design makes the asymmetry visible rather than explaining it in a dialog:

- The **Exercises** section header carries a `Correctable` tag, and each exercise row ends with a `Fix` link. Under the list, one line: `Numbers are data — correct them whenever you like.` (12.5px `--muted`).
- The **Reflection** section header carries, before midnight, `Editable until midnight` (11px, uppercase, `--muted`) — so the lock is never a surprise — and after midnight a `Final` tag with a 12px padlock glyph, in `--text`.
- Under a locked transcript, one line in 13px `--muted`: **"Locked at midnight on Sep 4. A record you can rewrite isn't a record."**
- A locked session shows **no disabled edit/delete buttons at all**. The affordances are absent, and the line above explains why. (A greyed-out button reads as broken.)

**Phone — today's session, actions sheet open.** The overflow button (44×44) opens a bottom sheet with a 38×4 grab handle and 56px rows: `Edit the reflection` · `Add another exchange` · `Correct the numbers` · rule · `Delete session` (in `--danger-text`), with a closing line `Editing and deleting are open until midnight tonight.` (12.5px `--muted`). On a locked session the sheet keeps only `Correct the numbers`.

**Delete confirmation** (bottom sheet on phone, dialog on desktop):

> **Delete "Pull"?**
> The log and the reflection go with it. Today is the only day you can do this — after midnight the session stays on the record, and so does everything you wrote in it.

Actions stacked, `min-height:52px`: **Delete it** (`--bg` fill, `1px solid #3a3a46`, label `--danger-text`) then **Keep it** (metal, primary — the safe choice carries the weight).

#### Phone `/` — the top bar

`padding:16px 16px 12px`: title `History` (`--display` 23px/600) with a muted count, then two 44×44 circles — the **search glass** (`--surface` + `--border`, `--text`) and the **avatar** (`--metal-fill`, `--accent-ink`, `--display` 14px/600 initials) which navigates to `/settings`. The account popover is removed; log out now lives in settings.

The "+" becomes a **floating action button**: 60×60, `border-radius:20px`, `--metal-fill`, pinned `right:20px; bottom:28px`, with the FAB shadow listed under *New tokens*. It no longer sits in the header.

A session logged but never reflected on shows, in place of the reflection spine, a 44px-tall row: `No reflection · ` + the link `add one` — **only while the session is unlocked**. Locked-and-empty sessions show nothing.

#### `/settings`

Desktop: single centred column, `max-width:620px`, `padding:34px 26px`, section gap 30px. Phone: full width, `padding:8px 20px 34px`, section gap 28px, back arrow + `Settings` title in the bar.

Structure — display-face section labels (11px, `letter-spacing:.2em`, uppercase, `--muted`), rows separated by `border-top:1px solid --border`, each row `min-height:56px` and `space-between`:

1. **Account** — `Username` → `alexr`; `Logging since` → `August 2026 · 16 sessions`.
2. **Preferences** — `Units` with sub-line `Applies to every weight you log`, and a **kg / lb** segmented control: `--bg` (phone: `--surface`) track, `--border`, `border-radius:999px`, `padding:3px`; segments `min-height:44px`, `padding:0 20–22px`, display 13px/600 uppercase; active = `--metal-fill` + `--accent-ink`, inactive = `--muted`.
3. **Plan** — a `--surface` card (`--radius-lg`, `padding:18–20px`): `Free` (display 19px) + `Resets Oct 1`; then `7 of 10 AI reflections used this month`, the same 10-segment meter as 1b-8, and `Writing your own reflections is unlimited.`; then a `See plans` link. **Both numbers come from the API** — the free-tier shape isn't settled. The plan-change flow is out of scope here.
4. Above a `border-top`: **Log out** (full-width row, `min-height:52px`, `--radius`, `--surface-2`/`--surface` + `--border`, `--text-strong`) and **Delete account** (`--danger-text`; desktop shows the explanation `Removes every session and reflection. Can't be undone.` plus a `Delete` button, phone is a single row that opens the same confirmation).

#### `/search?q=shoulder`

Entry: rail magnifier on desktop, top-bar glass on phone. Both land on a full route with the field focused.

- **Field**: `--surface`, `border:1px solid --accent`, `box-shadow:0 0 0 3px rgba(217,217,227,.18)`, `--radius`, 16px text, magnifier at left in `--muted`. Desktop: centred, `max-width:760px`, with the count (`3 reflections`) right-aligned inside the field row. Phone: fills the bar beside the back arrow, count moves to a label above the list.
- **Result row** (shape only — final formatting ships with the search section): desktop is a two-column row, `padding:18px 2px`, `border-bottom:1px solid --border` — a 120px date column (12px uppercase `--muted`) beside workout name (`--display` 17px) + the matched sentence in quotes (14.5px/1.6 `--text`), matched word wrapped in `<mark>` with `--mark` background and `--text-strong` ink. Phone stacks name and date on one line above the snippet.
- Search runs over reflection text (both interview answers and plain-written ones).

---

## Interactions & Behavior

- **Save session → interview**: on successful POST, navigate to `/session/:id/reflect`. First question requested immediately; show 1b-1 while it's pending.
- **Streaming**: render token/word-by-word with the block caret; caret removed when the question completes and the composer enables. Under `prefers-reduced-motion`, skip the stream.
- **Submitting an answer**: append the pair to the transcript, scroll the new question into view *within the scroll container* (do not use `scrollIntoView` on the page), request the next question. After the third answer the interview completes and routes to `/session/:id`.
- **Skip**: swaps to the plain-textarea page (1b-6) without losing typed answers; reversible via `Let the AI interview me instead`.
- **Close mid-interview**: show 1b-10 once per interview. *Finish later* persists the partial transcript and routes to the session, where `Add another exchange` resumes it (same day only).
- **Failure**: any question request error → 1b-7, keeping whatever the user already wrote.
- **Quota**: a 402/403-style "quota exhausted" response → 1b-8. The plain journal path must remain fully usable and unlimited in every case.
- **Lock**: compute from the session's local calendar day. At the moment of rollover, a session open on screen should quietly re-render into its locked form rather than erroring on save.
- **Focus**: every control keeps the existing `:focus-visible` silver ring; all tap targets ≥44px (the sheet rows are 56px).
- **Responsive**: the desktop two-pane becomes a single full-screen pane below 768px, matching the current `@media (max-width: 768px)` block.

## State Management

Mostly additive to `App.jsx`, which currently holds all state locally. Introduce a router (`react-router-dom`) so each route owns its view.

- `route` params: `sessionId`, `q`.
- `interview`: `{ sessionId, exchanges: [{ question, answer }], pending: 'idle'|'streaming'|'awaiting'|'saving', streamedText, mode: 'interview'|'manual', error: null|'unavailable'|'quota', leavePromptShown }`.
- `session.lockedAt` / derived `isLocked` (reflection editable + deletable only while `isLocked === false`).
- `user.units` (`'kg'|'lb'`), `plan: { tier, aiUsed, aiLimit, resetsOn }`.
- `searchQuery`, `searchResults[]`.
- Existing: `token`, `sessions[]`, `selectedSessionId`/`selectedTree`, `draftExercises`, builder fields, `authError`, `streak`/`last7`.

New API surface implied (backend work, not designed here): stream a question for a session, append an exchange, patch a reflection (rejected once locked), delete a session (rejected once locked), patch exercise sets (always allowed), search reflections, read/patch user preferences, read plan usage.

## Assets

No images. All icons are inline SVG at 1.3–1.8px stroke on `currentColor`, matching the set already in `App.jsx`:

- Reused verbatim from the codebase: plus, close ×, back chevron/arrow, flame, feed/history, log-out door-arrow, account silhouette.
- New in this design: magnifier (circle r5.2 + 3.4px handle), sliders/settings (three 1.5px lines with two 2px knobs), overflow (three 1.4px dots), padlock (6.5px body + 2.4px shackle), grab handle (38×4 rounded bar).

Fonts: Oswald is already imported in `index.css`. Body copy stays on the system stack.

## Files

- `Sesh logs — interview + nav shell.dc.html` — the design canvas. Group `1a` = the current UI recreated from source (reference only), `1b` = the interview, `1c` = the shell/lock/settings/search. `support.js` beside it is only the runtime that renders the canvas; it is not part of the design.
- Source of truth for tokens in the app: `frontend/src/index.css`.
- Existing component styles to extend: `frontend/src/App.css`.
- The earlier mobile-flow bundle (`design_handoff_sesh_logs/`) remains valid for the feed, builder, picker and session-detail screens. Where it disagrees with this document — the week-vs-day streak, "sessions are immutable", "no edit/delete affordances anywhere", the avatar popover menu — **this document supersedes it**.
