CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"onboarding_completed" boolean DEFAULT false,
	"level" text,
	"preferred_route_type" text,
	"country" text,
	"region" text,
	"objectives" text[],
	"frequency" text,
	"weight" integer,
	"height" integer,
	"shoe_size" integer,
	"annual_distance_goal" integer,
	"annual_activities_goal" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;