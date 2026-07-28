CREATE TABLE `webinar_email_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`emailQueueId` int,
	`registrationId` int NOT NULL,
	`webinarId` int NOT NULL,
	`eventType` enum('queued','processing','sent','delivered','opened','clicked','bounced','complained','failed','unsubscribed') NOT NULL,
	`providerEventId` varchar(255),
	`eventData` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `webinar_email_events_id` PRIMARY KEY(`id`),
	CONSTRAINT `webinar_event_provider_unique` UNIQUE(`providerEventId`)
);
--> statement-breakpoint
CREATE TABLE `webinar_email_queue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`webinarId` int NOT NULL,
	`registrationId` int NOT NULL,
	`emailType` enum('confirmation','reminder_2_days','reminder_1_hour','webinar_live','follow_up_attended','follow_up_no_show') NOT NULL,
	`scheduledFor` timestamp NOT NULL,
	`status` enum('pending','processing','sent','delivered','failed','cancelled') NOT NULL DEFAULT 'pending',
	`attemptCount` int NOT NULL DEFAULT 0,
	`provider` varchar(50) DEFAULT 'sendgrid',
	`providerMessageId` varchar(255),
	`lastError` text,
	`processingStartedAt` timestamp,
	`sentAt` timestamp,
	`deliveredAt` timestamp,
	`failedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `webinar_email_queue_id` PRIMARY KEY(`id`),
	CONSTRAINT `webinar_email_registration_type_unique` UNIQUE(`registrationId`,`emailType`)
);
--> statement-breakpoint
CREATE TABLE `webinars` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`subtitle` varchar(500),
	`description` text,
	`format` varchar(100) NOT NULL DEFAULT 'Free live online webinar',
	`speakerName` varchar(255),
	`speakerTitle` varchar(255),
	`speakerBiography` text,
	`speakerImageUrl` text,
	`eventStartAt` timestamp,
	`eventEndAt` timestamp,
	`registrationOpensAt` timestamp,
	`registrationClosesAt` timestamp,
	`timezone` varchar(100) NOT NULL DEFAULT 'Europe/London',
	`meetingProvider` varchar(100),
	`meetingUrl` text,
	`meetingId` varchar(255),
	`meetingPassword` varchar(255),
	`maximumAttendees` int,
	`status` enum('draft','published','registration_closed','live','completed','cancelled') NOT NULL DEFAULT 'draft',
	`recordingAvailable` boolean NOT NULL DEFAULT false,
	`recordingUrl` text,
	`masterclassUrl` text,
	`confirmationEmailEnabled` boolean NOT NULL DEFAULT true,
	`twoDayReminderEnabled` boolean NOT NULL DEFAULT true,
	`oneHourReminderEnabled` boolean NOT NULL DEFAULT true,
	`followUpEnabled` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `webinars_id` PRIMARY KEY(`id`),
	CONSTRAINT `webinars_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `webinar_registrations` MODIFY COLUMN `name` varchar(255);--> statement-breakpoint
ALTER TABLE `webinar_registrations` MODIFY COLUMN `webinarTitle` varchar(500);--> statement-breakpoint
ALTER TABLE `webinar_registrations` MODIFY COLUMN `webinarDate` varchar(100);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `webinarId` int;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `firstName` varchar(100);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `lastName` varchar(100);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `emailNormalised` varchar(320);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `organisation` varchar(255);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `automationGoal` text;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `eventConsent` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `eventConsentAt` timestamp;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `marketingConsent` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `marketingConsentAt` timestamp;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `registrationStatus` enum('registered','waitlisted','cancelled','attended','no_show') DEFAULT 'registered' NOT NULL;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `utmSource` varchar(255);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `utmMedium` varchar(255);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `utmCampaign` varchar(255);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `utmContent` varchar(255);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `utmTerm` varchar(255);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `referrerUrl` text;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `landingPage` text;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `userAgent` varchar(500);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `ipHash` varchar(64);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `unsubscribeToken` varchar(128);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `confirmationToken` varchar(128);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD `updatedAt` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD CONSTRAINT `webinar_registration_email_unique` UNIQUE(`webinarId`,`emailNormalised`);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD CONSTRAINT `webinar_registration_unsubscribe_unique` UNIQUE(`unsubscribeToken`);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD CONSTRAINT `webinar_registration_confirmation_unique` UNIQUE(`confirmationToken`);--> statement-breakpoint
ALTER TABLE `webinar_email_events` ADD CONSTRAINT `webinar_email_events_emailQueueId_webinar_email_queue_id_fk` FOREIGN KEY (`emailQueueId`) REFERENCES `webinar_email_queue`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `webinar_email_events` ADD CONSTRAINT `webinar_email_events_registrationId_webinar_registrations_id_fk` FOREIGN KEY (`registrationId`) REFERENCES `webinar_registrations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `webinar_email_events` ADD CONSTRAINT `webinar_email_events_webinarId_webinars_id_fk` FOREIGN KEY (`webinarId`) REFERENCES `webinars`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `webinar_email_queue` ADD CONSTRAINT `webinar_email_queue_webinarId_webinars_id_fk` FOREIGN KEY (`webinarId`) REFERENCES `webinars`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `webinar_email_queue` ADD CONSTRAINT `webinar_email_queue_registrationId_webinar_registrations_id_fk` FOREIGN KEY (`registrationId`) REFERENCES `webinar_registrations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `webinar_event_queue_idx` ON `webinar_email_events` (`emailQueueId`);--> statement-breakpoint
CREATE INDEX `webinar_event_registration_idx` ON `webinar_email_events` (`registrationId`);--> statement-breakpoint
CREATE INDEX `webinar_event_webinar_idx` ON `webinar_email_events` (`webinarId`);--> statement-breakpoint
CREATE INDEX `webinar_email_due_idx` ON `webinar_email_queue` (`status`,`scheduledFor`);--> statement-breakpoint
CREATE INDEX `webinar_email_webinar_idx` ON `webinar_email_queue` (`webinarId`);--> statement-breakpoint
CREATE INDEX `webinar_email_registration_idx` ON `webinar_email_queue` (`registrationId`);--> statement-breakpoint
CREATE INDEX `webinar_email_type_idx` ON `webinar_email_queue` (`emailType`);--> statement-breakpoint
CREATE INDEX `webinars_status_start_idx` ON `webinars` (`status`,`eventStartAt`);--> statement-breakpoint
ALTER TABLE `webinar_registrations` ADD CONSTRAINT `webinar_registrations_webinarId_webinars_id_fk` FOREIGN KEY (`webinarId`) REFERENCES `webinars`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `webinar_registration_status_idx` ON `webinar_registrations` (`webinarId`,`registrationStatus`);--> statement-breakpoint
CREATE INDEX `webinar_registration_created_idx` ON `webinar_registrations` (`createdAt`);