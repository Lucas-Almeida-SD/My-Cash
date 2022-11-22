export default () => (Promise.resolve({
  json: () => Promise.resolve({
    id: 1,
    username: 'john_doe',
    accountId: 1,
    account: {
      id: 1,
      balance: 80,
    },
  }),
}) as Promise<Response>);
