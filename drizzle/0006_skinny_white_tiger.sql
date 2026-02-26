ALTER TABLE "user_activities" ADD COLUMN "activity_type" "activity_type" DEFAULT 'randonnee' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_activities" ADD COLUMN "elevation_loss" integer;--> statement-breakpoint
ALTER TABLE "user_activities" ADD COLUMN "start_time" text;--> statement-breakpoint
ALTER TABLE "user_activities" ADD COLUMN "end_time" text;--> statement-breakpoint
ALTER TABLE "user_activities" ADD COLUMN "calories_burned" integer;--> statement-breakpoint
ALTER TABLE "user_activities" ADD COLUMN "avg_heart_rate" integer;--> statement-breakpoint
ALTER TABLE "user_activities" ADD COLUMN "effort" text;--> statement-breakpoint
ALTER TABLE "user_activities" ADD COLUMN "location" text;