import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import routes from './helpers/routes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.myAccount} element={<MyAccount />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
