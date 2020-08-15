export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: process.env.EXPIRE_TOKEN,
  },
};
