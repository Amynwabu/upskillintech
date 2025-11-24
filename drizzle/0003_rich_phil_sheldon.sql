CREATE TABLE `certificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`certificateId` varchar(100) NOT NULL,
	`studentName` varchar(255) NOT NULL,
	`courseName` varchar(255) NOT NULL,
	`instructorName` varchar(255),
	`completionDate` timestamp NOT NULL,
	`pdfUrl` text,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `certificates_certificateId_unique` UNIQUE(`certificateId`)
);
