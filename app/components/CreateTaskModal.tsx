"use client"
import React, { useState } from 'react';
import { addTask } from '../utils/firestore';

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
      onTaskAdded(); // Notify parent to refresh tasks
      onClose(); // Close modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="todo">ToDo</option>
          <option value="inprogress">InProgress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={handleCreateTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Create Task
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
