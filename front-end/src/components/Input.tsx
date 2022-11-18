import React, { useState } from 'react';
import showPasswordIcon from '../assets/imgs/show-password.png';
import hidePasswordIcon from '../assets/imgs/hide-password.png';

interface InputProps {
  id: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isValidInput?: boolean
  inputErrorMessage?: string;
  icon?: string;
}

export default function Input({
  id,
  type,
  value,
  setValue,
  isValidInput,
  inputErrorMessage,
  icon,
}: InputProps) {
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const renderPasswordIcon = () => (
    <img
      className={`${id}-icon`}
      src={(showPassword) ? showPasswordIcon : hidePasswordIcon}
      alt="Icone do input"
      onClick={() => setShowPassword(!showPassword)}
      aria-hidden
    />
  );

  const renderAnyIcon = () => (
    <img className={`${id}-icon`} src={icon} alt="Icone do input" />
  );

  return (
    <div className="input-container">
      <label htmlFor={id}>
        <input
          id={id}
          type={(showPassword) ? 'text' : type}
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onBlur={() => setIsError(!isValidInput)}
        />
        {(icon || type === 'password') && (
          <div className="icon-container">
            {(type === 'password') ? renderPasswordIcon() : renderAnyIcon()}
          </div>
        )}
      </label>
      {(isError) && <p>{inputErrorMessage}</p>}
    </div>
  );
}

Input.defaultProps = {
  isValidInput: true,
  inputErrorMessage: '',
  icon: '',
};
