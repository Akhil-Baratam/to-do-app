"use client"
import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

interface ColumnProps {
  title: string;
  color: string;
  tasks: Array<{ id: string; title: string; description: string; date: string; status: string }>;
  onDrop: (taskId: string, newStatus: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, color, tasks, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'task', // Ensure this type matches what you use in TaskCard
    drop: (item: { id: string }) => {
      onDrop(item.id, title.toLowerCase());
    },
  });

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [ref, drop]);

  return (
    <div
      ref={ref} // Use the callback ref here
      className="relative bg-white rounded-xl"
    >
      <h1
        className={`${
          color === 'purple' ? 'bg-purple-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
        } text-white font-semibold mb-4 px-4 py-2 rounded-t-xl w-full text-center`}
      >
        {title}
      </h1>
      <div className="m-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            status={task.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
