import React, { useState } from 'react';
import { ErrorMessage } from '../@types/ErrorMessage';
import { User } from '../@types/User';
import errorNotify from '../helpers/errorNotify';
import successNotify from '../helpers/successNotify';
import useMyContext from '../hooks/useMyContext';
import requestCreateTransanction from '../services/requestCreateTransaction';
import requestGetUser from '../services/requestGetUser';

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
    <main>
      <section>
        <h2>Minha conta</h2>
        <p>{user.account.balance}</p>
      </section>
      <section>
        <h2>Pix</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={transactionValue}
            onChange={({ target }) => setTransactionValue(target.value)}
          />
          <input
            type="text"
            value={cashInUsername}
            onChange={({ target }) => setCashInUsername(target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>
  );
}
