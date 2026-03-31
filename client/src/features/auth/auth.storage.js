const STORAGE_KEY = 'bhawna.admin.session';

export function getStoredSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function setStoredSession(session) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}