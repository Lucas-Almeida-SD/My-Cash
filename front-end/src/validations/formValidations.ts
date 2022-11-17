export const usernameValidate = (username: string) => (
  username.length >= 3
);

export const passwordValidate = (password: string) => {
  const regex = /(?=.*\d)(?=.*[A-Z])/;
  return (regex.test(password) && password.length >= 8);
};
