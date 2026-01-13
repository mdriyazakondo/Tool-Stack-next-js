"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiPlusSquare,
  FiSettings,
  FiPieChart,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { RiLayoutGridFill } from "react-icons/ri";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: <FiPieChart />, path: "/dashboard" },
    { name: "My Tools", icon: <FiGrid />, path: "/dashboard/my-items" },
    {
      name: "Add New Tool",
      icon: <FiPlusSquare />,
      path: "/dashboard/add-item",
    },
    { name: "Settings", icon: <FiSettings />, path: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar for Desktop & Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo - Sticky inside sidebar */}
          <Link
            href="/"
            className="flex items-center gap-3 mb-10 px-2 shrink-0"
          >
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-900/20">
              <RiLayoutGridFill className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white italic">
              ToolStack
            </span>
          </Link>

          {/* Navigation - Scrollable if items are many */}
          <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-200 group ${
                  pathname === item.path
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-900/40"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span
                  className={`text-xl ${
                    pathname === item.path
                      ? "text-white"
                      : "group-hover:text-indigo-400"
                  }`}
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout - Fixed at bottom */}
          <div className="pt-6 border-t border-slate-800 shrink-0">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-rose-400 hover:bg-rose-500/10 transition-all">
              <FiLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar - Always Sticky */}
        <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 lg:hidden hover:bg-slate-200 transition-all"
            >
              {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <div className="hidden lg:block">
              <h2 className="text-slate-800 font-black text-xl tracking-tight">
                {menuItems.find((item) => item.path === pathname)?.name ||
                  "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Search Placeholder / Extra Action */}
            <button className="hidden sm:flex p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 transition-all">
              <FiBell size={20} />
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">
                  Admin User
                </p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">
                  Super Admin
                </p>
              </div>
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
                <div className="h-full w-full bg-white rounded-[14px] flex items-center justify-center text-indigo-600 overflow-hidden">
                  <FiUser size={22} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 lg:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
