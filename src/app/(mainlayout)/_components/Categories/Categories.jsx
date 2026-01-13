"use client";
import React from "react";
import Link from "next/link";
import {
  FiCode,
  FiPenTool,
  FiBarChart2,
  FiLayers,
  FiDatabase,
  FiSmartphone,
} from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";

const categories = [
  {
    name: "Development",
    desc: "Best IDEs, frameworks and dev tools.",
    icon: <FiCode />,
    count: "120+ Tools",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    name: "Design",
    desc: "Graphic, UI/UX and prototyping assets.",
    icon: <FiPenTool />,
    count: "85+ Tools",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    name: "Marketing",
    desc: "SEO, Analytics and Email tools.",
    icon: <FiBarChart2 />,
    count: "64+ Tools",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    name: "Productivity",
    desc: "Task management and team collaboration.",
    icon: <FiLayers />,
    count: "92+ Tools",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Database",
    desc: "Scalable SQL and NoSQL solutions.",
    icon: <FiDatabase />,
    count: "45+ Tools",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    name: "Mobile App",
    desc: "React Native, Flutter and Swift tools.",
    icon: <FiSmartphone />,
    count: "38+ Tools",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const Categories = () => {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
              Categories
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">
              Browse tools by <span className="text-slate-500">department</span>
            </h3>
          </div>
          <Link
            href="/items"
            className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
          >
            View All Categories <HiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group p-8 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}
              >
                {cat.icon}
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-2">
                {cat.name}
              </h4>

              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {cat.desc}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {cat.count}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <HiArrowRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
