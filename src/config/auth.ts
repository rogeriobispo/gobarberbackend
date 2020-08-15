export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: process.env.EXPIRE_TOKEN || '1d',
  },
};
