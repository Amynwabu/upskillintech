CREATE TABLE `campaign_recipients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campaignId` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`messageId` varchar(255),
	`sentAt` timestamp,
	`error` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `campaign_recipients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`subject` varchar(500) NOT NULL,
	`templateType` varchar(50) NOT NULL,
	`htmlContent` text NOT NULL,
	`textContent` text,
	`recipientFilter` varchar(50) NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'draft',
	`scheduledAt` timestamp,
	`startedAt` timestamp,
	`completedAt` timestamp,
	`totalRecipients` int NOT NULL DEFAULT 0,
	`sentCount` int NOT NULL DEFAULT 0,
	`failedCount` int NOT NULL DEFAULT 0,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_campaigns_id` PRIMARY KEY(`id`)
);
