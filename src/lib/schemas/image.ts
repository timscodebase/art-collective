// src/lib/schemas/image.ts
export const imageSchema = {
  title: 'image',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    galleryId: {
      type: 'string',
      ref: 'galleries',
    },
    url: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    createdAt: { // Add this field
      type: 'string',
      format: 'date-time',
      index: true
    }
  },
  required: ['id', 'galleryId', 'url', 'createdAt'], // Add createdAt here
};