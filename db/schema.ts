import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // User ID as text
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  imageUrl: text('image_url').notNull(),
  userId: text('user_id').notNull(), // Must match users.id type
});
