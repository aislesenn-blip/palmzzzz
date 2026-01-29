import { relations } from "drizzle-orm/relations";
import { users, invites, products, ratings, upgradeRequests } from "./schema";

export const invitesRelations = relations(invites, ({one}) => ({
	user: one(users, {
		fields: [invites.usedBy],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	invites: many(invites),
	products: many(products),
	upgradeRequests: many(upgradeRequests),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	user: one(users, {
		fields: [products.userId],
		references: [users.id]
	}),
	ratings: many(ratings),
}));

export const ratingsRelations = relations(ratings, ({one}) => ({
	product: one(products, {
		fields: [ratings.productId],
		references: [products.id]
	}),
}));

export const upgradeRequestsRelations = relations(upgradeRequests, ({one}) => ({
	user: one(users, {
		fields: [upgradeRequests.userId],
		references: [users.id]
	}),
}));