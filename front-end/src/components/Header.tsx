import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../@types/User';
import routes from '../helpers/routes';
import useMyContext from '../hooks/useMyContext';

export default function Header() {
  const { user, setUser } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.keys(user).length) navigate(routes.home);
  }, [user]);

  return (
    <header>
      <div>Logo</div>
      <nav>
        {(!Object.keys(user).length)
          ? (
            <>
              <Link to={routes.home}>Home</Link>
              <Link to={routes.login}>Login</Link>
              <Link to={routes.register}>Cadastrar</Link>
            </>
          )
          : (
            <>
              <Link to={routes.myAccount}>Minha conta</Link>
              <Link to={routes.transactions}>Transações</Link>
              <Link to="/" onClick={() => setUser({} as User)}>Sair</Link>
            </>
          )}
      </nav>
    </header>
  );
}
