"use client"
import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { Task } from '../utils/firestore';

interface ColumnProps {
  title: string;
  color: string;
  tasks: Task[];
  onDrop: (taskId: string, newStatus: string) => void;
}

const Column: React.FC<ColumnProps> = React.memo(({ title, color, tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: { id: string }) => {
      onDrop(item.id, title);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  console.log(`Tasks for ${title} column:`, tasks); // Debugging line

  return (
    <div 
      ref={drop} 
      className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full ${
        isOver ? 'border-2 border-dashed border-gray-400' : ''
      }`}
    >
      <h2
        className={`${
          color === 'purple' ? 'bg-purple-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
        } text-white font-semibold mb-4 px-4 py-2 text-center`}
      >
        {title}
      </h2>
      <div className="p-4 flex-grow overflow-y-auto">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            {...task}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-gray-400 text-center py-4">
            Drop a task here
          </div>
        )}
      </div>
    </div>
  );
});

Column.displayName = 'Column';

export default Column;