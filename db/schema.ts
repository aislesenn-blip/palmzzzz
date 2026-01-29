import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  handle: text('handle').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  whatsappNumber: text('whatsapp_number').notNull(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  isPro: integer('is_pro', { mode: 'boolean' }).default(false).notNull(),
  planStatus: text('plan_status', { enum: ['free', 'pro'] }).default('free').notNull(),
  persona: text('persona', { enum: ['business', 'service'] }),
  template: text('template', { enum: ['Muse', 'Titan', 'Studio'] }).default('Muse'),
  inviteCodeUsed: text('invite_code_used'),
  invitesGenerated: integer('invites_generated').default(0).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  price: real('price').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  views: integer('views').default(0).notNull(),
  clicks: integer('clicks').default(0).notNull(),
  rating: real('rating').default(0).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const reviews = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').references(() => products.id).notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const invites = sqliteTable('invites', {
  code: text('code').primaryKey(),
  isUsed: integer('is_used', { mode: 'boolean' }).default(false).notNull(),
  usageLimit: integer('usage_limit').default(1).notNull(),
  timesUsed: integer('times_used').default(0).notNull(),
  generatedBy: text('generated_by').references(() => users.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const trafficInjections = sqliteTable('traffic_injections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sourceHandle: text('source_handle').notNull(),
  targetHandle: text('target_handle').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});
