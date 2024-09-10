"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { updateTask, deleteTask } from '../utils/firestore';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  date,
  status
}) => {
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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref, drag]);

  const handleUpdate = async () => {
    await updateTask(id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTask(id);
    // Optionally refetch tasks or update state to remove the deleted task
  };

  return (
    <div
      ref={ref} // Use the callback ref here
      className={`bg-white p-4 rounded-lg border-2 shadow-sm mb-4 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleUpdate}
            className="text-lg font-semibold border-b-2 w-full"
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
          className="text-xs bg-red-500 text-white px-2 py-1 rounded-full"
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
          className="text-gray-600 border-b-2 w-full"
        />
      ) : (
        <p className="text-gray-600" onDoubleClick={() => setIsEditing(true)}>
          {editedDescription}
        </p>
      )}
      <div className="text-gray-400 text-sm mt-2 flex items-center">
        <span>{date}</span>
        {/* Add Date Picker here to update date if needed */}
      </div>
    </div>
  );
};

export default TaskCard;
