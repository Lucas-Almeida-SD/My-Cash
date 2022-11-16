import { ErrorMessage } from '../@types/ErrorMessage';
import { ResponseGetUser } from '../@types/Response';

const { REACT_APP_BASE_URL } = process.env;

export default async function requestGetUser(token: string): Promise<ResponseGetUser> {
  try {
    const response = await fetch(
      `${REACT_APP_BASE_URL}/users/me`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const data: ResponseGetUser = await response.json();

    return data;
  } catch (err) {
    return { message: (err as Error).message } as ErrorMessage;
  }
}
