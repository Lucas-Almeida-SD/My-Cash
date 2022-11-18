import React from 'react';
import { Transaction } from '../@types/Transaction';
import formatToBrazilianCurrency from '../helpers/formatToBrazilianCurrency';
import formatDate from '../helpers/formatDate';
import useMyContext from '../hooks/useMyContext';

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: Props) {
  const { user } = useMyContext();

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Data</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={`transaction-${transaction.id}`}>
            <td>{`Pix ${(transaction.debitedAccountId === user.id) ? 'enviado' : 'recebido'}`}</td>
            <td>{`${formatDate(transaction.createdAt)}`}</td>
            <td>{formatToBrazilianCurrency(transaction.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
