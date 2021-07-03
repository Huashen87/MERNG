import { model, Schema, Document } from 'mongoose';

interface User {
  username: string;
  password: string;
  email: string;
  createdAt: string;
}

export interface UserModel extends User, Document {}

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

export default model<UserModel>('User', userSchema);
