const STORAGE_KEY = 'bhawna_buyer_session';

export function getStoredBuyerSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeBuyerSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearBuyerSession() {
  localStorage.removeItem(STORAGE_KEY);
}
