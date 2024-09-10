"use client"
import React from 'react';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';

const Page: React.FC = () => {
  return (
    <div className="min-h-screen mx-auto">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TaskBoard />
      </main>
    </div>
  );
};

export default Page;