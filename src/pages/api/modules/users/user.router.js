import { Router } from 'express';
import UserController from './user.controller.js';

export default class UsersRoute {
    path = '/user';
    router = Router();
    userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`${this.path}/all`, this.userController.getAllUsers);
    }
}
