export const registerInputValidator = (
  username: string,
  email: string,
  password: string
): Error | undefined => {
  if (username.trim() === '') return new Error('username can not be empty');
  if (password.trim() === '') return new Error('password can not be empty');
  if (email.trim() === '') return new Error('email can not be empty');
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!emailRegex.test(email)) return new Error('email is not validate');
  return;
};

export const loginInputValidator = (username: string, password: string): Error | undefined => {
  if (username.trim() === '') return new Error('username can not be empty');
  if (password.trim() === '') return new Error('password can not be empty');
  return;
};
