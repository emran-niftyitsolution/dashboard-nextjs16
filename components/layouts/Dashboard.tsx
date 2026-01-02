"use client";

import { cn, getFromLocalStorage, setToLocalStorage } from "@/lib/utils";
import { Button, Drawer } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import Footer from "../footers/Footer";
import Header from "../headers/Header";
import Loader from "../loaders/Loader";
import Sidebar from "../sidebars/Sidebar";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  // Track if this is the initial mount for each state independently
  const isInitialMountCollapsed = useRef(true);
  const isInitialMountFooter = useRef(true);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Initialize state with default values (not from localStorage yet to avoid hydration mismatch)
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFooter, setShowFooter] = useState(true);

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    // Load collapsed state from localStorage
    const savedCollapsed = getFromLocalStorage("sidebarCollapsed", false);
    if (savedCollapsed !== collapsed) {
      setCollapsed(savedCollapsed);
    }

    // Load showFooter state from localStorage
    const savedShowFooter = getFromLocalStorage("showFooter", true);
    if (savedShowFooter !== showFooter) {
      setShowFooter(savedShowFooter);
    }

    // Hide loader after loading state
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Save collapsed state to localStorage (skip initial mount)
  useEffect(() => {
    if (isInitialMountCollapsed.current) {
      isInitialMountCollapsed.current = false;
      return;
    }
    setToLocalStorage("sidebarCollapsed", collapsed);
  }, [collapsed]);

  // Save showFooter state to localStorage (skip initial mount)
  useEffect(() => {
    if (isInitialMountFooter.current) {
      isInitialMountFooter.current = false;
      return;
    }
    setToLocalStorage("showFooter", showFooter);
  }, [showFooter]);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleFooterToggle = (show: boolean) => {
    setShowFooter(show);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex h-screen bg-white">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            collapsed={collapsed}
            showFooter={showFooter}
            onFooterToggle={handleFooterToggle}
          />
        </div>

        {/* Mobile Drawer */}
        <div className="block md:hidden">
          <Drawer
            placement="left"
            onClose={closeDrawer}
            open={drawerOpen}
            size={222}
            styles={{
              body: { padding: 0 },
              header: { display: "none" },
            }}
          >
            <div className="relative">
              <Button
                type="text"
                icon={<FiX className="text-xl" />}
                onClick={closeDrawer}
                className="absolute top-4 right-4 z-50"
                aria-label="Close menu"
              />
              <Sidebar
                collapsed={false}
                showFooter={showFooter}
                onFooterToggle={handleFooterToggle}
              />
            </div>
          </Drawer>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header toggleCollapsed={toggleMenu} openDrawer={openDrawer} />
          <main
            className={cn(
              "rounded-none border border-gray-100 md:rounded-tl-2xl flex-1 overflow-hidden overflow-y-auto bg-gray-100 p-4 md:p-6 shadow-inner",
              {
                "rounded-bl-none": !showFooter,
                "md:rounded-bl-2xl": showFooter,
              }
            )}
          >
            {children}
          </main>
          <div
            className={cn({
              hidden: !showFooter,
              block: showFooter,
            })}
          >
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
