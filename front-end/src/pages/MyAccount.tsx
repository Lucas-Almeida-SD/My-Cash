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
import { transactionValueValidate } from '../validations/formValidations';

export default function MyAccount() {
  const {
    token, user, setUser, setIsLoading,
  } = useMyContext();

  const [transactionValue, setTransactionValue] = useState('');
  const [cashInUsername, setCashInUsername] = useState('');
  const { account: { balance } } = user;

  const executeRequestCreateTransanction = async () => {
    const responseCreateTransaction = await requestCreateTransanction(
      token,
      Number(transactionValue),
      cashInUsername,
    );

    const errorMessage = responseCreateTransaction as ErrorMessage;

    if (errorMessage.message) throw new Error(errorMessage.message);

    successNotify('Pix realizado com sucesso');
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
      setTransactionValue('');
      setCashInUsername('');
    } catch (err) {
      errorNotify((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const newSetTransactionValue: React.Dispatch<React.SetStateAction<string>> = (
    value: React.SetStateAction<string>,
  ) => {
    const stringValue = String(value);

    if (transactionValueValidate(stringValue)) {
      const numberValue = Number(value);

      setTransactionValue((balance - numberValue < 0) ? String(balance) : stringValue);
    }
  };

  return (
    <main id="my-account-page">
      <section className="my-account">
        <h2 className="title">Minha conta</h2>
        <p>{formatToBrazilianCurrency(balance)}</p>
      </section>
      <section className="new-transaction">
        <form className="new-transaction-form" onSubmit={handleSubmit}>
          <h2 className="title">Pix</h2>
          <Input
            id="transaction-value"
            type="number"
            value={transactionValue}
            setValue={newSetTransactionValue}
            icon={brazilianCurrencyIcon}
            placeholder="100,00"
          />
          <Input
            id="cash-in-username"
            type="text"
            value={cashInUsername}
            setValue={setCashInUsername}
            icon={usernameIcon}
            placeholder="Nome de usuário"
          />
          <button
            className="form-btn"
            type="submit"
            disabled={!transactionValue || !cashInUsername || balance === 0}
          >
            Enviar
          </button>
        </form>
      </section>
    </main>
  );
}
