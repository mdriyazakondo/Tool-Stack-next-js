"use client";
import useUser from "@/hook/useUser";
import Image from "next/image";
import React from "react";

const MyProfile = () => {
  const { users: userData, status } = useUser();
  const logInData = userData?.user;
  console.log(logInData);
  const user = {
    fullName: "Amanda Brown",
    photo: "https://ik.imagekit.io/2o23yla4n/riyaz_akondo-modified.png",
    email: "mdriyazakondo260@gmail.com",
    role: "System Admin",
    joined: "Jan 14, 2026",
    lastLogin: "Jan 16, 2026 | 12:03 PM",
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
      <div className="w-full max-w-125 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden border border-white">
        <div className="h-40 bg-indigo-600 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-700 opacity-90"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative text-center">
            <div className="p-1.5 bg-white/20 backdrop-blur-lg rounded-4xl inline-block shadow-2xl">
              <Image
                src={logInData?.photo}
                alt="profile"
                width={240}
                height={250}
                className="w-28 h-28 rounded-[1.8rem] object-cover border-2 "
              />
            </div>
          </div>
        </div>

        <div className="px-10 pt-8 pb-10 text-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {logInData?.fullName}
            </h2>
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-[0.2em]">
              {logInData?.role}
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-hover hover:bg-white hover:shadow-md duration-300">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Email
              </span>
              <span className="text-sm font-semibold text-slate-700">
                {logInData?.email}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-hover hover:bg-white hover:shadow-md duration-300">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Joined
              </span>
              <span className="text-sm font-semibold text-slate-700">
                {logInData?.date}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-hover hover:bg-white hover:shadow-md duration-300">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Last Login
              </span>
              <span className="text-sm font-semibold text-slate-700">
                {logInData?.last_login}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
