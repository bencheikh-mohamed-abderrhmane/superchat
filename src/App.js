import React, { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import { auth, provider, signInWithPopup } from './firebase';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [user, setUser] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setIsSigningIn(true); // Désactive le bouton
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code !== 'auth/cancelled-popup-request') {
        console.error(error);
      }
    } finally {
      setIsSigningIn(false); // Réactive le bouton
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 Abdou Chat</h1>
        {!user && (
          <button onClick={signInWithGoogle} className="sign-in" disabled={isSigningIn}>
            {isSigningIn ? 'Signing In...' : 'Sign In with Google'}
          </button>
        )}
        {user && <button onClick={signOut} className="sign-out">Sign Out</button>}
      </header>
      <main>
        <ErrorBoundary>
          {user ? <ChatRoom /> : <p>You need to sign in to access the chat room.</p>}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
