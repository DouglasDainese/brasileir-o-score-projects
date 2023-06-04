import { NextFunction, Request, Response } from 'express';
import validateToken from '../auth/ValidateToken';
import ValidationErrors from '../errors/validationsErros';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('authorization');

  if (!token) throw new ValidationErrors(401, 'Token not found');

  try {
    const decoded = validateToken.verify(token);

    req.body.id = decoded.payload.userId;
    return next();
  } catch (err) {
    throw new ValidationErrors(401, 'Token must be a valid token');
  }
};

export default authMiddleware;
