"use client";
import React from "react";
import Link from "next/link";
import { RiLayoutGridFill } from "react-icons/ri";
import { FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100 group-hover:bg-emerald-500 transition-colors duration-300">
                <RiLayoutGridFill className="text-white text-xl" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Tool<span className="text-indigo-600">Stack</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Discover the most powerful SaaS tools and software to accelerate
              your workflow. Join thousands of creators today.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-6">Platform</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-slate-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/items"
                  className="text-slate-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/add-item"
                  className="text-slate-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  Submit Tool
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-slate-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <FiMail className="text-emerald-500" /> support@toolstack.com
              </li>
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <FiMapPin className="text-emerald-500" /> Dhaka, Bangladesh
              </li>
              <li className="mt-4">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                  Status: All Systems Go
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-6">Newsletter</h3>
            <p className="text-slate-500 text-sm mb-4">
              Get the latest tool updates.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
              />
              <button className="absolute right-2 top-2 bg-indigo-600 text-white p-1.5 rounded-md hover:bg-slate-900 transition-colors">
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} ToolStack. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
