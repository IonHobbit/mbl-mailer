import { Document } from 'mongoose';

export interface Message extends Document {
  messageId: string;
  subject: string;
  content: string;
  isRead: boolean;
  userId: string;
  createdAt: Date;
}