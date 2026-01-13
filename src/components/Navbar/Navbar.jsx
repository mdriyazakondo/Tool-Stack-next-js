"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiLayoutGridFill } from "react-icons/ri";
import {
  FiLogIn,
  FiPlusCircle,
  FiLogOut,
  FiCompass,
  FiUser,
} from "react-icons/fi";
import { MdDashboardCustomize } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const pathname = usePathname();


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/", icon: null },
    { name: "Explore", href: "/items", icon: <FiCompass /> },
    { name: "Dashboard", href: "/dashboard", icon: <MdDashboardCustomize /> },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-[100] transition-all duration-300">
      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center py-3">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform duration-300">
                <RiLayoutGridFill className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Tool<span className="text-indigo-600">Stack</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  pathname === link.href
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                }`}
              >
                {link.icon && <span className="text-lg">{link.icon}</span>}
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-slate-200 mx-4"></div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/add-item"
                  className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-all shadow-sm shadow-emerald-100"
                >
                  <FiPlusCircle className="text-lg" /> Add Tool
                </Link>

                {/* User Profile Circle */}
                <button className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm hover:border-indigo-200 transition-all">
                  <FiUser className="text-slate-600 text-xl" />
                </button>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Logout"
                >
                  <FiLogOut className="text-xl" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-bold text-slate-600 hover:text-indigo-600 px-4"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2  text-white px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-all ${
                isOpen
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isOpen ? (
                <HiX className="text-2xl" />
              ) : (
                <HiMenuAlt3 className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-x-0 bg-white border-b border-slate-200 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 space-y-6 bg-linear-to-b from-white to-slate-50">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-lg font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                <span className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-indigo-500">
                  {link.icon || <RiLayoutGridFill />}
                </span>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-px bg-slate-200 w-full"></div>

          {isLoggedIn ? (
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/add-item"
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-emerald-50 rounded-2xl text-emerald-700 font-bold"
              >
                <FiPlusCircle className="text-2xl" /> Add Tool
              </Link>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-rose-50 rounded-2xl text-rose-600 font-bold">
                <FiLogOut className="text-2xl" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-4 rounded-2xl font-bold text-slate-700 bg-slate-100"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-4 rounded-2xl font-bold text-white bg-indigo-600 shadow-lg shadow-indigo-100"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
