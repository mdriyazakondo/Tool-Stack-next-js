"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiLoader,
} from "react-icons/fi";
import { RiLayoutGridFill } from "react-icons/ri";
import Link from "next/link";
import { createUser } from "@/services/user.service";
import GoogleSignIn from "../_components/GoogleSignIn/GoogleSignIn";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await createUser({ ...data, role: "user", date: new Date() });
      console.log(res);
      if (res?.user?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been created successfully.",
          showConfirmButton: true,
        }).then(() => {
          router.push("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.message || "Failed to create account",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-xl px-6 py-12">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl shadow-xl mb-6"
          >
            <RiLayoutGridFill className="text-2xl text-white" />
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-slate-500 font-medium">
            Start your 14-day free trial. No credit card required.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:rounded-[2.5rem] sm:px-12 border border-white">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-4 text-xl text-slate-400 group-focus-within:text-indigo-600" />
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none"
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="text-rose-600 text-sm font-medium mt-1 ml-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Photo Url
              </label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-4 text-xl text-slate-400 group-focus-within:text-indigo-600" />
                <input
                  {...register("photo", {
                    required: "Photo is required",
                  })}
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none"
                  placeholder="photo url"
                />
              </div>
              {errors.photo && (
                <p className="text-rose-600 text-sm font-medium mt-1 ml-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Work Email
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-4 text-xl text-slate-400 group-focus-within:text-indigo-600" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format",
                    },
                  })}
                  type="email"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none"
                  placeholder="john@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-rose-600 text-sm font-medium mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-4 text-xl text-slate-400 group-focus-within:text-indigo-600" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-xl text-slate-400 hover:text-indigo-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-600 text-sm font-medium mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-3 py-4 rounded-2xl text-base font-bold text-white transition-all ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-slate-900"
              }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin text-xl" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <FiArrowRight className="text-xl" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-8 mb-6">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 font-extrabold hover:underline underline-offset-4 decoration-2"
              >
                Sign In
              </Link>
            </p>
          </div>
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
