import React from "react";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  color: string;
}

const Column: React.FC<ColumnProps> = ({ title, color }) => {
  const bgColor = {
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  return (
    <div className="relative bg-white rounded-xl">
      {/* Ensure the h1 takes full width */}
      <h1
        className={`${
          bgColor[color as keyof typeof bgColor]
        } text-white font-semibold mb-4 px-4 py-2 rounded-t-xl w-full text-center`}
      >
        {title}
      </h1>
      <div className="m-4">
        <TaskCard
          title="Brainstorming"
          description="Brainstorming brings team members' diverse experience into play."
          status="High"
          date="18/09/2024"
        />
        <TaskCard
          title="Wireframes"
          description="Low fidelity wireframes include the most basic content and visuals."
          status="High"
          date="19/09/2024"
        />
      </div>
    </div>
  );
};

export default Column;
