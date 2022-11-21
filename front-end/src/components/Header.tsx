import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { User } from '../@types/User';
import routes from '../helpers/routes';
import useMyContext from '../hooks/useMyContext';

export default function Header() {
  const { user, setUser } = useMyContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!Object.keys(user).length) navigate(routes.home);
  }, [user]);

  return (
    <header className="page-header">
      <div className="logo-container">
        <h1>MY CA$H</h1>
      </div>
      <nav className="page-links">
        {(!Object.keys(user).length)
          ? (
            <>
              <Link
                data-testid="home-page-link"
                to={routes.home}
                className={classnames({ selected: pathname === routes.home })}
              >
                Home
              </Link>
              <Link
                data-testid="login-page-link"
                to={routes.login}
                className={classnames({ selected: pathname === routes.login })}
              >
                Login
              </Link>
              <Link
                data-testid="register-page-link"
                to={routes.register}
                className={classnames({ selected: pathname === routes.register })}
              >
                Cadastrar
              </Link>
            </>
          )
          : (
            <>
              <Link
                data-testid="my-account-page-link"
                to={routes.myAccount}
                className={classnames({ selected: pathname === routes.myAccount })}
              >
                Minha conta
              </Link>
              <Link
                data-testid="transactions-page-link"
                to={routes.transactions}
                className={classnames({ selected: pathname === routes.transactions })}
              >
                Transações
              </Link>
              <Link to="/" onClick={() => setUser({} as User)}>Sair</Link>
            </>
          )}
      </nav>
    </header>
  );
}
