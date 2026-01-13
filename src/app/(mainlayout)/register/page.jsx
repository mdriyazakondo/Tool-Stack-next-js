"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiLoader,
  FiCheckCircle,
} from "react-icons/fi";
import { RiLayoutGridFill } from "react-icons/ri";
import Link from "next/link";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate Registration API Call
    setTimeout(() => {
      if (formData.email.includes("@")) {
        // সফল রেজিস্ট্রেশন সিমুলেশন
        router.push("/login");
      } else {
        setError("Something went wrong. Please check your details.");
        setIsLoading(false);
      }
    }, 1800);
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
          <form className="space-y-5" onSubmit={handleRegister}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl font-semibold flex items-center gap-3">
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-indigo-600 text-slate-400 transition-colors">
                  <FiUser className="text-xl" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none placeholder:text-slate-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Work Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-indigo-600 text-slate-400 transition-colors">
                  <FiMail className="text-xl" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none placeholder:text-slate-400"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-indigo-600 text-slate-400 transition-colors">
                  <FiLock className="text-xl" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none placeholder:text-slate-400"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-xl" />
                  ) : (
                    <FiEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-3 py-4.5 px-4 rounded-2xl shadow-xl shadow-indigo-100 text-base font-bold text-white transition-all duration-300 transform active:scale-[0.98] ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-slate-900 hover:shadow-indigo-200"
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

          {/* Footer Link */}
          <div className="mt-8 text-center border-t border-slate-100 pt-8">
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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
