"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Column from './Column';
import CreateTaskModal from './CreateTaskModal';
import { fetchTasks, updateTask, Task } from '../utils/firestore';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../utils/firebase.config';

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAndSetTasks = useCallback(async () => {
    try {
      const tasksFromFirestore = await fetchTasks();
      console.log("Fetched tasks:", tasksFromFirestore);
      setTasks(tasksFromFirestore);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetTasks();

    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const updatedTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, 'id'>)
      }));
      console.log("Updated tasks from snapshot:", updatedTasks);
      setTasks(updatedTasks);
    });

    return () => unsubscribe();
  }, [fetchAndSetTasks]);

  const handleDrop = useCallback(async (taskId: string, newStatus: string) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      const status = newStatus === 'IN PROGRESS' ? 'In Progress' : newStatus.charAt(0).toUpperCase() + newStatus.slice(1).toLowerCase();
      await updateTask(taskId, { status: status });
    }
  }, [tasks]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  console.log("Tasks state:", tasks);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center rounded-xl p-6 shadow-md bg-white mb-6">
        <h2 className="text-2xl font-semibold">Desktop & Mobile Application</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <Column
          title="TODO"
          color="purple"
          tasks={tasks.filter(task => task.status.toLowerCase() === 'todo')}
          onDrop={handleDrop}
        />
        <Column
          title="IN PROGRESS"
          color="yellow"
          tasks={tasks.filter(task => task.status.toLowerCase() === 'in progress')}
          onDrop={handleDrop}
        />
        <Column
          title="COMPLETED"
          color="green"
          tasks={tasks.filter(task => task.status.toLowerCase() === 'completed')}
          onDrop={handleDrop}
        />
      </div>
      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskAdded={fetchAndSetTasks} />
    </section>
  );
};

export default TaskBoard;