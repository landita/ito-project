import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserSession } from '../interfaces';

const collectionName = 'Users';
const auth = getAuth();

export const logIn = async (emailAddress: string, password: string) => {
  try {
    const response = await getDocs(
      query(collection(db, collectionName), where('email', '==', emailAddress)),
    );
    const { username, email, role } = <UserSession>{
      ...response.docs[0].data(),
    };
    await signInWithEmailAndPassword(auth, emailAddress, password);
    return { username, email, role };
  } catch (error) {
    throw new Error('bad request');
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('request cannot proceed');
  }
};
