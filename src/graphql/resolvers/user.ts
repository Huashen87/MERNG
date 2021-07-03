import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';
import { loginInputValidator, registerInputValidator } from '../../util/validator';
import { generateTokenAndPayload } from '../../util/token';
import { Context } from '../contextType';

interface RegisterInput {
  username: string;
  password: string;
  email: string;
}

interface LoginInput {
  username: string;
  password: string;
}

const userResolver = {
  Mutation: {
    register: async (_: any, { username, password, email }: RegisterInput) => {
      const error = registerInputValidator(username, email, password);
      if (error) throw new UserInputError(error.message);

      const existUser = await User.findOne({ username }).exec();
      if (existUser) throw new UserInputError('username is already taken');

      password = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const tokenAndPayload = generateTokenAndPayload(user);
      return tokenAndPayload;
    },
    login: async (_: any, { username, password }: LoginInput) => {
      const error = loginInputValidator(username, password);
      if (error) throw new UserInputError(error.message);

      const user = await User.findOne({ username }).exec();
      if (!user) throw new UserInputError('user does not exist');

      const validated = await bcrypt.compare(password, user.password);
      if (!validated) throw new UserInputError('password is incorrect');

      return generateTokenAndPayload(user);
    },
  },
};

export default userResolver;
