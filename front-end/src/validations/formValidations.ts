export const usernameValidate = (username: string) => (
  username.length >= 3
);

export const passwordValidate = (password: string) => {
  const regex = /(?=.*\d)(?=.*[A-Z])/;
  return (regex.test(password) && password.length >= 8);
};

export const transactionValueValidate = (transactionValue: string) => {
  if (transactionValue === '') return true;

  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(transactionValue);
};
