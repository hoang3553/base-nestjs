/* eslint-disable import/no-default-export */
export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  appEnv: process.env.APP_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expireTime: process.env.EXPIRE_TIME,
  },
  GOOGLE: {
    id: process.env.FACEBOOK_ID,
    secret: process.env.FACEBOOK_SECRET,
  },
  google: {
    id: process.env.GOOGLE_ID,
    secret: process.env.GOOGLE_SECRET,
  },
});
