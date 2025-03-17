import { MongoClient } from 'mongodb';
import config from '../config.util';

export class DatabaseService {
  private client: MongoClient;
  private uri: string;

  constructor() {
    this.uri = config.MONGODB_URI;
    this.client = new MongoClient(this.uri);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Successfully connected to MongoDB.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Successfully disconnected from MongoDB.');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  }
}

export const db = new DatabaseService();
