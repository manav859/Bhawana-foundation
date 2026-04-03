import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '@/features/api/services/auth.service.js';
import { clearStoredSession, getStoredSession, setStoredSession } from '@/features/auth/auth.storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const storedSession = getStoredSession();
      
      if (!storedSession?.token) {
        setBootstrapping(false);
        return;
      }

      try {
        const adminData = await authService.getCurrentAdmin();
        const verifiedSession = { token: storedSession.token, admin: adminData };
        setSession(verifiedSession);
        setStoredSession(verifiedSession);
      } catch (error) {
        console.warn('Session restoration failed:', error.message);
        clearStoredSession();
        setSession(null);
      } finally {
        setBootstrapping(false);
      }
    }

    restoreSession();
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
