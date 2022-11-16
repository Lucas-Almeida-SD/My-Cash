import React, { FormEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../@types/ErrorMessage';
import { User, UserToken } from '../@types/User';
import loginImg from '../assets/imgs/login.gif';
import { MyContext } from '../contexts/MyContext';
import errorNotify from '../helpers/errorNotify';
import routes from '../helpers/routes';
import successNotify from '../helpers/successNotify';
import requestGetUser from '../services/requestGetUser';
import requestLogin from '../services/requestLogin';

export default function Login() {
  const {
    isLoading, setIsLoading, setToken, setUser,
  } = useContext(MyContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let responseLogin = await requestLogin(username, password);
      let errorMessage = responseLogin as ErrorMessage;
      if (errorMessage.message) throw new Error(errorMessage.message);
      responseLogin = responseLogin as UserToken;

      let responseGetUser = await requestGetUser(responseLogin.token);
      errorMessage = responseGetUser as ErrorMessage;
      if (errorMessage.message) throw new Error(errorMessage.message);
      responseGetUser = responseGetUser as User;

      setToken(responseLogin.token);
      setUser(responseGetUser);
      successNotify('Login efetuado com sucesso');
      navigate(routes.myAccount);
    } catch (err) {
      errorNotify((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div>
        <img src={loginImg} alt="Usuário fazendo login" />
      </div>
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
        <button type="submit" disabled={isLoading}>Entrar</button>
      </form>
    </main>
  );
}
