import { UserInputError } from 'apollo-server';
import { RegisterInput } from '../graphql/resolvers/user';

export const registerInputValidator = ({
  username,
  password,
  confirmPassword,
  email,
}: RegisterInput): UserInputError | undefined => {
  if (username.trim() === '')
    return new UserInputError('username can not be empty', {
      field: 'username',
    });
  if (password.trim() === '')
    return new UserInputError('password can not be empty', {
      field: 'password',
    });
  if (confirmPassword !== password)
    return new UserInputError('password confirmation must match password', {
      field: 'confirmPassword',
    });
  if (email.trim() === '')
    return new UserInputError('email can not be empty', {
      field: 'email',
    });
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!emailRegex.test(email))
    return new UserInputError('email is not validate', {
      field: 'email',
    });
  return;
};

export const loginInputValidator = (
  username: string,
  password: string
): UserInputError | undefined => {
  if (username.trim() === '')
    return new UserInputError('username can not be empty', {
      field: 'username',
    });
  if (password.trim() === '')
    return new UserInputError('password can not be empty', {
      field: 'password',
    });
  return;
};
