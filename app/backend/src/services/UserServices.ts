import { compare } from 'bcryptjs';
import ValidationErrors from '../errors/validationsErros';
import createJwt from '../auth/createToken';
import UsersModel from '../database/models/UsersModel';

export type messageError = {
  status: number;
  message: string;
};

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
  public static async loginUser(userLogin: UsersLogin): Promise< string > {
    const { email, password } = userLogin;
    const messageError = 'Invalid email or password';

    const emailValidRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    const checkEmail = emailValidRegex.test(email);
    const checkLengthPassword = password.length >= 6;

    if (!checkEmail || !checkLengthPassword) throw new ValidationErrors(401, messageError);

    const user = await UsersModel.findOne({ where: { email } });
    if (!user) throw new ValidationErrors(401, messageError);

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      throw new ValidationErrors(401, messageError);
    }

    const token = createJwt(user.id);
    return token;
  }

  public static async findUserRole(id: number): Promise< string > {
    const user = await UsersModel.findByPk(id);

    if (!user) throw new ValidationErrors(500, 'Usuario não encontrado');

    return user.role;
  }
}

export default UsersService;
