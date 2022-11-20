import React from 'react';
import { Transaction } from '../@types/Transaction';
import formatToBrazilianCurrency from '../helpers/formatToBrazilianCurrency';
import formatDate from '../helpers/formatDate';
import useMyContext from '../hooks/useMyContext';
import receiveMoneyIcon from '../assets/imgs/receive-money.png';
import spentMoneyIcon from '../assets/imgs/spent-money.png';

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
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => {
          const { debitedAccountId } = transaction;
          const transactionType = (debitedAccountId === user.id) ? 'enviado' : 'recebido';
          const transactionSymbol = (transactionType === 'enviado') ? '-' : '+';

          return (
            <tr key={`transaction-${transaction.id}`}>
              <td>{`Pix ${transactionType}`}</td>
              <td>{`${formatDate(transaction.createdAt)}`}</td>
              <td>{`${transactionSymbol} ${formatToBrazilianCurrency(transaction.value)}`}</td>
              <td>
                <img
                  src={(transactionType === 'recebido') ? receiveMoneyIcon : spentMoneyIcon}
                  alt="Tipo de transferência realizada"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
