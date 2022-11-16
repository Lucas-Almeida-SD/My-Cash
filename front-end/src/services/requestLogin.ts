import { ErrorMessage } from '../@types/ErrorMessage';
import { ResponseLogin } from '../@types/Response';

const { REACT_APP_BASE_URL } = process.env;

export default async function requestLogin(
  username: string,
  password: string,
): Promise<ResponseLogin> {
  try {
    const response = await fetch(
      `${REACT_APP_BASE_URL}/users/login`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      },
    );

    const data: ResponseLogin = await response.json();

    return data;
  } catch (err) {
    return { message: (err as Error).message } as ErrorMessage;
  }
}
