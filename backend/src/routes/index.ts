import { Router, Request, Response } from 'express';
import userRoutes from './user.routes';
import messageRoutes from './message.routes';

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Welcome to MBL API.',
      });
    });

    this.router.use('/user', userRoutes);
    
    this.router.use('/message', messageRoutes);

    this.router.use('*', () => {
      throw new Error('Not Found');
    });
  }
}

export default new Routes().router;
