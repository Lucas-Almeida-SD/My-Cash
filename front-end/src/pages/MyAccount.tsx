import React, { useState } from 'react';
import { ErrorMessage } from '../@types/ErrorMessage';
import { User } from '../@types/User';
import Input from '../components/Input';
import errorNotify from '../helpers/errorNotify';
import formatToBrazilianCurrency from '../helpers/formatToBrazilianCurrency';
import successNotify from '../helpers/successNotify';
import useMyContext from '../hooks/useMyContext';
import requestCreateTransanction from '../services/requestCreateTransaction';
import requestGetUser from '../services/requestGetUser';
import usernameIcon from '../assets/imgs/username.png';
import brazilianCurrencyIcon from '../assets/imgs/brazilian-currency.png';

export default function MyAccount() {
  const {
    token, user, setUser, setIsLoading,
  } = useMyContext();

  const [transactionValue, setTransactionValue] = useState('');
  const [cashInUsername, setCashInUsername] = useState('');

  const executeRequestCreateTransanction = async () => {
    const responseCreateTransaction = await requestCreateTransanction(
      token,
      Number(transactionValue),
      cashInUsername,
    );

    const errorMessage = responseCreateTransaction as ErrorMessage;

    if (errorMessage.message) throw new Error(errorMessage.message);

    successNotify('Pix recalizao com sucesso');
  };

  const executeRequestGetUser = async () => {
    const responseGetUser = await requestGetUser(token);

    const errorMessage = responseGetUser as ErrorMessage;

    if (errorMessage.message) throw new Error(errorMessage.message);

    setUser(responseGetUser as User);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await executeRequestCreateTransanction();
      await executeRequestGetUser();
    } catch (err) {
      errorNotify((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="my-account-page">
      <section className="my-account">
        <h2 className="title">Minha conta</h2>
        <p>{formatToBrazilianCurrency(user.account.balance)}</p>
      </section>
      <section className="new-transaction">
        <form className="new-transaction-form" onSubmit={handleSubmit}>
          <h2 className="title">Pix</h2>
          <Input
            id="transaction-value"
            type="text"
            value={transactionValue}
            setValue={setTransactionValue}
            icon={brazilianCurrencyIcon}
          />
          <Input
            id="cash-in-username"
            type="text"
            value={cashInUsername}
            setValue={setCashInUsername}
            icon={usernameIcon}
          />
          <button
            className="form-btn"
            type="submit"
            disabled={!transactionValue || !cashInUsername}
          >
            Enviar
          </button>
        </form>
      </section>
    </main>
  );
}
