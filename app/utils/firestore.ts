import { db } from './firebase.config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const fetchTasks = async () => {
  const tasksCollection = collection(db, 'tasks');
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as { title?: string; description?: string; date?: string; status?: string })
  }));
};

// Add a new task
export const addTask = async (task: any) => {
  const tasksCollection = collection(db, 'tasks');
  return await addDoc(tasksCollection, task);
};

// Update an existing task
export const updateTask = async (id: string, updatedTask: any) => {
  const taskDoc = doc(db, 'tasks', id);
  return await updateDoc(taskDoc, updatedTask);
};

// Delete a task
export const deleteTask = async (id: string) => {
  const taskDoc = doc(db, 'tasks', id);
  return await deleteDoc(taskDoc);
};
