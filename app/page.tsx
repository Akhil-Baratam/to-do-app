import React from "react";
import Header from "./components/Header";
import TaskBoard from "./components/TaskBoard";

const page = () => {
  return (
    <div className="min-h-screen mx-auto">
      <Header />
      <section className="flex justify-center items-center">
        <TaskBoard />
      </section>
    </div>
  );
};

export default page;
