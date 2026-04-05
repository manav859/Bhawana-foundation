import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { buyerAuthService } from '@/features/api/services/buyer-auth.service.js';
import {
  getStoredBuyerSession,
  storeBuyerSession,
  clearBuyerSession,
} from './buyer-auth.storage.js';

const BuyerAuthContext = createContext(null);

export function BuyerAuthProvider({ children }) {
  const [buyer, setBuyer] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getStoredBuyerSession();
    if (session?.token && session?.buyer) {
      setToken(session.token);
      setBuyer(session.buyer);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await buyerAuthService.login(credentials);
    const { buyer: b, token: t } = res.data.data;
    setBuyer(b);
    setToken(t);
    storeBuyerSession({ buyer: b, token: t });
    return b;
  }, []);

  const register = useCallback(async (data) => {
    const res = await buyerAuthService.register(data);
    const { buyer: b, token: t } = res.data.data;
    setBuyer(b);
    setToken(t);
    storeBuyerSession({ buyer: b, token: t });
    return b;
  }, []);

  const logout = useCallback(() => {
    setBuyer(null);
    setToken(null);
    clearBuyerSession();
  }, []);

  const updateProfile = useCallback(async (data) => {
    const res = await buyerAuthService.updateProfile(data);
    const b = res.data.data;
    setBuyer(b);
    const session = getStoredBuyerSession();
    storeBuyerSession({ ...session, buyer: b });
    return b;
  }, []);

  return (
    <BuyerAuthContext.Provider
      value={{
        buyer,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </BuyerAuthContext.Provider>
  );
}

export function useBuyerAuth() {
  const ctx = useContext(BuyerAuthContext);
  if (!ctx) throw new Error('useBuyerAuth must be used within BuyerAuthProvider');
  return ctx;
}
