import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useMyContext from './hooks/useMyContext';
import routes from './helpers/routes';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import Transactions from './pages/Transactions';
import Loading from './components/Loading';
import './styles/global.scss';

function App() {
  const { isLoading } = useMyContext();

  return (
    <div className="App">
      <Header />
      {(isLoading) && <Loading />}
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.myAccount} element={<MyAccount />} />
        <Route path={routes.transactions} element={<Transactions />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
