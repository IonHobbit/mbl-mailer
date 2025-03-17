import { Response } from 'express';

export const errorHandler = (res: Response, code: number, message: string, error?: any) => {
  res.status(code).json({
    message,
    error,
  });
}