import { Request, Response, NextFunction } from 'express';

const checkFieldsLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

export default checkFieldsLogin;
