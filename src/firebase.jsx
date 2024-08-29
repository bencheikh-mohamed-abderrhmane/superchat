import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCPHa9gIyBvg72qYowdpY5yaQt2EMAg2JY",
    authDomain: "superchat-4aad1.firebaseapp.com",
    projectId: "superchat-4aad1",
    storageBucket: "superchat-4aad1.appspot.com",
    messagingSenderId: "928350424745",
    appId: "1:928350424745:web:d648ca8e9e491a6e1ce3b8",
    measurementId: "G-CPR5B88ZF2"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Configurer Auth et Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signInWithPopup };
