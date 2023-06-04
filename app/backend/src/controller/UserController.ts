import { Request, Response } from 'express';
import UsersService from '../services/UserServices';

class UsersController {
  public static async login(req: Request, res: Response): Promise<Response | void> {
    const userToken = await UsersService.loginUser(req.body);

    return res.status(200).json({ token: userToken });
  }

  public static async userRole(req: Request, res: Response) {
    const { id } = req.body;
    const userRole = await UsersService.findUserRole(id);

    return res.status(200).json({ role: userRole });
  }
}

export default UsersController;
