import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { galleries } from './gallery';
import { relations } from 'drizzle-orm';

export const images = sqliteTable('images', {
	id: text('id').primaryKey(),
	galleryId: text('gallery_id')
		.notNull()
		.references(() => galleries.id),
	url: text('url').notNull(),
	title: text('title'),
	description: text('description'),
	createdAt: text('created_at').notNull()
});

export const imagesRelations = relations(images, ({ one }) => ({
	gallery: one(galleries, {
		fields: [images.galleryId],
		references: [galleries.id]
	})
}));