import { ErrorMessage } from '../@types/ErrorMessage';
import { ResponseCreate } from '../@types/Response';

const { REACT_APP_BASE_URL } = process.env;

export default async function requestCreateUser(
  username: string,
  password: string,
): Promise<ResponseCreate> {
  try {
    const response = await fetch(
      `${REACT_APP_BASE_URL}/users`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      },
    );

    if (response.ok) return {};

    const data: ErrorMessage = await response.json();
    return data;
  } catch (err) {
    return { message: (err as Error).message } as ErrorMessage;
  }
}
