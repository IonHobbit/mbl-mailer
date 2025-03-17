import { Document } from 'mongoose';

export interface User extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}