import React, { FormEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../@types/ErrorMessage';
import registerImg from '../assets/imgs/register.gif';
import Form from '../components/Form';
import { MyContext } from '../contexts/MyContext';
import errorNotify from '../helpers/errorNotify';
import inputErrorMessage from '../helpers/inputErrorMessage';
import routes from '../helpers/routes';
import successNotify from '../helpers/successNotify';
import requestCreateUser from '../services/requestCreateUser';
import * as formValidations from '../validations/formValidations';

export default function Register() {
  const {
    setIsLoading,
  } = useContext(MyContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isValidForm = [
    formValidations.usernameValidate(username),
    formValidations.passwordValidate(password),
  ].every((element) => element);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const responseCreateUser = await requestCreateUser(username, password);
    const errorMessage = responseCreateUser as ErrorMessage;

    setIsLoading(false);

    if (errorMessage.message) {
      errorNotify(errorMessage.message);
    } else {
      successNotify('Usuário registrado com sucesso');
      navigate(routes.login);
    }
  };

  return (
    <main id="register-page">
      <div className="img-container">
        <img src={registerImg} alt="Usuário realizando seu cadastro" />
      </div>
      <div className="form-container">
        <Form
          className="register-form"
          title="Cadastro"
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          submitBtnText="Cadastrar"
          isValidUsername={formValidations.usernameValidate(username)}
          isValidPassword={formValidations.passwordValidate(password)}
          isValidForm={isValidForm}
          inputUsernameErrorMessage={inputErrorMessage.username}
          inputPasswordErrorMessage={inputErrorMessage.password}
        />
      </div>
    </main>
  );
}
