"use client"
import React, { useState, useEffect } from 'react';
import Column from './Column';
import CreateTaskModal from './CreateTaskModal';
import { fetchTasks, updateTask } from '../utils/firestore';

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Array<{ id: string; title: string; description: string; date: string; status: string }>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromFirestore = await fetchTasks();
      setTasks(tasksFromFirestore as any); // Cast to any to bypass type issue, should be fixed to proper type
    };

    getTasks();
  }, []);

  const handleDrop = async (taskId: string, newStatus: string) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      await updateTask(taskId, { ...task, status: newStatus });
      const updatedTasks = tasks.map(t => (t.id === taskId ? { ...t, status: newStatus } : t));
      setTasks(updatedTasks);
    }
  };

  const handleTaskAdded = async () => {
    const tasksFromFirestore = await fetchTasks();
    setTasks(tasksFromFirestore as any); // Cast to any to bypass type issue, should be fixed to proper type
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex justify-between items-center rounded-xl p-6 shadow-md bg-white">
        <h2 className="text-2xl font-semibold">Desktop & Mobile Application</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Create Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <Column
          title="TODO"
          color="purple"
          tasks={tasks.filter(task => task.status === 'todo')}
          onDrop={(taskId, newStatus) => handleDrop(taskId, newStatus)}
        />
        <Column
          title="IN PROGRESS"
          color="yellow"
          tasks={tasks.filter(task => task.status === 'inprogress')}
          onDrop={(taskId, newStatus) => handleDrop(taskId, newStatus)}
        />
        <Column
          title="COMPLETED"
          color="green"
          tasks={tasks.filter(task => task.status === 'completed')}
          onDrop={(taskId, newStatus) => handleDrop(taskId, newStatus)}
        />
      </div>
      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskAdded={handleTaskAdded} />
    </div>
  );
};

export default TaskBoard;
