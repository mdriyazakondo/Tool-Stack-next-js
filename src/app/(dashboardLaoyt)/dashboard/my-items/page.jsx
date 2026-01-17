import { getAllItems } from "@/services/item.server";
import React from "react";
import Link from "next/link";
import { FiEdit2, FiExternalLink, FiEye } from "react-icons/fi";
import Image from "next/image";
import DeleteButton from "./_components/DeleteButton";
export const dynamic = "force-dynamic";
const MyItems = async () => {
  const myItems = await getAllItems();

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              My Tools Inventory
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage and monitor all your listed software tools.
            </p>
          </div>
          <Link
            href="/dashboard/add-item"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-100"
          >
            + Add New Tool
          </Link>
        </div>

        {/* Table Card */}
        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-xs font-black text-slate-500 uppercase tracking-wider">
                    Tool Info
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-500 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-5 text-xs font-black text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {myItems.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <Image
                          width={48}
                          height={48}
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                        />
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1 w-48">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-700">
                        {item.price}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 text-amber-600 font-bold text-xs">
                          {item.rating}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/items/${item._id}`}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="View"
                        >
                          <FiEye size={18} />
                        </Link>
                        <Link
                          href={`/dashboard/my-items/${item._id}`}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </Link>
                        <DeleteButton id={item._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {myItems.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                <FiExternalLink className="text-slate-300 text-2xl" />
              </div>
              <p className="text-slate-500 font-medium">
                No tools found in your inventory.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyItems;
