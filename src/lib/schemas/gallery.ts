
import { getDb } from '../../lib/db';

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
  },
  required: ['id', 'name', 'isFree'],
};

import { imageSchema } from './image';

let collections = null;

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
