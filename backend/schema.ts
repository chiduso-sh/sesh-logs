import { pgTable, pgEnum, text, timestamp, integer, numeric, index } from 'drizzle-orm/pg-core'

// A Postgres enum type: the database itself only allows these values.
// Must be exported, or drizzle-kit won't see it and won't create the type.
export const unitsEnum = pgEnum('units', ['kg', 'lb'])

// The users table, written as code instead of a CREATE TABLE string.
// In each column: the key on the left is its name in TypeScript,
// the string inside text('...') is its name in Postgres.
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  units: unitsEnum('units').notNull().default('ben')
})

// One row of the users table, as TypeScript sees it. Derived, not hand-written.
export type User = typeof users.$inferSelect

// A session belongs to ONE user: user_id is a foreign key pointing up at users.id.
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  workout: text('workout').notNull(),
  reflection: text('reflection'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
}, (t) => [
  // Every feed load asks "which sessions belong to this user?"
  index('sessions_user_id_idx').on(t.userId),
])

// An exercise belongs to ONE session. position = its slot in the workout.
export const exercises = pgTable('exercises', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull().references(() => sessions.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  position: integer('position').notNull(),
}, (t) => [
  index('exercises_session_id_idx').on(t.sessionId),
])

// A set belongs to ONE exercise. weight is nullable: a bodyweight set has none.
export const sets = pgTable('sets', {
  id: text('id').primaryKey(),
  exerciseId: text('exercise_id').notNull().references(() => exercises.id, { onDelete: 'cascade' }),
  reps: integer('reps').notNull(),
  weight: numeric('weight'),
  position: integer('position').notNull(),
}, (t) => [
    index('sets_exercise_id_idx').on(t.exerciseId),
])

// One question + its answer from the AI interview. A session has MANY of these.
export const reflectionExchanges = pgTable('reflection_exchanges', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull().references(() => sessions.id, {onDelete: 'cascade'}),
  position: integer('position').notNull(),
  question: text('question').notNull(),
  answer: text('answer')
}, (t) => [
  index('reflection_exchanges_session_id_idx').on(t.sessionId),
])
