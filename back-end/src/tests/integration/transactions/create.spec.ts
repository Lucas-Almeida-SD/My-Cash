import chai, { expect } from 'chai';
import chaihttp from 'chai-http';
import shell from 'shelljs';
import { Response } from 'superagent';
import api from '../../../api/api';
import { IUserRelationWithAccount } from '../../../interfaces/IUser.interface';
import { 
  firstUserCredentials,
  secondUserCredentialsa,
  nonExistentCashInUsernameTransactionsCreateRequest,
  nonExistentValueTransactionsCreateRequest,
  transactionForYourselfTransactionsCreateRequest,
  userNotFoundTransactionsCreateRequest,
  valueHavingMoreThanThreeDecimalPlaces,
  valueLessThanZeroTransactionsCreateRequest,
  valueGreaterThanBalanceTransactionsCreateRequest,
  successTransactionsCreateRequest,
  newCashInUserBalance,
  newCashOutUserBalance,
} from '../../mocks/transactions.mock';

chai.use(chaihttp);

describe('Testes da rota "POST /transactions"', () => {
  let response: Response;
  let errorMessage: { message: string };
  let cashOutUserToken: string;
  let cashInUserToken: string;
  let cashOutUserData: IUserRelationWithAccount;
  let cashInUserData: IUserRelationWithAccount;

  before(async () => {
    shell.exec('npm run db:reset');

    const cashOutUserLoginResponse: Response = await chai
      .request(api)
      .post('/users/login')
      .send(secondUserCredentialsa);
    
    const cashInUserLoginResponse: Response = await chai
      .request(api)
      .post('/users/login')
      .send(firstUserCredentials);
    
    cashOutUserToken = cashOutUserLoginResponse.body.token
    cashInUserToken = cashInUserLoginResponse.body.token 
  });

  describe('Casos de FALHA', () => {
    describe('Ao tentar realizar uma transação sem o atributo "value":', () => {
      before(async () => {
        response = await chai
        .request(api)
        .post('/transactions')
        .set({ Authorization: cashOutUserToken })
        .send(nonExistentValueTransactionsCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "value" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar realizar uma transação com o atributo "value" possuindo valor menor que "0":', () => {
      before(async () => {
        response = await chai
        .request(api)
        .post('/transactions')
        .set({ Authorization: cashOutUserToken })
        .send(valueLessThanZeroTransactionsCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "value" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar realizar uma transação com o atributo "value" possuindo valor com mais de 3 casas decimais:', () => {
      before(async () => {
        response = await chai
        .request(api)
        .post('/transactions')
        .set({ Authorization: cashOutUserToken })
        .send(valueHavingMoreThanThreeDecimalPlaces);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Valor não perrmitido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar realizar uma transação sem o atributo "cashInUsername":', () => {
      before(async () => {
        response = await chai
        .request(api)
        .post('/transactions')
        .set({ Authorization: cashOutUserToken })
        .send(nonExistentCashInUsernameTransactionsCreateRequest);
      });
      
      it('Retorna status code "400"', () => {
        expect(response).to.have.status(400);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Campo "cashInUsername" é inválido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar realizar uma transação para um usuário não cadastrado:', () => {
      before(async () => {
        response = await chai
        .request(api)
        .post('/transactions')
        .set({ Authorization: cashOutUserToken })
        .send(userNotFoundTransactionsCreateRequest);
      });
      
      it('Retorna status code "404"', () => {
        expect(response).to.have.status(404);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Usuário não encontrado' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar realizar uma transação para si mesmo:', () => {
      before(async () => {
        response = await chai
        .request(api)
        .post('/transactions')
        .set({ Authorization: cashOutUserToken })
        .send(transactionForYourselfTransactionsCreateRequest);
      });
      
      it('Retorna status code "403"', () => {
        expect(response).to.have.status(403);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Transação não permitida' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Ao tentar realizar uma transação com valor superior ao seu saldo:', () => {
      before(async () => {
        response = await chai
        .request(api)
        .post('/transactions')
        .set({ Authorization: cashOutUserToken })
        .send(valueGreaterThanBalanceTransactionsCreateRequest);
      });
      
      it('Retorna status code "403"', () => {
        expect(response).to.have.status(403);
      });

      it('Retorna mensagem de erro no corpo da resposta', () => {
        errorMessage = { message: 'Transação não realizada. Valor não permitido' };
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
  });

  describe('Caso de SUCESSO', () => {
    before(async () => {
      response = await chai
        .request(api)
        .post('/transactions')
        .set({ Authorization: cashOutUserToken })
        .send(successTransactionsCreateRequest);
      
      const cashOutUserDataResponse = await chai
        .request(api)
        .get('/users/me')
        .set({ Authorization: cashOutUserToken });

      const cashInUserDataResponse = await chai
        .request(api)
        .get('/users/me')
        .set({ Authorization: cashInUserToken });

      cashOutUserData = cashOutUserDataResponse.body;
      cashInUserData = cashInUserDataResponse.body;
    });

    describe('Ao realizar nova transação:', () => {
      it('Retorna status code "201"', () => {
        expect(response).to.have.status(201);
      });

      it('O "balance" do usuário que realizou a transação deve ser atualizado', () => {
        expect(cashOutUserData.account.balance).to.be.equal(newCashOutUserBalance);
      });

      it('O "balance" do usuário que recebeu a transação deve ser atualizado', () => {
        expect(cashInUserData.account.balance).to.be.equal(newCashInUserBalance);
      });
    });
  });
});