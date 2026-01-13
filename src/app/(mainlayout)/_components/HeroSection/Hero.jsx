"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiArrowRight, FiZap, FiStar, FiGlobe } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";

const sliderData = [
  {
    title: "Revolutionize your Design Workflow",
    desc: "Discover premium UI kits and design systems to speed up your process.",
    tag: "Design Tools",
    icon: <FiStar className="text-amber-500" />,
    color: "from-indigo-600 to-blue-500",
  },
  {
    title: "Deploy your Apps in Seconds",
    desc: "The best hosting and cloud solutions for modern web developers.",
    tag: "Cloud Services",
    icon: <FiZap className="text-emerald-500" />,
    color: "from-emerald-600 to-teal-500",
  },
  {
    title: "Connect with Global Teams",
    desc: "Collaboration tools that keep your remote team synchronized.",
    tag: "Productivity",
    icon: <FiGlobe className="text-blue-500" />,
    color: "from-blue-600 to-indigo-600",
  },
];

const Hero = () => {
  return (
    <section className="bg-white pt-10 pb-20">
      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-100 border border-slate-50"
        >
          {sliderData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative bg-slate-900 min-h-125 flex items-center px-8 md:px-20 py-16">
                <div className="absolute inset-0 opacity-20">
                  <div
                    className={`absolute top-0 right-0 w-96 h-96 bg-linear-to-br ${item.color} blur-[120px]`}
                  ></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-700 blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-2xl text-left">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
                    {item.icon}
                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                      {item.tag}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                    {item.title}
                  </h1>

                  <p className="text-lg text-slate-300 mb-8 max-w-lg">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center gap-2">
                      Get Started <FiArrowRight />
                    </button>
                    <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                      Learn More
                    </button>
                  </div>
                </div>

                <div className="hidden lg:flex flex-1 justify-center relative z-10">
                  <div
                    className={`w-64 h-64 rounded-3xl bg-linear-to-br ${item.color} rotate-12 flex items-center justify-center shadow-2xl`}
                  >
                    <div className="text-white text-8xl opacity-80">
                      {item.icon}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
