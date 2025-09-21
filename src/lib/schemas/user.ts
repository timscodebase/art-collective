
export const userSchema = {
  title: 'user',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: ['id', 'username', 'email', 'password'],
  indexes: ['username', 'email'],
};
