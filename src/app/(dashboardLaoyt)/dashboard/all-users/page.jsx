"use client";
import React, { useEffect, useState } from "react";
import {
  FiMail,
  FiCalendar,
  FiShield,
  FiTrash2,
  FiEdit3,
  FiSearch,
} from "react-icons/fi";
import { getUserAll } from "@/services/user.service";
import Image from "next/image";
import useUser from "@/hook/useUser";
import { useRouter } from "next/navigation";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { users: userData, status } = useUser();
  const logInData = userData?.user?.email;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUserAll(logInData);
        console.log(allUsers);
        if (allUsers && allUsers?.users.length > 0) {
          setUsers(allUsers?.users);
        } else {
          // Fallback sample data if API returns empty
          setUsers([
            {
              _id: "69673577ccd812bb2d8314bd",
              fullName: "Amanda Brown",
              photo:
                "https://ik.imagekit.io/2o23yla4n/riyaz_akondo-modified.png",
              email: "mdriyazakondo260@gmail.com",
              date: "2026-01-14T06:19:35.455Z",
              role: "admin",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [logInData]);

  if (!userData) {
    return router.push("/");
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            User Management
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            View and manage all registered accounts
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                  User Info
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-5 text-[13px] font-bold text-slate-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading
                ? [1, 2, 3].map((n) => (
                    <tr key={n} className="animate-pulse">
                      <td
                        colSpan="5"
                        className="px-6 py-6 h-20 bg-slate-50/30"
                      ></td>
                    </tr>
                  ))
                : users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* User Profile */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {/* <div className="h-12 w-12 rounded-2xl bg-indigo-50 relative shrink-0 overflow-hidden border-2 border-white shadow-sm">
                            <Image
                              src={user?.photo}
                              alt="user photo"
                              width={40}
                              height={40}
                              className="bg-black"
                            />
                          </div> */}
                          <div>
                            <p className="font-bold text-slate-800 leading-none">
                              {user?.fullName}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1 font-semibold uppercase tracking-tight">
                              ID: {user?._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                          <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <FiMail size={14} />
                          </div>
                          {user?.email}
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider ${
                            user?.role === "admin"
                              ? "bg-indigo-50 text-indigo-600"
                              : "bg-red-200 text-red-600"
                          }`}
                        >
                          <FiShield
                            size={12}
                            className={
                              user?.role === "admin" ? "animate-pulse" : ""
                            }
                          />
                          {user?.role}
                        </span>
                      </td>

                      {/* Join Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <FiCalendar size={14} className="text-slate-400" />
                          {new Date(user?.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            title="Edit User"
                          >
                            <FiEdit3 size={18} />
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            title="Delete User"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {users.length} Users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-100">
              Prev
            </button>
            <button className="px-3 py-1 text-xs font-bold bg-white border border-slate-200 rounded-lg text-indigo-600 hover:bg-indigo-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsersPage;
