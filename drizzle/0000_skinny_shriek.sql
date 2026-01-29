DROP TABLE IF EXISTS `invites`;
--> statement-breakpoint
DROP TABLE IF EXISTS `products`;
--> statement-breakpoint
DROP TABLE IF EXISTS `traffic_injections`;
--> statement-breakpoint
DROP TABLE IF EXISTS `users`;
--> statement-breakpoint
CREATE TABLE `invites` (
	`code` text PRIMARY KEY NOT NULL,
	`used_by` text,
	`status` text DEFAULT 'active'
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`price` real NOT NULL,
	`image` text NOT NULL,
	`description` text,
	`views` integer DEFAULT 0,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `traffic_injections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source_handle` text NOT NULL,
	`target_handle` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`handle` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`whatsapp` text,
	`avatar` text,
	`bio` text,
	`plan` text DEFAULT 'free',
	`category` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_handle_unique` ON `users` (`handle`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
