const { REACT_APP_BASE_URL } = process.env;

export default async function requestGetUser(token: string) {
  try {
    const response = await fetch(
      `${REACT_APP_BASE_URL}/users/me`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const data = await response.json();

    return data;
  } catch (err) {
    return { message: (err as Error).message };
  }
}
