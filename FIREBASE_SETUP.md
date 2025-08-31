# Frontend Firebase Authentication Setup

This guide explains how to set up Firebase authentication for the frontend web app.

## Prerequisites

1. Firebase project created at [Firebase Console](https://console.firebase.google.com/)
2. Firebase Web App configuration

## Setup Steps

### 1. Install Firebase Dependencies

```bash
npm install firebase
# or
pnpm add firebase
```

### 2. Environment Variables

Add these to your `.env.local` file:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

### 3. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Authentication → Sign-in method
4. Enable Google sign-in provider
5. Add your domain to authorized domains

### 4. Usage

The Firebase authentication is now integrated with your backend:

```tsx
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

const MyComponent = () => {
  const { signInWithGoogle, user, loading, error } = useFirebaseAuth();
  
  // Use the hook methods
};
```

## How It Works

1. **Frontend**: User clicks "Sign in with Google"
2. **Firebase**: Handles OAuth flow and returns ID token
3. **Backend**: Receives token via `/firebase/verify` endpoint
4. **Verification**: Backend verifies token with Firebase Admin SDK
5. **User Creation**: Backend creates/updates user and returns JWT tokens
6. **Storage**: Frontend stores JWT tokens for API calls

## Components

- `FirebaseAuthService`: Handles Firebase authentication
- `useFirebaseAuth`: Custom hook for Firebase auth state
- `FirebaseLogin`: Sample login component
- `AuthApiService.verifyFirebaseToken()`: Backend integration

## Security

- Firebase ID tokens are short-lived
- Backend verifies every token
- JWT tokens are used for API authentication
- No sensitive Firebase credentials in frontend

## Mobile App

The mobile app continues to use the existing Google OAuth flow unchanged.
