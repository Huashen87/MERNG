import dotenv from 'dotenv';
dotenv.config();

export const MONGODB: string = process.env.MONGODB || 'mongodb';
export const JWT_SECRET: string = process.env.JWT_SECRET || 'jwt';
