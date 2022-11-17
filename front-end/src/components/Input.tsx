import React, { useState } from 'react';

interface InputProps {
  id: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isValidInput?: boolean
  inputErrorMessage?: string;
}

export default function Input({
  id,
  type,
  value,
  setValue,
  isValidInput,
  inputErrorMessage,
}: InputProps) {
  const [isError, setIsError] = useState(false);

  return (
    <label htmlFor={id}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onBlur={() => setIsError(!isValidInput)}
      />
      {(isError) && <p>{inputErrorMessage}</p>}
    </label>
  );
}

Input.defaultProps = {
  isValidInput: true,
  inputErrorMessage: '',
};
