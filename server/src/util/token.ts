import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserModel } from '../models/User';
import { Request } from 'express';

interface TokenAndPayload {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  token: string;
}

export const generateTokenAndPayload = (user: UserModel): TokenAndPayload => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  return { ...payload, token: token };
};

export const getUserPayloadFromRequest = (res: Request): UserModel => {
  const token = res.headers?.authorization?.split('Bearer ')[1];

  if (!token) throw new AuthenticationError('unauthorization');
  try {
    const payload: UserModel = jwt.verify(token, JWT_SECRET) as UserModel;
    return payload;
  } catch (error) {
    throw new AuthenticationError('invalid or expired token');
  }
};
