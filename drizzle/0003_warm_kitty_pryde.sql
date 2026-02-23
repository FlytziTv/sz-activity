ALTER TABLE "hikes" RENAME TO "activity";--> statement-breakpoint
ALTER TABLE "hike_points_of_interest" DROP CONSTRAINT "hike_points_of_interest_hike_id_hikes_id_fk";
--> statement-breakpoint
ALTER TABLE "activity" DROP CONSTRAINT "hikes_created_by_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "list_activities" DROP CONSTRAINT "list_activities_hike_id_hikes_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_hike_id_hikes_id_fk";
--> statement-breakpoint
ALTER TABLE "user_activities" DROP CONSTRAINT "user_activities_hike_id_hikes_id_fk";
--> statement-breakpoint
ALTER TABLE "hike_points_of_interest" ADD CONSTRAINT "hike_points_of_interest_hike_id_activity_id_fk" FOREIGN KEY ("hike_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_activities" ADD CONSTRAINT "list_activities_hike_id_activity_id_fk" FOREIGN KEY ("hike_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_hike_id_activity_id_fk" FOREIGN KEY ("hike_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_hike_id_activity_id_fk" FOREIGN KEY ("hike_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;