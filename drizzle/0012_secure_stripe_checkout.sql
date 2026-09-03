ALTER TABLE `courses` ADD `stripePriceId` varchar(255);--> statement-breakpoint
ALTER TABLE `courses` ADD `currency` varchar(3) DEFAULT 'gbp' NOT NULL;--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(32) NOT NULL,
	`checkoutRequestId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`stripeCustomerId` varchar(255),
	`stripeCheckoutSessionId` varchar(255),
	`stripePaymentIntentId` varchar(255),
	`paymentMethod` varchar(64),
	`subtotal` int NOT NULL,
	`discount` int NOT NULL DEFAULT 0,
	`total` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'gbp',
	`paymentStatus` enum('pending','processing','paid','failed','cancelled','refunded','partially_refunded') NOT NULL DEFAULT 'pending',
	`customerName` varchar(255),
	`customerEmail` varchar(320) NOT NULL,
	`paidAmount` int,
	`refundedAmount` int NOT NULL DEFAULT 0,
	`paidAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_checkoutRequestId_unique` UNIQUE(`checkoutRequestId`),
	CONSTRAINT `orders_stripeCheckoutSessionId_unique` UNIQUE(`stripeCheckoutSessionId`)
);--> statement-breakpoint
CREATE TABLE `stripe_webhook_events` (
	`id` varchar(255) NOT NULL,
	`type` varchar(100) NOT NULL,
	`processedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `stripe_webhook_events_id` PRIMARY KEY(`id`)
);--> statement-breakpoint
CREATE INDEX `orders_user_idx` ON `orders` (`userId`);--> statement-breakpoint
CREATE INDEX `orders_course_idx` ON `orders` (`courseId`);--> statement-breakpoint
CREATE INDEX `orders_payment_intent_idx` ON `orders` (`stripePaymentIntentId`);--> statement-breakpoint
CREATE INDEX `orders_status_idx` ON `orders` (`paymentStatus`);--> statement-breakpoint
CREATE UNIQUE INDEX `enrollments_user_course_unique` ON `enrollments` (`userId`,`courseId`);--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE restrict ON UPDATE cascade;
