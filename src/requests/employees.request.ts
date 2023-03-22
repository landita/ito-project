import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Employee } from '../interfaces';

const collectionName = 'Employees';

export const getEmployees = async () => {
  try {
    const response = await getDocs(query(collection(db, collectionName)));
    return response.docs.map((doc) => <Employee>{ ...doc.data(), id: doc.id });
  } catch (error) {
    throw new Error('cannot load data');
  }
};
