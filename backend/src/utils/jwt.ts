import { sign, verify, SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JWTPayload = {
    id: user._id!.toString(),
    email: user.email,
    role: user.role
  };
  
  const signOptions: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRE || '30d') as any
  };
  return sign(payload, process.env.JWT_SECRET || 'fallback-secret-key', signOptions);
};

export const verifyToken = (token: string): JWTPayload => {
  return verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as JWTPayload;
};
