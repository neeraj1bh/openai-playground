import { useState, useEffect, useMemo, useContext, createContext, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

const defaultContext = {
  token: '',
  addToken: () => {},
  clearToken: () => {},
};

const AuthContext = createContext<{
  token: string;
  addToken: (token: string) => void;
  clearToken: () => void;
}>(defaultContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('open-ai-token') as string;
    if (token) {
      setToken(token);
    }
  }, []);

  const addToken = (token: string) => {
    setToken(token);
    sessionStorage.setItem('open-ai-token', token);

    toast.success(`Token added successfully`);
  };

  const clearToken = () => {
    setToken('');
    sessionStorage.removeItem('open-ai-token');
  };

  const value = useMemo(() => ({ token, addToken, clearToken }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
