import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowRight, FiCornerDownLeft, FiStar } from "react-icons/fi";

const ItemCart = ({ item }) => {
  return (
    <div className="group relative">
      {item.isPremium && (
        <div className="absolute -top-3 -right-3 z-20 bg-linear-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5 text-[11px] font-black tracking-wider animate-bounce">
          <FiCornerDownLeft className="text-sm" />
          PREMIUM
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] transition-all duration-500 flex flex-col h-full translate-y-0 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <Image
            width={400}
            height={400}
            src={
              item.image ||
              "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400"
            }
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-4 left-4">
            <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm border border-white/50">
              {item.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {item.name}
            </h3>

            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-100">
              <FiStar className="fill-current text-xs" />
              <span className="text-xs font-black">{item.rating || "4.5"}</span>
            </div>
          </div>

          <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
            {item.description || item.desc}
          </p>

          {/* Footer Section */}
          <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                Pricing
              </span>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {item.price}
              </span>
            </div>

            <Link
              href={`/items/${item._id}`}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 hover:shadow-slate-200 active:scale-95"
            >
              Details{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
