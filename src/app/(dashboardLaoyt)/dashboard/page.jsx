"use client";
import React from "react";
import {
  FiTrendingUp,
  FiActivity,
  FiLayers,
  FiEye,
  FiArrowUpRight,
  FiClock,
  FiPlus,
} from "react-icons/fi";

const OverviewPage = () => {
  // Mock Stats Data
  const stats = [
    {
      label: "Total Tools",
      value: "24",
      icon: <FiLayers />,
      trend: "+2 this week",
      color: "bg-indigo-600",
    },
    {
      label: "Total Views",
      value: "12.5k",
      icon: <FiEye />,
      trend: "+12%",
      color: "bg-emerald-500",
    },
    {
      label: "User Feedback",
      value: "140",
      icon: <FiActivity />,
      trend: "98% Positive",
      color: "bg-amber-500",
    },
  ];

  // Mock Recent Activity
  const activities = [
    {
      id: 1,
      tool: "Figma Pro",
      action: "Updated details",
      time: "2 hours ago",
      status: "Updated",
    },
    {
      id: 2,
      tool: "Notion AI",
      action: "Added to directory",
      time: "5 hours ago",
      status: "Added",
    },
    {
      id: 3,
      tool: "Vercel",
      action: "Deleted from list",
      time: "1 day ago",
      status: "Removed",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Dashboard <span className="text-indigo-600">Overview</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Welcome back! Here what happening with your tools today.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100">
          <FiPlus /> New Export
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`${stat.color} p-4 rounded-2xl text-white text-2xl shadow-lg`}
              >
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                {stat.trend} <FiArrowUpRight />
              </span>
            </div>
            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">
              {stat.label}
            </h3>
            <p className="text-3xl font-black text-slate-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FiTrendingUp className="text-indigo-600" /> Platform Growth
            </h3>
            <select className="bg-slate-50 border-none text-sm font-bold text-slate-500 rounded-xl px-4 py-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center">
            <p className="text-slate-400 font-medium italic">
              Chart visualization will be rendered here
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FiClock className="text-amber-500" /> Recent Activity
          </h3>
          <div className="space-y-6">
            {activities.map((item) => (
              <div key={item.id} className="flex gap-4 relative">
                <div className="w-2 bg-slate-100 rounded-full h-auto"></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {item.tool}
                  </h4>
                  <p className="text-slate-500 text-xs mt-1">{item.action}</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 block tracking-widest">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
            View Full Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
