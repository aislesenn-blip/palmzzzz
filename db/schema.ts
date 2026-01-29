import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // We will use UUIDs
  handle: text("handle").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  whatsapp: text("whatsapp"), // Mandatory for commerce
  avatar: text("avatar"),
  bio: text("bio"),
  plan: text("plan").default("free"), // 'free' or 'pro'
  category: text("category"), // 'business' or 'service'
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  price: real("price").notNull(),
  image: text("image").notNull(), // R2 URL
  description: text("description"),
  views: integer("views").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const invites = sqliteTable("invites", {
  code: text("code").primaryKey(),
  usedBy: text("used_by"), // null if unused
  status: text("status").default("active"),
});

export const trafficInjections = sqliteTable("traffic_injections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sourceHandle: text("source_handle").notNull(),
  targetHandle: text("target_handle").notNull(),
});
