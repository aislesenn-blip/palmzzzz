import { sqliteTable, AnySQLiteColumn, uniqueIndex, foreignKey, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const invites = sqliteTable("invites", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	code: text().notNull(),
	isUsed: integer("is_used").default(false).notNull(),
	usedBy: integer("used_by").references(() => users.id),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
},
(table) => [
	uniqueIndex("invites_code_unique").on(table.code),
]);

export const products = sqliteTable("products", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	name: text().notNull(),
	description: text(),
	price: text().notNull(),
	imageUrl: text("image_url").notNull(),
	views: integer().default(0).notNull(),
	clicks: integer().default(0).notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});

export const ratings = sqliteTable("ratings", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	productId: integer("product_id").notNull().references(() => products.id),
	rating: integer().notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});

export const trafficInjections = sqliteTable("traffic_injections", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	sourceHandle: text("source_handle").notNull(),
	targetHandle: text("target_handle").notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});

export const upgradeRequests = sqliteTable("upgrade_requests", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").notNull().references(() => users.id),
	status: text().default("pending").notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	email: text().notNull(),
	passwordHash: text("password_hash").notNull(),
	handle: text().notNull(),
	avatarUrl: text("avatar_url"),
	whatsappNumber: text("whatsapp_number").notNull(),
	plan: text().default("free").notNull(),
	template: text().default("Muse").notNull(),
	isAdmin: integer("is_admin").default(false).notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
},
(table) => [
	uniqueIndex("users_handle_unique").on(table.handle),
	uniqueIndex("users_email_unique").on(table.email),
]);
