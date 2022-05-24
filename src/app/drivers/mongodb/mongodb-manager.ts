import mongoose, { Connection } from 'mongoose';

export default class MongoDBManager {
  static initialize(uri: string): void {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
    };
    mongoose.connect(uri, options)
      .then(() => console.info('Connected to MongoDB'))
      .catch(({ message }) => {
        console.error(
          { mongodb: { error: { message } } },
          'Failed to initialize MongoDB connection',
        );
        process.exitCode = 1;
      });
  }

  static isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  static get connection(): Connection {
    return mongoose.connection;
  }
}
