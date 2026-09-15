/**
 * Login Token Management
 * 
 * Simulates an active login token that can be shared between prototypes.
 * When a user locks the POS, their username is stored and passed to the Logon prototype.
 */

const TOKEN_STORAGE_KEY = 'pos_active_login_token';
const TOKEN_EXPIRY_KEY = 'pos_token_expiry';
const TOKEN_LIFETIME_MS = 30 * 60 * 1000; // 30 minutes

export interface LoginToken {
  username: string;
  timestamp: number;
  expiresAt: number;
}

/**
 * Store an active login token for the current user
 */
export function setLoginToken(username: string): void {
  const now = Date.now();
  const token: LoginToken = {
    username,
    timestamp: now,
    expiresAt: now + TOKEN_LIFETIME_MS,
  };
  
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  } catch (error) {
    console.warn('Failed to store login token:', error);
  }
}

/**
 * Retrieve the active login token if it exists and hasn't expired
 */
export function getLoginToken(): LoginToken | null {
  try {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) return null;
    
    const token: LoginToken = JSON.parse(storedToken);
    
    // Check if token has expired
    if (Date.now() > token.expiresAt) {
      clearLoginToken();
      return null;
    }
    
    return token;
  } catch (error) {
    console.warn('Failed to retrieve login token:', error);
    return null;
  }
}

/**
 * Clear the active login token
 */
export function clearLoginToken(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  } catch (error) {
    console.warn('Failed to clear login token:', error);
  }
}

/**
 * Check if there is an active login token
 */
export function hasActiveToken(): boolean {
  return getLoginToken() !== null;
}

/**
 * Encode user data for URL passing (base64)
 */
export function encodeUserData(username: string): string {
  try {
    const data = { username, timestamp: Date.now() };
    return btoa(JSON.stringify(data));
  } catch {
    return '';
  }
}

/**
 * Decode user data from URL parameter
 */
export function decodeUserData(encoded: string): { username: string; timestamp: number } | null {
  try {
    const decoded = atob(encoded);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}
