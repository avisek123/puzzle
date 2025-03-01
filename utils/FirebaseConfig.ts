import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbFkFNrPEaiqmEr9fAH3dYjwrkAK0CBgA",
  authDomain: "puzzly-ad477.firebaseapp.com",
  projectId: "puzzly-ad477",
  storageBucket: "puzzly-ad477.firebasestorage.app",
  messagingSenderId: "992047663549",
  appId: "1:992047663549:web:4fe966c5f1b69b8cecaad4",
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);
