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
} from "react-icons/fi";
import { RiLayoutGridFill, RiProfileLine } from "react-icons/ri";
import useUser from "@/hook/useUser";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { users: userData, status } = useUser();
  const logInData = userData?.user;

  // Menu items depend on logged-in user role
  const menuItems = [
    { name: "Overview", icon: <FiPieChart />, path: "/dashboard" },
    { name: "My Tools", icon: <FiGrid />, path: "/dashboard/my-items" },
    {
      name: "Add New Tool",
      icon: <FiPlusSquare />,
      path: "/dashboard/add-item",
    },
    {
      name: "My Profile",
      icon: <RiProfileLine />,
      path: "/dashboard/my-profile",
    },
    ...(logInData?.role === "admin"
      ? [
          {
            name: "Manage User",
            path: "/dashboard/all-users",
            icon: <FaUser />,
          },
        ]
      : []),
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
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

          <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
            {status === "loading"
              ? // loading skeleton for menu items
                Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="h-10 bg-slate-700/50 rounded-lg animate-pulse"
                    ></div>
                  ))
              : menuItems.map((item) => (
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

          <div className="pt-6 border-t border-slate-800 shrink-0">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <FiLogOut className="text-xl" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 lg:hidden hover:bg-slate-200 transition-all"
            >
              {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <h2 className="hidden lg:block text-slate-800 font-black text-xl tracking-tight">
              {menuItems.find((item) => item.path === pathname)?.name ||
                "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="hidden sm:flex p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 transition-all">
              <FiBell size={20} />
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            {status === "loading" ? (
              <div className="flex items-center gap-3 animate-pulse">
                <div className="text-right hidden sm:block">
                  <div className="h-4 w-24 bg-slate-200 rounded mb-1"></div>
                  <div className="h-3 w-16 bg-slate-100 rounded ml-auto"></div>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-slate-200"></div>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 leading-none">
                    {logInData?.fullName || "Guest User"}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium uppercase tracking-wider">
                    {logInData?.role || "Member"}
                  </p>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 p-[2px] shadow-md shadow-indigo-100">
                  <div className="h-full w-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={logInData?.photo || "/placeholder-user.png"}
                      alt="User profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 lg:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>

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
