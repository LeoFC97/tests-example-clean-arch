import mongoose, { Connection } from 'mongoose';

export default class SetupDatabaseForTests {
  public static async initializeMongoInMemory(): Promise<void> {
    mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  public static async closeConnection(connection: Connection): Promise<void> {
    await connection.close();
  }
  public static getConnection(): Connection {
    return mongoose.connection;
  }
}
