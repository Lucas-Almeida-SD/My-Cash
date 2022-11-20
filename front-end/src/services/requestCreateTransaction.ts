import { ErrorMessage } from '../@types/ErrorMessage';
import { ResponseCreate } from '../@types/Response';

const { REACT_APP_BASE_URL } = process.env;

export default async function requestCreateTransanction(
  token: string,
  transactionValue: number,
  cashInUsername: string,
): Promise<ResponseCreate> {
  try {
    const response = await fetch(
      `${REACT_APP_BASE_URL}/transactions`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ value: transactionValue, cashInUsername }),
      },
    );

    if (response.ok) return {};

    const data: ErrorMessage = await response.json();
    return data;
  } catch (err) {
    return { message: (err as Error).message } as ErrorMessage;
  }
}
