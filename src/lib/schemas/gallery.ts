import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { users } from './user';
import { relations } from 'drizzle-orm';
import { images } from './image';

export const galleries = sqliteTable('galleries', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	themeColor: text('theme_color').default('#000000'),
	price: real('price').default(0).notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id)
});

export const galleriesRelations = relations(galleries, ({ one, many }) => ({
	user: one(users, {
		fields: [galleries.userId],
		references: [users.id]
	}),
	images: many(images)
}));