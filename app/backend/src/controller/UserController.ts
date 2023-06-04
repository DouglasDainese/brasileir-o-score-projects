import { Request, Response } from 'express';
import UsersService from '../services/UserServices';

class UsersController {
  public static async login(req: Request, res: Response): Promise<Response | void> {
    const userToken = await UsersService.loginUser(req.body);

    return res.status(200).json({ token: userToken });
  }
}

export default UsersController;
