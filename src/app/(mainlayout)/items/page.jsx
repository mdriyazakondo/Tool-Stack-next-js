import { getAllItems } from "@/services/item.server";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import ItemCart from "./_components/ItemCart";
import Link from "next/link";

const ItemsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 8;

  const allItems = await getAllItems();
  
  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allItems.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="bg-white border-b border-slate-100 pt-12 pb-16">
        <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Explore All <span className="text-indigo-600">Premium Tools</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto mb-8">
            Find the perfect software to supercharge your business.
          </p>

          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FiSearch className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FiFilter className="text-indigo-600" /> All Resources
          </h2>
          <span className="text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentItems.map((item) => (
            <ItemCart key={item._id} item={item} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-2">
            <Link
              href={`/items?page=${currentPage - 1}`}
              className={`p-3 rounded-xl border border-slate-200 transition-all ${
                currentPage <= 1
                  ? "pointer-events-none opacity-30 bg-slate-100"
                  : "bg-white hover:border-indigo-600 text-indigo-600 shadow-sm"
              }`}
            >
              <FiChevronLeft size={20} />
            </Link>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Link
                    key={pageNum}
                    href={`/items?page=${pageNum}`}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all ${
                      currentPage === pageNum
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-600"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            <Link
              href={`/items?page=${currentPage + 1}`}
              className={`p-3 rounded-xl border border-slate-200 transition-all ${
                currentPage >= totalPages
                  ? "pointer-events-none opacity-30 bg-slate-100"
                  : "bg-white hover:border-indigo-600 text-indigo-600 shadow-sm"
              }`}
            >
              <FiChevronRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsPage;
