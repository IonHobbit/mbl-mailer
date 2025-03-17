import { connect, Mongoose } from 'mongoose';
import config from '../config.util';

class DB {
  private mongooseConnection: Mongoose | null = null;

  public async connect(): Promise<Mongoose> {
    try {
      this.mongooseConnection = await connect(config.MONGODB_URI);

      console.log('Connected to database.');

      return this.mongooseConnection;
    } catch (error) {
      console.error(`failed to connect to database: ${error}`);
      throw error;
    }
  }

  public async closeConnection(): Promise<void> {
    if (this.mongooseConnection) {
      try {
        await this.mongooseConnection.disconnect();
        console.log('Database connection closed.');
      } catch (error) {
        console.error(`Error closing database connection: ${error}`);
      }
    }
  }
}

export default new DB();
