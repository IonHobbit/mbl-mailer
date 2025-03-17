import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes extends UserController {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.post('/', this.createUser);
    this.router.get('/:userId', this.getUser);
    this.router.get('/', this.getAllUsers);
  }
}

export default new UserRoutes().router;