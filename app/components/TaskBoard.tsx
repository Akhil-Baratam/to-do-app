import React from 'react';
import Column from './Column';

const TaskBoard = () => {
  return (
    <div className=" p-6 max-w-6xl">
      <div className="flex justify-between items-center rounded-xl p-6 shadow-md bg-white">
        <h2 className="text-2xl font-semibold">Desktop & Mobile Application</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
          Create Task
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-6 mt-6">
        <Column title="TODO" color="purple" />
        <Column title="IN PROGRESS" color="yellow" />
        <Column title="COMPLETED" color="green" />
      </div>
    </div>
  );
};

export default TaskBoard;
