
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
  },
  required: ['id', 'galleryId', 'url'],
};
