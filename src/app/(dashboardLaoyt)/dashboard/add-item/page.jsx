"use client";
import { createItem } from "@/services/item.server";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiCheckCircle,
  FiCornerDownLeft,
  FiDollarSign,
  FiImage,
  FiLoader,
  FiPlusCircle,
  FiTag,
  FiType,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { TbPremiumRights } from "react-icons/tb";

const AddItemPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "Design",
      price: "",
      image: "",
      description: "",
      isPremium: false,
      ownerName: "", // নতুন
      ownerEmail: "", // নতুন
    },
  });

  const isPremiumValue = watch("isPremium");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createItem(data);

      if (result.acknowledged || result.insertedId) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 3000);

        Swal.fire({
          icon: "success",
          title: "Tool Published!",
          text: `Your ${
            data.isPremium ? "Premium" : "Standard"
          } tool is now live.`,
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: "rounded-[2rem]" },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500 pb-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Add New <span className="text-indigo-600">Tool</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Configure your tool basic information and access levels.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
        {/* Success Overlay */}
        {success && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg shadow-emerald-100">
              <FiCheckCircle />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Tool Published!
            </h2>
            <p className="text-slate-500 font-medium">
              Resetting form for next entry...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* --- Premium Selection Section --- */}
          <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl ${
                  isPremiumValue
                    ? "bg-amber-100 text-amber-600"
                    : "bg-slate-200 text-slate-600"
                } transition-colors`}
              >
                <TbPremiumRights className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Premium Tool</h4>
                <p className="text-xs text-slate-500 font-medium">
                  Mark this if the tool requires a paid subscription.
                </p>
              </div>
            </div>

            {/* Custom Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("isPremium")}
              />
              <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <FiType className="text-indigo-600" /> Tool Name
              </label>
              <input
                type="text"
                placeholder="e.g. Photoshop"
                className={`w-full px-5 py-4 bg-slate-50 border ${
                  errors.name ? "border-red-400" : "border-slate-200"
                } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all`}
                {...register("name", { required: "Tool Name is required" })}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <FiTag className="text-emerald-600" /> Category
              </label>
              <select
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all appearance-none"
                {...register("category")}
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Productivity">Productivity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <FiDollarSign className="text-amber-600" />{" "}
                {isPremiumValue ? "Monthly Price" : "Price / Tag"}
              </label>
              <input
                type="text"
                placeholder={isPremiumValue ? "e.g. $19/mo" : "e.g. Free"}
                className={`w-full px-5 py-4 bg-slate-50 border ${
                  errors.price ? "border-red-400" : "border-slate-200"
                } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all`}
                {...register("price", { required: "Price info is required" })}
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <FiImage className="text-blue-600" /> Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/logo.jpg"
                className={`w-full px-5 py-4 bg-slate-50 border ${
                  errors.image ? "border-red-400" : "border-slate-200"
                } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all`}
                {...register("image", {
                  required: "Valid image URL is required",
                })}
              />
            </div>
          </div>

          {/* --- Owner Name & Email --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Owner Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className={`w-full px-5 py-4 bg-slate-50 border ${
                  errors.ownerName ? "border-red-400" : "border-slate-200"
                } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all`}
                {...register("ownerName", {
                  required: "Owner Name is required",
                })}
              />
            </div>

            {/* Owner Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Owner Email
              </label>
              <input
                type="email"
                placeholder="e.g. john@example.com"
                className={`w-full px-5 py-4 bg-slate-50 border ${
                  errors.ownerEmail ? "border-red-400" : "border-slate-200"
                } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all`}
                {...register("ownerEmail", {
                  required: "Owner Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Detailed Description
            </label>
            <textarea
              rows="4"
              placeholder="Explain the features and benefits of this tool..."
              className={`w-full px-5 py-4 bg-slate-50 border ${
                errors.description ? "border-red-400" : "border-slate-200"
              } rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all resize-none`}
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-slate-900 shadow-indigo-100"
            }`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin text-xl" /> Syncing Data...
              </>
            ) : (
              <>
                <FiPlusCircle className="text-xl" />{" "}
                {isPremiumValue ? "Publish Premium Tool" : "Publish Tool"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
