export const firstUserCredentials = { // user has a balance of R$80,00
  username: 'john_doe',
  password: 'Senha123'
};

export const secondUserCredentialsa = {  // user has a balance of R$120,00
  username: 'joao_santos',
  password: '123Senha'
};

// Create new transaction
export const nonExistentValueTransactionsCreateRequest = {
  cashInUsername: 'john_doe',
}

export const valueLessThanZeroTransactionsCreateRequest = {
  value: -1,
  cashInUsername: 'john_doe',
}

export const valueHavingMoreThanThreeDecimalPlaces = {
  value: 10.123,
  cashInUsername: 'john_doe',
}

export const nonExistentCashInUsernameTransactionsCreateRequest = {
  value: 10,
}

export const userNotFoundTransactionsCreateRequest = {
  value: 10,
  cashInUsername: 'user-not-found',
}

export const transactionForYourselfTransactionsCreateRequest = {
  value: 10,
  cashInUsername: 'joao_santos',
}

export const valueGreaterThanBalanceTransactionsCreateRequest = {
  value: 121,
  cashInUsername: 'john_doe',
}

export const successTransactionsCreateRequest = {
  value: 10,
  cashInUsername: 'john_doe',
}

export const newCashOutUserBalance = 110

export const newCashInUserBalance = 90

// Get my transactions
export const successWithoutFiltersGetMyTransactionsRequest = [
  {
    id: 3,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 15.65,
    createdAt: '2022-10-12',
  },
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 24.35,
    createdAt: '2022-10-10',
  },
  {
    id: 2,
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 20,
    createdAt: '2022-10-10',
  },
]

export const successCashOutFilterGetMyTransactionsRequest = [
  {
    id: 3,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 15.65,
    createdAt: '2022-10-12',
  },
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 24.35,
    createdAt: '2022-10-10',
  },
]

export const successCashInFilterGetMyTransactionsRequest = [
  {
    id: 2,
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 20,
    createdAt: '2022-10-10',
  },
]

export const successCreatedAtFilterGetMyTransactionsRequest = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 24.35,
    createdAt: '2022-10-10',
  },
  {
    id: 2,
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 20,
    createdAt: '2022-10-10',
  },
]

export const successAllFiltersGetMyTransactionsRequest = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 24.35,
    createdAt: '2022-10-10',
  },
]