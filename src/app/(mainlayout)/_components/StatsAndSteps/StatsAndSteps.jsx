"use client";
import React from "react";
import {
  FiUsers,
  FiDownload,
  FiGlobe,
  FiSearch,
  FiCheckCircle,
  FiPlusSquare,
} from "react-icons/fi";

const stats = [
  {
    label: "Active Users",
    value: "50K+",
    icon: <FiUsers />,
    color: "text-indigo-600",
  },
  {
    label: "Tools Listed",
    value: "1,200+",
    icon: <FiPlusSquare />,
    color: "text-emerald-600",
  },
  {
    label: "Downloads",
    value: "1M+",
    icon: <FiDownload />,
    color: "text-blue-600",
  },
  {
    label: "Countries",
    value: "120+",
    icon: <FiGlobe />,
    color: "text-amber-600",
  },
];

const steps = [
  {
    title: "Search for Tools",
    desc: "Use our powerful search to find tools by category, price, or rating.",
    icon: <FiSearch />,
    stepNum: "01",
  },
  {
    title: "Compare Features",
    desc: "Look through detailed descriptions and pricing to find the perfect fit.",
    icon: <FiCheckCircle />,
    stepNum: "02",
  },
  {
    title: "Scale Your Work",
    desc: "Get the tool and start building your next big project efficiently.",
    icon: <FiZap className="text-indigo-600" />, // FiZap import handle korben
    stepNum: "03",
  },
];

import { FiZap } from "react-icons/fi";

const StatsAndSteps = () => {
  return (
    <section className="bg-slate-50">
      <div className="bg-indigo-900 py-16">
        <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-white/50 flex justify-center text-2xl mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-indigo-200 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
            Workflow
          </h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900">
            How ToolStack <span className="text-slate-400">Works</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 z-100"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-5 -right-5 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                {step.stepNum}
              </div>
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">
                {step.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsAndSteps;
