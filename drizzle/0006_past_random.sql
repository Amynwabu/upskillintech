ALTER TABLE `newsletter_subscribers` ADD `prefAiNews` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` ADD `prefCourseUpdates` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` ADD `prefEvents` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` ADD `prefTips` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` ADD `preferencesToken` varchar(64);