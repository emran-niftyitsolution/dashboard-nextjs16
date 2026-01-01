"use client";

import React, { useState } from "react";
import Footer from "../footers/Footer";
import Header from "../headers/Header";
import Sidebar from "../sidebars/Sidebar";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <main className="rounded-tl-2xl rounded-bl-2xl flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6 shadow-inner">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
