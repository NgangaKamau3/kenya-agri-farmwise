# Authentication Helper Functions

This file contains utility functions for authentication-related operations.

## Available Functions

### `getAuthenticatedUser()`
Get the currently authenticated user from Supabase.

```typescript
import { getAuthenticatedUser } from '@/lib/auth';

const user = await getAuthenticatedUser();
if (user) {
  console.log('User ID:', user.id);
  console.log('Email:', user.email);
}
```

### `requireAuth()`
Redirect to login if user is not authenticated. Use in protected routes.

```typescript
import { requireAuth } from '@/lib/auth';

// In a component
useEffect(() => {
  requireAuth();
}, []);
```

### `signOut()`
Sign out the current user and redirect to home page.

```typescript
import { signOut } from '@/lib/auth';

const handleLogout = async () => {
  await signOut();
};
```
