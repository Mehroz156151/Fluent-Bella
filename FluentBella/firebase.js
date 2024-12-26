// firebase.js

// import { initializeApp } from 'firebase/app'; // Firebase Web SDK
// import { getAuth } from 'firebase/auth'; // Firebase Authentication
// import { firebaseConfig } from './firebaseConfig'; // Your Firebase config


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Exporting Firebase Auth
// const auth = getAuth(app);

// export { auth };
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };

