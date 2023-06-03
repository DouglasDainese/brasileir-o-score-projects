import { sign, SignOptions } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const createJwt = (id: number): string => {
  const jwtConfig: SignOptions = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };
  const token = sign({ payload: { userId: id } }, secret, jwtConfig);

  return token;
};

export default createJwt;
