import chai, { expect } from 'chai';
import chaihttp from 'chai-http';
import shell from 'shelljs';
import { Response } from 'superagent';
import api from '../../../api/api';
import generateToken from '../../../helpers/generateToken';
import {
  successUsersGetByUsernameRequest,
  successUsersLoginRequest
} from '../../mocks/users.mock';

chai.use(chaihttp);

describe('Testes da rota "GET /users"', () => {
  let response: Response;
  let errorMessage: { message: string };

  before(() => {
    shell.exec('npm run db:reset');
  });

  describe('Caso de SUCESSO', () => {
    before(async () => {
      const { body: { token } } = await chai
        .request(api)
        .post('/users/login')
        .send(successUsersLoginRequest);

      response = await chai
        .request(api)
        .get('/users/me')
        .set({ Authorization: token });
    });

    describe('Ao realizar a requisição de leitura dos dados do usuário:', () => {
      it('Retorna status code "200"', () => {
        expect(response).to.have.status(200);
      });

      it('Retorna os dados do usuário no corpo da resposta', () => {
        expect(response.body).to.be.eqls(successUsersGetByUsernameRequest);
      });
    });
  });

  describe('Casos de FALHA', () => {
    describe('Ao realizar uma transação sem o "token":', () => {
      before(async() => {
        response = await chai
        .request(api)
        .get('/users/me')
      });

      it('Retorna status code "401"', () => {
        expect(response).to.have.status(401);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Token não encontrado' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
    
    describe('Ao realizar uma transação com o "token" inválido:', () => {
      before(async() => {
        response = await chai
        .request(api)
        .get('/users/me')
        .set({ Authorization: 'invalid-token' });
      });

      it('Retorna status code "401"', () => {
        expect(response).to.have.status(401);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Token inválido ou expirado' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
  
    describe('Ao realizar a requisição de leitura dos dados do usuário com token contendo infomações de usuário inexistente:', () => {
      const token = generateToken({
        id: 9999,
        username: 'non-existent',
        password: 'MyPassword123',
        accountId: 9999
      });
      
      before(async () => {
        response = await chai
          .request(api)
          .get('/users/me')
          .set({ Authorization: token });
      });
      
      it('Retorna status code "404"', () => {
        expect(response).to.have.status(404);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Usuário não encontrado' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
  });
});