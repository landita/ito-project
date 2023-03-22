import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  query,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Applications } from '../interfaces';

const collectionName = 'Applications';

export const getApplications = async () => {
  try {
    const response = await getDocs(query(collection(db, collectionName)));
    return response.docs.map(
      (doc) => <Applications>{ ...doc.data(), id: doc.id },
    );
  } catch (error) {
    throw new Error('cannot load data');
  }
};

export const addNewApplication = async (model: Applications) => {
  try {
    await addDoc(collection(db, collectionName), model);
  } catch (error) {
    throw new Error('bad request');
  }
};

export const deleteApplication = async (id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    return Promise.reject(new Error('bad request'));
  }
};
