import chai, { expect } from 'chai';
import chaihttp from 'chai-http';
import shell from 'shelljs';
import { Response } from 'superagent';
import api from '../../../api/api';
import {
  nonExistentPasswordUsersCreateRequest,
  nonExistentUsernameUsersCreateRequest,
  passwordLessThanEightCharactersUsersCreateRequest,
  passwordWithoutAtLeastOneNumberUsersCreateRequest,
  passwordWithoutAtLeastOneUppercaseLetterUsersCreateRequest,
  successUsersCreateRequest,
  userAlreadyExistsUsersCreateRequest,
  usernameLessThanThreeCharactersUsersCreateRequest
} from '../../mocks/users.mock';

chai.use(chaihttp);

describe('Testes da rota "POST /users"', () => {
  let response: Response;
  let errorMessage: { message: string };

  before(() => {
    shell.exec('npm run db:reset');
  });

  describe('Caso de SUCESSO', () => {
    before(async () => {
      response = await chai
        .request(api)
        .post('/users')
        .send(successUsersCreateRequest);
    });

    describe('Ao cadastrar novo usuário:', () => {
      it('Retorna status code "201"', () => {
        expect(response).to.have.status(201);
      });
    });
  });

  describe('Casos de FALHA', () => {
    describe('Ao tentar cadastrar um usuário com o atributo "username" inexistente:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users')
          .send(nonExistentUsernameUsersCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "username" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar cadastrar um usuário com o atributo "username" menor que 3 caracteres:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users')
          .send(usernameLessThanThreeCharactersUsersCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "username" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar cadastrar um usuário com o atributo "password" inexistente:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users')
          .send(nonExistentPasswordUsersCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "password" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar cadastrar um usuário com o atributo "password" menor que 8 caracteres:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users')
          .send(passwordLessThanEightCharactersUsersCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "password" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar cadastrar um usuário com o atributo "password" sem possuir pelo menos uma letra maiúscula:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users')
          .send(passwordWithoutAtLeastOneUppercaseLetterUsersCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "password" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar cadastrar um usuário com o atributo "password" sem possuir pelo menos um número:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users')
          .send(passwordWithoutAtLeastOneNumberUsersCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "password" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar cadastrar um usuário já existente:', () => {
      before(async () => {
        response = await chai
          .request(api)
          .post('/users')
          .send(userAlreadyExistsUsersCreateRequest);
      });
      
      it('Retorna status code "409"', () => {
        expect(response).to.have.status(409);
      });
  
      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Usuário já existe' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
  });
});