import React from 'react';
import useMyContext from '../hooks/useMyContext';

interface Props {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler;
  submitBtnText: string;
}

export default function Form(props: Props) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    submitBtnText,
  } = props;
  const { isLoading } = useMyContext();

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit" disabled={isLoading}>{submitBtnText}</button>
    </form>
  );
}
