import React from "react";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  date: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  date,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border-2 shadow-sm mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">{title}</h4>
        {/* <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
          {status}
        </span> */}

        <div className="text-gray-400 text-sm mt-2 flex items-center">
          <span>{date}</span>
        </div>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TaskCard;
