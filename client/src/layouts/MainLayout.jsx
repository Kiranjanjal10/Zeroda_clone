import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { SocketProvider } from '../context/SocketContext';

const MainLayout = () => {
  return (
    <SocketProvider>
      <div className="min-h-screen bg-primary-bg text-primary-text flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </SocketProvider>
  );
};

export default MainLayout;
