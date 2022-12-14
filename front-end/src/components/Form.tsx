import React from 'react';
import useMyContext from '../hooks/useMyContext';
import Input from './Input';
import usernameIcon from '../assets/imgs/username.png';

interface Props {
  className: string;
  title: string;
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
    className,
    title,
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
    <form className={className} onSubmit={handleSubmit}>
      <h2 className="title">{title}</h2>
      <Input
        id="username"
        type="text"
        value={username}
        setValue={setUsername}
        isValidInput={isValidUsername}
        inputErrorMessage={inputUsernameErrorMessage}
        icon={usernameIcon}
        placeholder="Nome de usuário"
      />
      <Input
        id="password"
        type="password"
        value={password}
        setValue={setPassword}
        isValidInput={isValidPassword}
        inputErrorMessage={inputPasswordErrorMessage}
        placeholder="Senha"
      />
      <button
        className="form-btn"
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
