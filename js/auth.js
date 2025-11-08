// Simple client-side authentication helper (DEMO ONLY)
// Exposes a global `Auth` object with methods: login, logout, isLoggedIn, requireAuth, getUsername
(function (global) {
  const STORAGE_KEY = 'hpsc_session';

  // Demo credentials. DO NOT use this in production.
  // Support multiple demo users for local testing.
  const DEMO_USERS = {
    admin: 'password123',
    // Chimara director (can be granted Chimara access on global login)
    red: 'chimara1976'
  };

  function saveSession(username) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, created: Date.now() }));
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function isLoggedIn() {
    return !!getSession();
  }

  function getUsername() {
    const s = getSession();
    return s && s.username ? s.username : '';
  }

  // login returns true on success, false otherwise
  function login(username, password) {
    if (!username || !password) return false;
    // Demo check (in real apps, validate on the server)
    const expected = DEMO_USERS[username.toLowerCase()];
    if (expected && password === expected) {
      saveSession(username);
      // If director logs in (red), also set Chimara director access token so they don't
      // need to sign in again on the Chimara page. This is a client-side convenience only.
      if (username.toLowerCase() === 'red') {
        try {
          localStorage.setItem('chimara_access', JSON.stringify({ username: 'red', created: Date.now() }));
        } catch (e) { /* ignore */ }
      }
      return true;
    }
    return false;
  }

  function logout() {
    clearSession();
    try { localStorage.removeItem('chimara_access'); } catch (e) { /* ignore */ }
  }

  // If not logged in, redirect to `to` (string URL)
  function requireAuth(to) {
    if (!isLoggedIn()) {
      location.href = to || 'login.html';
    }
  }

  // Expose globally
  global.Auth = { login, logout, isLoggedIn, requireAuth, getUsername };
})(window);
