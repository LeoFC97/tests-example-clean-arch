export const mongodb = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/list-manager',
};

export const server = {
  port: process.env.SERVICE_PORT || '3000',
};
