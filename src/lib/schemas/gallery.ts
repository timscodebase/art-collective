import { getDb } from '$lib/db';
import { imageSchema } from './image';

// Define the schema directly in this file
export const gallerySchema = {
  title: 'gallery',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    themeColor: {
      type: 'string',
    },
    isFree: {
      type: 'boolean',
    },
    userId: {
      type: 'string',
      ref: 'users'
    }
  },
  required: ['id', 'name', 'isFree', 'userId'],
};


let collections = null;

// The getCollections function remains the same
export const getCollections = async () => {
  if (!collections) {
    const db = await getDb();
    collections = await db.addCollections({
      galleries: {
        schema: gallerySchema,
      },
      images: {
        schema: imageSchema,
      },
    });
  }
  return collections;
};