import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';
import { loginInputValidator, registerInputValidator } from '../../util/validator';
import { generateToken } from '../../util/token';

const userResolver = {
  Mutation: {
    async register(_: any, { input: { username, password, email } }: any) {
      try {
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

        return generateToken(user);
      } catch (err) {
        throw new Error(err);
      }
    },
    async login(_: any, { input: { username, password } }: any) {
      try {
        const error = loginInputValidator(username, password);
        if (error) throw new UserInputError(error.message);

        const user = await User.findOne({ username }).exec();
        if (!user) throw new UserInputError('user does not exist');

        const validated = await bcrypt.compare(password, user.password);
        if (!validated) throw new UserInputError('password is incorrect');

        return generateToken(user);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default userResolver;
