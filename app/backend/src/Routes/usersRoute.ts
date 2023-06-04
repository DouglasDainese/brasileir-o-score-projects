import { Router } from 'express';
import checkFieldsLogin from '../middlewares/loginValidateFields';
import UserController from '../controller/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const usersRoute = Router();

usersRoute.post('/', checkFieldsLogin, UserController.login);

usersRoute.get('/role', authMiddleware, UserController.userRole);

export default usersRoute;
