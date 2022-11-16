import React, { createContext, useMemo, useState } from 'react';

interface User {
  id: number;
  username: string;
  accountId: number;
  account: {
    id: number;
    balance: number;
  }
}

interface ContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const MyContext = createContext({} as ContextProps);

interface ContextProviderProps {
  children: React.ReactNode;
}

export function MyContextProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState({} as User);
  const [token, setToken] = useState('');

  const value = useMemo(() => ({
    user, setUser, token, setToken,
  }), [user, token]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}
