import { Request, Response, NextFunction } from 'express';
import ValidationErrors from '../errors/validationsErros';

const checkFieldsLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationErrors(400, 'All fields must be filled');
  }

  next();
};

export default checkFieldsLogin;
