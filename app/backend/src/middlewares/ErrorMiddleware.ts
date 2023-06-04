import { NextFunction, Request, Response } from 'express';
import ValidationErrors from '../errors/validationsErros';

export default class ErrorMiddlerware {
  public static handleError(err: Error, req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ValidationErrors) {
      return res.status(err.status).json({ message: err.message });
    }

    console.log(err);
    return res.status(500).json({ message: 'Internal Error' });
  }
}
