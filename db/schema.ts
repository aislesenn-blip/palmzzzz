import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // UUID
  handle: text('handle').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // Hashed
  whatsappNumber: text('whatsapp_number').notNull(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  isPro: integer('is_pro', { mode: 'boolean' }).default(false).notNull(),
  planStatus: text('plan_status', { enum: ['free', 'pro'] }).default('free').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  price: real('price').notNull(), // Number
  description: text('description'), // Long text
  imageUrl: text('image_url').notNull(), // R2 URL
  views: integer('views').default(0).notNull(),
  clicks: integer('clicks').default(0).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const reviews = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').references(() => products.id).notNull(),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const invites = sqliteTable('invites', {
  code: text('code').primaryKey(),
  isUsed: integer('is_used', { mode: 'boolean' }).default(false).notNull(),
});
