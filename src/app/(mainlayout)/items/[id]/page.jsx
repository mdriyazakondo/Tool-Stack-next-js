import { singleItem } from "@/services/item.server";
import React from "react";
import Link from "next/link";
import {
  FiStar,
  FiExternalLink,
  FiChevronLeft,
  FiCheckCircle,
  FiCalendar,
  FiTag,
  FiDollarSign,
  FiUser,
  FiMail,
  FiShield,
} from "react-icons/fi";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tool = await singleItem(id);

  return {
    title: tool ? `${tool.name} - ToolStack` : "Tool Not Found",
    description: tool ? tool.description : "Find the best software tools here.",
  };
}

const SingleItems = async ({ params }) => {
  const { id } = await params;
  const tool = await singleItem(id);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Tool not found!</h2>
          <Link
            href="/items"
            className="text-indigo-600 mt-4 inline-block hover:underline"
          >
            Go back to directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      {/* Top Header Navigation */}
      <nav className="border-b border-slate-100 bg-white/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/items"
            className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all"
          >
            <FiChevronLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Link>

          {tool.isPremium && (
            <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm border border-amber-200">
              <FiShield className="fill-current" /> Premium Tool
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Side: Visuals & Description */}
          <div className="lg:col-span-7">
            <div className="relative group overflow-hidden rounded-[3rem] bg-slate-200">
              <Image
                width={500}
                height={500}
                src={tool.image}
                alt={tool.name}
                className="w-full aspect-16/10 object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]"></div>
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px flex-1 bg-slate-100"></span>
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">
                  Detailed Overview
                </h2>
                <span className="h-px flex-1 bg-slate-100"></span>
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-6">
                Master your workflow with {tool.name}
              </h3>
              <p className="text-slate-600 text-xl leading-relaxed mb-10 font-medium">
                {tool.description || tool.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Verified Publisher",
                  "Instant Activation",
                  "Cloud Sync Enabled",
                  "Premium Support",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <FiCheckCircle size={18} />
                    </div>
                    <span className="font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Pricing & Owner Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              {/* Main Action Card */}
              <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider">
                      <FiTag /> {tool.category}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-xl font-bold text-xs">
                      <FiStar className="text-amber-400 fill-current" />{" "}
                      {tool.rating || "4.5"}
                    </div>
                  </div>

                  <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    {tool.name}
                  </h1>

                  <div className="bg-slate-50 rounded-4xl p-6 border border-slate-100 mb-10">
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">
                      One-time Investment
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">
                        {tool.price}
                      </span>
                      <span className="text-slate-400 font-bold">/USD</span>
                    </div>
                  </div>

                  {tool.isPremium ? (
                    <button className="w-full bg-indigo-600 text-white py-6 rounded-4xl font-black text-xl hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3">
                      Purchase Access <FiExternalLink />
                    </button>
                  ) : (
                    <button className="w-full bg-indigo-600 text-white py-6 rounded-4xl font-black text-xl hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3">
                      Free Access
                      <FiExternalLink />
                    </button>
                  )}

                  <div className="mt-8 flex items-center justify-center gap-6 text-slate-400">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                      <FiCalendar />{" "}
                      {new Date(tool.date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Info Card */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-6 text-center">
                  Managed By
                </h4>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-3xl shadow-lg border-2 border-slate-800">
                    <FiUser />
                  </div>
                  <div>
                    <h5 className="text-xl font-black">{tool.ownerName}</h5>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-1 group cursor-pointer hover:text-white transition-colors">
                      <FiMail className="text-indigo-400" />
                      <span className="font-medium underline decoration-slate-700 underline-offset-4">
                        {tool.ownerEmail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleItems;
