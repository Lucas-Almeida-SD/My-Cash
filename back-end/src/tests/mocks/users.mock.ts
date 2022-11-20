// Login
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

// Create a new user
export const successUsersCreateRequest = {
  username: 'new_user',
  password: 'Password1'
}

export const nonExistentUsernameUsersCreateRequest = {
  password: 'Password1'
}

export const usernameLessThanThreeCharactersUsersCreateRequest = {
  username: 'ne',
  password: 'Password1'
}

export const nonExistentPasswordUsersCreateRequest = {
  username: 'new_user',
}

export const passwordLessThanEightCharactersUsersCreateRequest = {
  username: 'new_user',
  password: 'Pass123'
}

export const passwordWithoutAtLeastOneUppercaseLetterUsersCreateRequest = {
  username: 'new_user',
  password: 'password1'
}

export const passwordWithoutAtLeastOneNumberUsersCreateRequest = {
  username: 'new_user',
  password: 'passwordd'
}

export const userAlreadyExistsUsersCreateRequest = {
  username: 'john_doe',
  password: 'Password1'
}