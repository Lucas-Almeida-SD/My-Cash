import React, { FormEventHandler, useEffect, useState } from 'react';
import { ErrorMessage } from '../@types/ErrorMessage';
import { Transaction } from '../@types/Transaction';
import TransactionTable from '../components/TransactionTable';
import errorNotify from '../helpers/errorNotify';
import useMyContext from '../hooks/useMyContext';
import requestGetTransactions from '../services/requestGetTransactions';

export default function Transactions() {
  const {
    token, isLoading, setIsLoading,
  } = useMyContext();
  const [cashType, setCashType] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const executeRequestGetTransactions = async () => {
    setIsLoading(true);

    const responseGetTransactions = await requestGetTransactions(token, cashType, createdAt);
    const errorMessage = responseGetTransactions as ErrorMessage;

    if (errorMessage.message) errorNotify(errorMessage.message);

    setTransactions(responseGetTransactions as Transaction[]);
    setIsLoading(false);
  };

  useEffect(() => {
    executeRequestGetTransactions();
  }, []);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    executeRequestGetTransactions();
  };

  return (
    <main id="transactions-page">
      <h2 className="title">Transações</h2>
      <section className="filters-section">
        <form className="filters-form" onSubmit={handleSubmit}>
          <select
            className="cash-type"
            value={cashType}
            onChange={({ target }) => setCashType(target.value)}
          >
            <option value="">Todas</option>
            <option value="in">Entradas</option>
            <option value="out">Saídas</option>
          </select>
          <input
            className="created-at"
            type="date"
            value={createdAt}
            onChange={({ target }) => setCreatedAt(target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
        {isLoading && <h2>Loading</h2>}
      </section>
      <section className="transaction-table-section">
        {(transactions.length)
          ? <TransactionTable transactions={transactions} />
          : <h2>Nenhuma Transação</h2>}
      </section>
    </main>
  );
}
