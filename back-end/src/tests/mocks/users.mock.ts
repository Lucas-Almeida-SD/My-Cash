export const successUsersLoginRequest = {
  username: 'john_doe',
  password: 'Senha123'
}

export const nonExistentUsernameUsersLoginRequest = {
  password: 'Senha123'
}

export const nonExistentPasswordUsersLoginRequest = {
  username: 'john_doe',
}

export const notFoundUsernameUsersLoginRequest = {
  username: 'not-found',
  password: 'Senha123'
}

export const incorrectPasswordUsersLoginRequest = {
  username: 'john_doe',
  password: 'IncorrectPassword'
}