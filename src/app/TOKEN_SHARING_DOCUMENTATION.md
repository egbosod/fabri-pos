# Login Token Sharing System

## Overview
When a user in Flow C clicks "Lock POS" (Lås POS), the POS prototype passes the active user's information to the Logon prototype via URL parameters and localStorage.

## How It Works

### 1. **POS Prototype (Sender)**

When "Lock POS" is clicked in Flow C:

```typescript
// Store token in localStorage
setLoginToken(currentUser);

// Navigate with user context as URL parameter
navigateToPrototype('loginLockUser', {
  userContext: {
    username: currentUser,
    metadata: {
      action: 'lockPOS',
      timestamp: Date.now(),
      flow: 'C'
    }
  }
});
```

The URL will look like this:
```
https://www.figma.com/make/...?userContext=%7B%22username%22%3A%22Erik%20Wheeler%22%2C%22metadata%22%3A%7B%22action%22%3A%22lockPOS%22%2C%22timestamp%22%3A1710691200000%2C%22flow%22%3A%22C%22%7D%7D
```

### 2. **localStorage Token**

The token is stored with the key: `pos_active_login_token`

Token structure:
```typescript
{
  username: string;        // "Erik Wheeler"
  timestamp: number;       // When token was created
  expiresAt: number;       // Expiry timestamp (30 minutes)
}
```

### 3. **Logon Prototype (Receiver)**

To receive and use the token in your Logon prototype:

#### **Option A: Read from URL (Recommended)**

```typescript
// On mount, check URL for userContext parameter
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const userContextParam = params.get('userContext');
  
  if (userContextParam) {
    try {
      const userContext = JSON.parse(decodeURIComponent(userContextParam));
      const { username, metadata } = userContext;
      
      if (metadata.action === 'lockPOS') {
        // User came from POS Lock screen
        // Pre-select this username in your UI
        setSelectedUser(username);
      }
    } catch (error) {
      console.warn('Failed to parse user context:', error);
    }
  }
}, []);
```

#### **Option B: Read from localStorage (Fallback)**

```typescript
import { getLoginToken } from './utils/loginToken'; // Copy the file

useEffect(() => {
  const token = getLoginToken();
  
  if (token) {
    // Active login token exists
    setSelectedUser(token.username);
    
    // Optional: Clear token after reading
    // clearLoginToken();
  }
}, []);
```

## Implementation Example for Logon Prototype

```typescript
import { useState, useEffect } from 'react';

function LoginScreen() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [lockedByPOS, setLockedByPOS] = useState(false);

  useEffect(() => {
    // Check if navigated from POS Lock screen
    const params = new URLSearchParams(window.location.search);
    const userContextParam = params.get('userContext');
    
    if (userContextParam) {
      try {
        const userContext = JSON.parse(decodeURIComponent(userContextParam));
        
        if (userContext.metadata?.action === 'lockPOS') {
          // User locked the POS - pre-select them
          setSelectedUser(userContext.username);
          setLockedByPOS(true);
          
          // Optional: Show a message like "POS locked by {username}"
          console.log(`POS was locked by ${userContext.username}`);
        }
      } catch (error) {
        console.warn('Failed to parse user context:', error);
      }
    }
  }, []);

  return (
    <div>
      {lockedByPOS && (
        <div className="notification">
          POS locked by {selectedUser}
        </div>
      )}
      
      <UserSelector 
        preSelectedUser={selectedUser}
        // ... rest of props
      />
    </div>
  );
}
```

## URL Parameter Format

The `userContext` parameter is URL-encoded JSON:

**Decoded structure:**
```json
{
  "username": "Erik Wheeler",
  "metadata": {
    "action": "lockPOS",
    "timestamp": 1710691200000,
    "flow": "C"
  }
}
```

**Encoded in URL:**
```
?userContext=%7B%22username%22%3A%22Erik%20Wheeler%22%2C...
```

## Token Utility Functions

Copy these files to your Logon prototype:

### `/utils/loginToken.ts` 
Already created in this prototype - contains:
- `setLoginToken(username)` - Store token
- `getLoginToken()` - Retrieve token if valid
- `clearLoginToken()` - Remove token
- `hasActiveToken()` - Check if token exists

## Security Considerations

1. **Token Expiry**: Tokens expire after 30 minutes
2. **Client-side only**: This is a prototype simulation, not production auth
3. **localStorage**: Shared between prototypes on same domain
4. **URL Cleanup**: Consider clearing URL params after reading to avoid re-processing

## Testing

1. **In POS prototype (Flow C):**
   - Click profile badge
   - Expand "Bytt bruker"
   - Expand current user
   - Click "Lås POS" button

2. **In Logon prototype:**
   - Check URL for `userContext` parameter
   - Check if user is pre-selected
   - Verify localStorage contains token

## Debugging

Add this to console in Logon prototype:
```typescript
// Check URL params
console.log('URL params:', window.location.search);

// Check localStorage
console.log('Stored token:', localStorage.getItem('pos_active_login_token'));

// Check parsed context
const params = new URLSearchParams(window.location.search);
const ctx = params.get('userContext');
if (ctx) {
  console.log('User context:', JSON.parse(decodeURIComponent(ctx)));
}
```
