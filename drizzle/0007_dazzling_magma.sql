CREATE TABLE `email_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`messageId` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`eventType` enum('processed','dropped','delivered','deferred','bounce','open','click','spamreport','unsubscribe','group_unsubscribe','group_resubscribe') NOT NULL,
	`templateType` varchar(50),
	`url` text,
	`userAgent` text,
	`ip` varchar(45),
	`reason` text,
	`timestamp` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_events_id` PRIMARY KEY(`id`)
);
