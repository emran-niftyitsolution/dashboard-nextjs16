"use client";

import { cn } from "@/lib/utils";
import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import Footer from "../footers/Footer";
import Header from "../headers/Header";
import Sidebar from "../sidebars/Sidebar";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile size
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setDrawerOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMenu = () => {
    if (isMobile) {
      setDrawerOpen(!drawerOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar collapsed={collapsed} />}

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        onClose={closeDrawer}
        open={drawerOpen}
        size={222}
        styles={{ body: { padding: 0 } }}
      >
        <Sidebar collapsed={false} />
      </Drawer>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleCollapsed={toggleMenu} isMobile={isMobile} />
        <main
          className={cn(
            "border border-gray-100 rounded-tl-2xl rounded-bl-2xl flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6 shadow-inner",
            {
              "rounded-none": isMobile,
            }
          )}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
