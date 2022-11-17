import React from 'react';
import useMyContext from '../hooks/useMyContext';
import Input from './Input';

interface Props {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler;
  submitBtnText: string;
  isValidUsername?: boolean;
  isValidPassword?: boolean;
  isValidForm?: boolean;
  inputUsernameErrorMessage?: string;
  inputPasswordErrorMessage?: string;
}

export default function Form(props: Props) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    submitBtnText,
    isValidUsername,
    isValidPassword,
    isValidForm,
    inputUsernameErrorMessage,
    inputPasswordErrorMessage,
  } = props;
  const { isLoading } = useMyContext();

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="username"
        type="text"
        value={username}
        setValue={setUsername}
        isValidInput={isValidUsername}
        inputErrorMessage={inputUsernameErrorMessage}
      />
      <Input
        id="password"
        type="password"
        value={password}
        setValue={setPassword}
        isValidInput={isValidPassword}
        inputErrorMessage={inputPasswordErrorMessage}
      />
      <button
        type="submit"
        disabled={isLoading || !isValidForm}
      >
        {submitBtnText}
      </button>
    </form>
  );
}

Form.defaultProps = {
  isValidUsername: true,
  isValidPassword: true,
  isValidForm: true,
  inputUsernameErrorMessage: '',
  inputPasswordErrorMessage: '',
};
