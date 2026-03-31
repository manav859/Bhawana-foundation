import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '@/features/api/services/auth.service.js';
import { clearStoredSession, getStoredSession, setStoredSession } from '@/features/auth/auth.storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    const storedSession = getStoredSession();
    setSession(storedSession);
    setBootstrapping(false);
  }, []);

  const value = useMemo(
    () => ({
      admin: session?.admin || null,
      token: session?.token || null,
      isAuthenticated: Boolean(session?.token),
      bootstrapping,
      async login(credentials) {
        const nextSession = await authService.login(credentials);
        setStoredSession(nextSession);
        setSession(nextSession);
        return nextSession;
      },
      async logout() {
        try {
          await authService.logout();
        } finally {
          clearStoredSession();
          setSession(null);
        }
      },
    }),
    [session, bootstrapping],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}