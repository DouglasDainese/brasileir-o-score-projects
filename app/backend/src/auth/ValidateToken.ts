import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

interface userId {
  userId: number;
}
interface Payload {
  payload: userId;
}

const verify = (token: string) : Payload => {
  const decode = jwt.verify(token, secret) as Payload;
  return decode as Payload;
};

export default { verify };
