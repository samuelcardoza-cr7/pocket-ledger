import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ClerkProvider, useAuth, useUser } from '@clerk/react';
import './styles.css';
import './theme.css';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkApp() {
  const { isLoaded, isSignedIn, getToken, signOut } = useAuth();
  const { user } = useUser();
  const identity = user ? {
    id: user.id,
    name: user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Account',
    email: user.primaryEmailAddress?.emailAddress || '',
  } : null;
  return <App clerkEnabled clerkReady={isLoaded} isSignedIn={isSignedIn} clerkUser={identity} getToken={getToken} signOut={signOut} />;
}

function Root() {
  return publishableKey
    ? <ClerkProvider publishableKey={publishableKey}><ClerkApp /></ClerkProvider>
    : <App clerkEnabled={false} clerkReady />;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><Root /></React.StrictMode>);
