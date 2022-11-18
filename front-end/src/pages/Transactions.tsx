import React, { FormEventHandler, useEffect, useState } from 'react';
import { ErrorMessage } from '../@types/ErrorMessage';
import { Transaction } from '../@types/Transaction';
import TransactionTable from '../components/TransactionTable';
import errorNotify from '../helpers/errorNotify';
import useMyContext from '../hooks/useMyContext';
import requestGetTransactions from '../services/requestGetTransactions';
import noTransactionIcon from '../assets/imgs/no-transactions.gif';

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
          <button type="submit" disabled={isLoading}>Buscar</button>
        </form>
      </section>
      {(transactions.length)
        ? (
          <section className="transaction-table-section">
            <TransactionTable transactions={transactions} />
          </section>
        ) : (
          <div className="no-transactions-container">
            <h3>Transações não encontradas...</h3>
            <img src={noTransactionIcon} alt="" />
          </div>
        )}
    </main>
  );
}
