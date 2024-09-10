"use client"
import React, { useState, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { updateTask, deleteTask, Task } from '../utils/firestore';

const TaskCard: React.FC<Task> = ({ id, title, description, date, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleUpdate = useCallback(async () => {
    await updateTask(id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  }, [id, editedTitle, editedDescription]);

  const handleDelete = useCallback(async () => {
    await deleteTask(id);
  }, [id]);

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg border-2 shadow-sm mb-4 ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleUpdate}
            className="text-lg font-semibold border-b-2 w-full focus:outline-none focus:border-purple-500"
          />
        ) : (
          <h4
            className="text-lg font-semibold"
            onDoubleClick={() => setIsEditing(true)}
          >
            {editedTitle}
          </h4>
        )}
        <button
          className="text-xs bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition-colors"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onBlur={handleUpdate}
          className="text-gray-600 border-b-2 w-full focus:outline-none focus:border-purple-500"
        />
      ) : (
        <p className="text-gray-600" onDoubleClick={() => setIsEditing(true)}>
          {editedDescription}
        </p>
      )}
      <div className="text-gray-400 text-sm mt-2 flex items-center">
        <span>{date}</span>
      </div>
    </div>
  );
};

export default React.memo(TaskCard);