import { Router } from 'express';
import UsersRoute from './modules/users/user.router.js';

const router = Router();

const usersRoute = new UsersRoute();

router.use('/', usersRoute.router);

export default router;
