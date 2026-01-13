"use client";
import React from "react";
import { FiSend, FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior Developer",
    comment:
      "ToolStack has completely changed how our team discovers new software. The interface is incredibly smooth!",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    comment:
      "I found my favorite design assets here. The 'Trending' section is always spot on with what's new in the industry.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    comment:
      "I found my favorite design assets here. The 'Trending' section is always spot on with what's new in the industry.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
];

const FinalSections = () => {
  return (
    <div className="bg-white">
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">
              Community
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">
              What our users <span className="text-indigo-600">say</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all"
              >
                <FaQuoteLeft className="absolute -top-2 -right-2 text-indigo-50 text-8xl group-hover:text-indigo-100 transition-colors" />
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-8 relative z-10 leading-relaxed">
                  {t.comment}
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <Image
                    width={300}
                    height={300}
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full ring-2 ring-indigo-50"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Newsletter & CTA */}
      <section className="py-20">
        <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
                Ready to supercharge your <br />{" "}
                <span className="text-emerald-300">development workflow?</span>
              </h3>
              <p className="text-indigo-100 mb-10 max-w-xl mx-auto">
                Join our newsletter to get weekly updates on the most innovative
                tools and exclusive discounts.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-white px-6 py-4 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all"
                  />
                </div>
                <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  Join Now <FiSend />
                </button>
              </div>

              <p className="mt-8 text-indigo-200 text-xs">
                Already have an account?{" "}
                <a href="/login" className="text-white font-bold underline">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinalSections;
