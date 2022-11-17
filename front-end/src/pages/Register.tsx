import React, { FormEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../@types/ErrorMessage';
import loginImg from '../assets/imgs/login.gif';
import Form from '../components/Form';
import { MyContext } from '../contexts/MyContext';
import errorNotify from '../helpers/errorNotify';
import routes from '../helpers/routes';
import successNotify from '../helpers/successNotify';
import requestCreateUser from '../services/requestCreateUser';

export default function Register() {
  const {
    setIsLoading,
  } = useContext(MyContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const responseCreateUser = await requestCreateUser(username, password);
    const errorMessage = responseCreateUser as ErrorMessage;

    if (errorMessage.message) {
      errorNotify(errorMessage.message);
    } else {
      successNotify('Usuário registrado com sucesso');
      navigate(routes.login);
    }

    setIsLoading(false);
  };

  return (
    <main>
      <div>
        <img src={loginImg} alt="Usuário realizando seu cadastro" />
      </div>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        submitBtnText="Cadastrar"
      />
    </main>
  );
}
