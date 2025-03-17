import { Request, Response } from 'express';
import MessageModel from '../db/models/message.model';
import { errorHandler } from '../utils/error.util';

export default class MessageController {
  protected async createMessage(req: Request, res: Response) {
    try {
      const { subject, content, userId } = req.body;

      if (!subject || !content || !userId) {
        errorHandler(res, 400, 'Subject, content and userId are required');
      }

      const message = await MessageModel.create({ subject, content, userId });

      res.status(201).json({ message: 'Message created successfully', data: message });
    } catch (error) {
      errorHandler(res, 500, 'Message creation failed', error);
    }
  }

  protected async getMessages(req: Request, res: Response) {
    try {
      const { userId } = req.query;

      const messages = await MessageModel.find({ userId }).sort({ createdAt: -1 });

      if (!messages) {
        res.status(404).json({ message: 'Messages not found' });
      } else {
        res.status(200).json({ message: 'Messages fetched successfully', data: messages });
      }
    } catch (error) {
      errorHandler(res, 500, 'Messages fetching failed', error);
    }
  }

  protected async getMessage(req: Request, res: Response) {
    try {
      const { messageId } = req.params;

      const message = await MessageModel.findById(messageId);

      if (!message) {
        errorHandler(res, 404, 'Message not found', new Error('Message not found'));
      } else {
        if (!message.isRead) {
          message.isRead = true;
          await message.save();
        }
        res.status(200).json({ message: 'Message fetched successfully', data: message });
      }
    } catch (error) {
      errorHandler(res, 404, 'Message not found', new Error('Message not found'));
    }
  }
}
