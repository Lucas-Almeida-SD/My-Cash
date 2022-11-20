import chai, { expect } from 'chai';
import chaihttp from 'chai-http';
import shell from 'shelljs';
import { Response } from 'superagent';
import api from '../../../api/api';
import {
  incorrectPasswordUsersLoginRequest,
  nonExistentPasswordUsersLoginRequest,
  nonExistentUsernameUsersLoginRequest,
  notFoundUsernameUsersLoginRequest,
  successUsersLoginRequest,
} from '../../mocks/users.mock';

chai.use(chaihttp);

describe('Testes da rota "POST /users/login"', () => {
  let response: Response;
  let errorMessage: { message: string };

  before(() => {
    shell.exec('npm run db:reset');
  });

  describe('Caso de SUCESSO', () => {
    before(async () => {
      response = await chai
        .request(api)
        .post('/users/login')
        .send(successUsersLoginRequest);
    });

    describe('Ao fazer login:', () => {
      it('Retorna status code "200"', () => {
        expect(response).to.have.status(200);
      });

      it('Retorna um token no corpo da resposta', () => {
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.a('string');
      });
    });
  });

  describe('Casos de FALHA', () => {
    describe('Ao fazer login com atributo "username" inexistente:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users/login')
          .send(nonExistentUsernameUsersLoginRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "username" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao fazer login com atributo "password" inexistente:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users/login')
          .send(nonExistentPasswordUsersLoginRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "password" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao fazer login com "username" não cadastrado:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users/login')
          .send(notFoundUsernameUsersLoginRequest);
      });
      
      it('Retorna status code "404"', () => {
        expect(response).to.have.status(404);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Usuário não encontrado' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao fazer login com "password" incorreto:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users/login')
          .send(incorrectPasswordUsersLoginRequest);
      });
      
      it('Retorna status code "401"', () => {
        expect(response).to.have.status(401);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Senha incorreta' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
  });
});