CREATE TYPE "public"."units" AS ENUM('kg', 'lb');--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"name" text NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reflection_exchanges" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"position" integer NOT NULL,
	"question" text NOT NULL,
	"answer" text
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"workout" text NOT NULL,
	"reflection" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sets" (
	"id" text PRIMARY KEY NOT NULL,
	"exercise_id" text NOT NULL,
	"reps" integer NOT NULL,
	"weight" numeric,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"units" "units" DEFAULT 'kg' NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reflection_exchanges" ADD CONSTRAINT "reflection_exchanges_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sets" ADD CONSTRAINT "sets_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "exercises_session_id_idx" ON "exercises" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "reflection_exchanges_session_id_idx" ON "reflection_exchanges" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sets_exercise_id_idx" ON "sets" USING btree ("exercise_id");