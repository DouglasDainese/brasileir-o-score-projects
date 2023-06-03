import { compare } from 'bcryptjs';
import createJwt from '../auth/createToken';
import UsersModel from '../database/models/UsersModel';

export interface UsersLogin {
  email: string;
  password: string;
}

export interface Users extends UsersLogin {
  username: string;
  id: number;
  role: string;
}

class UsersService {
  public static async findByEmail(userLogin: UsersLogin): Promise< string > {
    const { email, password } = userLogin;
    const user = await UsersModel.findOne({ where: { email } });
    if (!user) throw new Error('email de usuario inexistente');

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) throw new Error('email ou senha invalida');
    const token = createJwt(user.id);
    return token;
  }
}

export default UsersService;
