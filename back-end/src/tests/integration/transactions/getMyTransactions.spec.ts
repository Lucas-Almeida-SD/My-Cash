import chai, { expect } from 'chai';
import chaihttp from 'chai-http';
import shell from 'shelljs';
import { Response } from 'superagent';
import api from '../../../api/api';
import {
  firstUserCredentials,
  successAllFiltersGetMyTransactionsRequest,
  successCashInFilterGetMyTransactionsRequest,
  successCashOutFilterGetMyTransactionsRequest,
  successCreatedAtFilterGetMyTransactionsRequest,
  successWithoutFiltersGetMyTransactionsRequest
} from '../../mocks/transactions.mock';

chai.use(chaihttp);

describe('Testes da rota "POST /transactions/me"', () => {
  let response: Response;
  let errorMessage: { message: string };
  let token: string;

  before(async () => {
    shell.exec('npm run db:reset');

    const userLoginResponse: Response = await chai
      .request(api)
      .post('/users/login')
      .send(firstUserCredentials);
    
    token = userLoginResponse.body.token;
  });

  describe('Casos de SUCESSO', () => {
    describe('Quando a requisição não possui filtros:', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
        .set({ Authorization: token });
      });
  
      describe('Ao ler os dados das transações:', () => {
        it('Retorna status code "200"', () => {
          expect(response).to.have.status(200);
        });
    
        it('Retorna no corpo da resposta uma lista de todas as transações que o usuário participou', () => {
          expect(response.body).to.be.eqls(successWithoutFiltersGetMyTransactionsRequest);
        });
      });
    });

    describe('Quando a requisição possui apenas o filtro de "cash out":', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
        .set({ Authorization: token })
        .send({ cashType: 'out' });
      });
  
      describe('Ao ler os dados das transações:', () => {
        it('Retorna status code "200"', () => {
          expect(response).to.have.status(200);
        });
    
        it('Retorna no corpo da resposta uma lista de todas as transações de SAÍDA que o usuário participou', () => {
          expect(response.body).to.be.eqls(successCashOutFilterGetMyTransactionsRequest);
        });
      });
    });

    describe('Quando a requisição possui apenas o filtro de "cash in":', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
        .set({ Authorization: token })
        .send({ cashType: 'in' });
      });
  
      describe('Ao ler os dados das transações:', () => {
        it('Retorna status code "200"', () => {
          expect(response).to.have.status(200);
        });
    
        it('Retorna no corpo da resposta uma lista de todas as transações de ENTRADA que o usuário participou', () => {
          expect(response.body).to.be.eqls(successCashInFilterGetMyTransactionsRequest);
        });
      });
    });

    describe('Quando a requisição possui apenas o filtro de "data de criação":', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
        .set({ Authorization: token })
        .send({ createdAt: '2022-10-10' });
      });
  
      describe('Ao ler os dados das transações:', () => {
        it('Retorna status code "200"', () => {
          expect(response).to.have.status(200);
        });
    
        it('Retorna no corpo da resposta uma lista de todas as transações que o usuário participou na data definida', () => {
          expect(response.body).to.be.eqls(successCreatedAtFilterGetMyTransactionsRequest);
        });
      });
    });

    describe('Quando a requisição possui filtros de "cash out" e de "data de criação"', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
        .set({ Authorization: token })
        .send({ cashType: 'out', createdAt: '2022-10-10' });
      });
  
      describe('Ao ler os dados das transações:', () => {
        it('Retorna status code "200"', () => {
          expect(response).to.have.status(200);
        });
    
        it('Retorna no corpo da resposta uma lista de todas as transações de SAÍDA que o usuário participou na data definida', () => {
          expect(response.body).to.be.eqls(successAllFiltersGetMyTransactionsRequest);
        });
      });
    });
  });

  describe('Casos de FALHA', () => {
    describe('Ao realizar a requisição de leitura das transações sem o "token":', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
      });

      it('Retorna status code "401"', () => {
        expect(response).to.have.status(401);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Token não encontrado' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
    
    describe('Ao realizar a requisição de leitura das transações com o "token" inválido:', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
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
  });

  describe('Casos de FALHA', () => {
    describe('Ao realizar a requisição de leitura das transações com o atributo "cashType" diferente de "in" ou "out":', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
        .set({ Authorization: token })
        .send({ cashType: 'in-out' });
      });

      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "cashType" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao realizar a requisição de leitura das transações com o atributo "createdAt" com formato inválido:', () => {
      before(async() => {
        response = await chai
        .request(api)
        .post('/transactions/me')
        .set({ Authorization: token })
        .send({ createdAt: '2022.10.10' });
      });

      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "createdAt" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
  });
});