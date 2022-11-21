import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { } from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes da página Home', () => {
  it('Deve renderizar na rota "/"', () => {
    renderWithRouter(<App />);
    const { pathname } = window.location;

    expect(pathname).toBe('/');
  });

  it('Deve renderizar os links de navegação corretamente', () => {
    renderWithRouter(<App />);
    const homePageLink = screen.getByTestId('home-page-link');
    const loginPageLink = screen.getByTestId('login-page-link');
    const registerPageLink = screen.getByTestId('register-page-link');

    expect(homePageLink).toBeInTheDocument();
    expect(loginPageLink).toBeInTheDocument();
    expect(registerPageLink).toBeInTheDocument();
  });

  it('Link de navegação para página de Login deve redirecionar para "/login"', () => {
    renderWithRouter(<App />);

    const loginPageLink = screen.getByTestId('login-page-link');
    userEvent.click(loginPageLink);

    expect(window.location.pathname).toBe('/login');
  });

  it('Link de navegação para página de Cadastro deve redirecionar para  "/cadastro"', () => {
    renderWithRouter(<App />);

    const registerPageLink = screen.getByTestId('register-page-link');
    userEvent.click(registerPageLink);

    expect(window.location.pathname).toBe('/cadastro');
  });
});
