"use client"
import React, { useState } from 'react';
import { addTask } from '../utils/firestore';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('todo');

  const handleCreateTask = async () => {
    if (title && description && date) {
      await addTask({ title, description, date, status });
      onTaskAdded();
      onClose();
      setTitle('');
      setDescription('');
      setDate('');
      setStatus('todo');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Create Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="todo">ToDo</option>
              <option value="inprogress">InProgress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={handleCreateTask}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Create Task
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-4 hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTaskModal;