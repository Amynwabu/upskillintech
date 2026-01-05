CREATE TABLE `webinar_registrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`company` varchar(255),
	`role` varchar(255),
	`webinarTitle` varchar(500) NOT NULL,
	`webinarDate` varchar(100) NOT NULL,
	`confirmationSent` boolean NOT NULL DEFAULT false,
	`attended` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `webinar_registrations_id` PRIMARY KEY(`id`)
);
