import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_APIKEY as string,
  authDomain: env.VITE_AUTHDOMAIN as string,
  projectId: env.VITE_PROJECTID as string,
  storageBucket: env.VITE_STORAGEBUCKET as string,
  messagingSenderId: env.VITE_MESSAGINGSENDERID as string,
  appId: env.VITE_APPID as string,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
