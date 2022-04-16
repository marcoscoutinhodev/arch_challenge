export default {
  port: process.env.SERVER_PORT || 4002,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/challenger_arch',
};
