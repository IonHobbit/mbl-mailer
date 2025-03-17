import { Request, Response } from 'express';
import { MessageModel, UserModel } from '../db/models';
import { errorHandler } from '../utils/error.util';
export default class UserController {
  protected async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email } = req.body;

      const user = await UserModel.create({ firstName, lastName, email });

      res.status(201).json({
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      errorHandler(res, 500, 'User creation failed', error);
    }
  }

  protected async getUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await UserModel.findById(userId);

      const totalMessages = await MessageModel.countDocuments({ userId });
      const unreadMessages = await MessageModel.countDocuments({ userId, isRead: false });

      const inbox = {
        totalMessages,
        unreadMessages,
      };

      res.status(200).json({
        message: 'User fetched successfully',
        data: {
          ...user?.toObject(),
          inbox,
        },
      });
    } catch (error) {
      errorHandler(res, 500, 'User fetching failed', error);
    }
  }

  protected async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();

      res.status(200).json({
        message: 'Users fetched successfully',
        data: users,
      });
    } catch (error) {
      errorHandler(res, 500, 'Users fetching failed', error);
    }
  }
}