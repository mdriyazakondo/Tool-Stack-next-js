"use client";

import { singleItem, updateItem } from "@/services/item.server";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiType,
  FiTag,
  FiDollarSign,
  FiImage,
  FiAlignLeft,
  FiLoader,
  FiPlusCircle,
  FiCheckCircle,
  FiStar, // Star icon add kora hoyeche
} from "react-icons/fi";
import Swal from "sweetalert2";

const ItemForm = () => {
  const [success, setSuccess] = useState(false);
  const [singleIte, setSingleIte] = useState({});
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      rating: 5, // Default rating
    },
  });

  const currentRating = watch("rating");

  const onSubmit = async (data) => {
    // Rating number-e convert kora
    const finalData = { ...data, rating: Number(data.rating) };
    const res = await updateItem({ item: finalData, id });

    if (res) {
      Swal.fire({
        icon: "success",
        title: "Item Updated!",
        text: "Your item has been successfully updated.",
        showConfirmButton: false,
        timer: 2000,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/my-items");
      }, 2100);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong while updating the item.",
      });
    }
  };

  // Fetch single item
  useEffect(() => {
    const fetchItem = async () => {
      const res = await singleItem(id);
      setSingleIte(res);
    };
    fetchItem();
  }, [id]);

  // Reset form with fetched data including rating
  useEffect(() => {
    if (singleIte && Object.keys(singleIte).length > 0) {
      reset({
        name: singleIte.name || "",
        category: singleIte.category || "",
        price: singleIte.price
          ? parseFloat(singleIte.price.toString().replace(/[^0-9.-]+/g, ""))
          : 0,
        image: singleIte.image || "",
        description: singleIte.description || singleIte.desc || "",
        rating: singleIte.rating || 5, // Fetch kora rating set hobe
      });
    }
  }, [singleIte, reset]);

  const ErrorMessage = ({ name }) =>
    errors[name] && (
      <span className="text-red-500 text-xs font-semibold ml-2 animate-pulse">
        *{errors[name].message}
      </span>
    );

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10 animate-in fade-in duration-700">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Update <span className="text-indigo-600">Product</span>
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          Modify the details below to update your item information.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/60 relative overflow-hidden">
        {success && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg shadow-emerald-100">
              <FiCheckCircle />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Updated!</h2>
            <p className="text-slate-500 font-medium mt-1 text-center px-6">
              Redirecting to your inventory...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating Selection Section */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <FiStar className="text-amber-500 fill-amber-500" /> Item Rating
            </label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  className={`text-3xl transition-all transform hover:scale-110 ${
                    star <= currentRating ? "text-amber-400" : "text-slate-300"
                  }`}
                >
                  <FiStar
                    fill={star <= currentRating ? "currentColor" : "none"}
                  />
                </button>
              ))}
              <span className="ml-4 font-black text-slate-600 bg-white px-4 py-1 rounded-full border border-slate-200 shadow-sm">
                {currentRating}.0
              </span>
            </div>
            <input type="hidden" {...register("rating")} />
          </div>

          {/* Item Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <FiType className="text-indigo-600" /> Item Name{" "}
              <ErrorMessage name="name" />
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="e.g. Mechanical Keyboard"
              className={`w-full px-5 py-4 bg-slate-50 border ${
                errors.name
                  ? "border-red-400 focus:ring-red-50"
                  : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-50"
              } rounded-2xl focus:ring-4 outline-none transition-all`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <FiTag className="text-emerald-600" /> Category{" "}
                <ErrorMessage name="category" />
              </label>
              <input
                {...register("category", { required: "Category is required" })}
                placeholder="Electronics"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
              />
            </div>

            {/* Price Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <FiDollarSign className="text-amber-600" /> Price (USD){" "}
                <ErrorMessage name="price" />
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                placeholder="0.00"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Image URL Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <FiImage className="text-blue-600" /> Image URL
            </label>
            <input
              {...register("image")}
              placeholder="https://example.com/image.jpg"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <FiAlignLeft className="text-indigo-600" /> Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Write detailed specifications..."
              rows={4}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-2xl font-black text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-slate-900 shadow-indigo-100"
            }`}
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin text-xl" /> Processing...
              </>
            ) : (
              <>
                <FiPlusCircle className="text-xl" /> Update Item
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
