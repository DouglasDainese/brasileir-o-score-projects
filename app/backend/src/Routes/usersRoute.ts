import { Router } from 'express';
import checkFieldsLogin from '../middlewares/loginValidateFields';
import UserController from '../controller/UserController';

const usersRoute = Router();

usersRoute.post('/', checkFieldsLogin, UserController.login);

export default usersRoute;
