import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { } from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes da página Login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve renderizar na rota "/login"', () => {
    renderWithRouter(<App />);
    const loginPageLink = screen.getByTestId('login-page-link');
    userEvent.click(loginPageLink);

    expect(window.location.pathname).toBe('/login');
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

  it('Link de navegação para página Home deve redirecionar para "/"', () => {
    renderWithRouter(<App />);

    const homePageLink = screen.getByTestId('home-page-link');
    userEvent.click(homePageLink);

    expect(window.location.pathname).toBe('/');
  });

  it('Link de navegação para página de Cadastro deve redirecionar para  "/cadastro"', () => {
    renderWithRouter(<App />);

    const registerPageLink = screen.getByTestId('register-page-link');
    userEvent.click(registerPageLink);

    expect(window.location.pathname).toBe('/cadastro');
  });

  it('Deve renderizar o fomulário de login corretamente', () => {
    renderWithRouter(<App />);

    const loginPageLink = screen.getByTestId('login-page-link');
    userEvent.click(loginPageLink);

    const formTitle = screen.getByRole('heading', { level: 2, name: 'Login' });
    const usernameInput = screen.getByPlaceholderText('Nome de usuário');
    const passwordInput = screen.getByPlaceholderText('Senha');

    expect(window.location.pathname).toBe('/login');
    expect(formTitle).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
