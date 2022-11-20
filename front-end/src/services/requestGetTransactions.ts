import { ErrorMessage } from '../@types/ErrorMessage';
import { Transaction } from '../@types/Transaction';

const { REACT_APP_BASE_URL } = process.env;

type Body = {
  cashType?: string,
  createdAt?: string,
};

export default async function requestGetTransactions(
  token: string,
  cashType: string,
  createdAt: string,
): Promise<Transaction[] | ErrorMessage> {
  const body:Body = {};
  if (cashType) body.cashType = cashType;
  if (createdAt) body.createdAt = createdAt;

  try {
    const response = await fetch(
      `${REACT_APP_BASE_URL}/transactions/me`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    return data;
  } catch (err) {
    return { message: (err as Error).message };
  }
}
