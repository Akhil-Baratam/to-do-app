import { db } from './firebase.config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, DocumentData } from 'firebase/firestore';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const tasksCollection = collection(db, 'tasks');
  const snapshot = await getDocs(tasksCollection);
  console.log("Fetched tasks:", snapshot.docs.map(doc => doc.data())); // Add this line for debugging
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, 'id'>)
  }));
};


export const addTask = async (task: Omit<Task, 'id'>): Promise<void> => {
  const tasksCollection = collection(db, 'tasks');
  await addDoc(tasksCollection, task);
};

export const updateTask = async (id: string, updatedTask: Partial<Omit<Task, 'id'>>): Promise<void> => {
  const taskDoc = doc(db, 'tasks', id);
  await updateDoc(taskDoc, updatedTask);
};

export const deleteTask = async (id: string): Promise<void> => {
  const taskDoc = doc(db, 'tasks', id);
  await deleteDoc(taskDoc);
};