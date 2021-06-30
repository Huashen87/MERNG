import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

interface UserPayload {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface UserPayloadWithToken {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  token: string;
}

export const generateToken = (user: UserPayload): UserPayloadWithToken => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return { ...payload, token: token };
};
