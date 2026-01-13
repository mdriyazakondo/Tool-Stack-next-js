"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiLoader,
  FiShield,
} from "react-icons/fi";
import { RiLayoutGridFill } from "react-icons/ri";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const MOCK_EMAIL = "admin@toolstack.com";
    const MOCK_PASSWORD = "password123";

    // Simulate network delay
    setTimeout(() => {
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        document.cookie = "isLoggedIn=true; path=/; max-age=3600";
        router.push("/items");
      } else {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-xl px-6">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <RiLayoutGridFill className="text-3xl text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-3 text-slate-500 font-medium">
            Please enter your details to sign in to ToolStack
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:rounded-[2.5rem] sm:px-12 border border-white">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl font-semibold flex items-center gap-3 animate-shake">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-indigo-600 text-slate-400 transition-colors">
                  <FiMail className="text-xl" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none placeholder:text-slate-400 hover:bg-white"
                  placeholder="admin@toolstack.com"
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none placeholder:text-slate-400 hover:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-xl" />
                  ) : (
                    <FiEye className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer"
                  />
                  <FiShield className="absolute h-3 w-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="ml-3 text-sm text-slate-500 group-hover:text-slate-700 transition-colors font-medium">
                  Remember device
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
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
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In{" "}
                  <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New account ?{" "}
              <Link
                href={"/register"}
                className="text-indigo-600 font-extrabold cursor-pointer hover:underline underline-offset-4 decoration-2 ml-1"
              >
                Create
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
