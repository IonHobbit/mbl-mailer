import { model, Schema } from 'mongoose';
import { Message } from '../../interfaces/message.interface';

const messageSchema = new Schema<Message>({
  subject: { type: String, required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  userId: { type: String, required: true, ref: 'User' },
}, { timestamps: true });

const MessageModel = model<Message>('Message', messageSchema);

export default MessageModel;
