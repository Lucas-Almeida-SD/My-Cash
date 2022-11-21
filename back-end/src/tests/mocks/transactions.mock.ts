export const cashOutUserCredentials = {  // user has a balance of R$120,00
  username: 'joao_santos',
  password: '123Senha'
};

export const cashInUserCredentials = { // user has a balance of R$80,00
  username: 'john_doe',
  password: 'Senha123'
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