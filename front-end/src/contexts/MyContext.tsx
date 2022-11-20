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
  setUser: React.Dispatch<React.SetStateAction<User>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyContext = createContext({} as ContextProps);

interface ContextProviderProps {
  children: React.ReactNode;
}

export function MyContextProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState({} as User);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => ({
    user, setUser, token, setToken, isLoading, setIsLoading,
  }), [user, token, isLoading]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}
