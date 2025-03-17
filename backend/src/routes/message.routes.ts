import { Router } from "express";
import MessageController from "../controllers/message.controller";

class MessageRoutes extends MessageController {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.post('/', this.createMessage);
    this.router.get('/:messageId', this.getMessage);
    this.router.get('/', this.getMessages);
  }
}

export default new MessageRoutes().router;