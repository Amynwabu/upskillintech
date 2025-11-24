CREATE TABLE `course_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`userId` int NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`isVerifiedPurchase` boolean NOT NULL DEFAULT false,
	`helpfulCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `course_reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `instructors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`bio` text,
	`expertise` text,
	`credentials` text,
	`avatar` text,
	`rating` int DEFAULT 0,
	`totalStudents` int NOT NULL DEFAULT 0,
	`totalCourses` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `instructors_id` PRIMARY KEY(`id`)
);
