import React from "react";
import Link from "next/link";
import { FiStar, FiArrowRight, FiExternalLink, FiTag } from "react-icons/fi";
import { getLatest } from "@/services/latest.server";
import Image from "next/image";
import ItemCart from "../../items/_components/ItemCart";
export const dynamic = "force-dynamic";

const TrendingTools = async () => {
  const latests = await getLatest();

  if (!latests || latests.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#fcfdfe] relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-125 h-125 bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Handpicked Selection
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Trending <span className="text-indigo-600">Software</span> Tools
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              Explore the top-rated tools that are helping teams build amazing
              products faster.
            </p>
          </div>
          <Link
            href="/items"
            className="hidden md:flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
          >
            View All Tools <FiArrowRight />
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {latests.map((tool) => (
            <ItemCart key={tool._id} item={tool} />
          ))}
        </div>

        {/* Mobile Footer Link */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/items"
            className="inline-flex items-center gap-2 text-indigo-600 font-bold"
          >
            See all tools <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingTools;
