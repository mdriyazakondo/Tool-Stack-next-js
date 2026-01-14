"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
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
import Swal from "sweetalert2";
import GoogleSignIn from "../_components/GoogleSignIn/GoogleSignIn";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid email or password.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      setIsLoading(false);
    } else {
      Swal.fire({
        title: "Success 🎉",
        text: "Login Successful!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    if (res?.error) {
      setError("Invalid email or password.");
      setIsLoading(false);
    } else {
      router.push("/items");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-xl px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-6">
            <RiLayoutGridFill className="text-3xl text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-3 text-slate-500 font-medium">Login to ToolStack</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:rounded-[2.5rem] border border-white">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl font-semibold">
                {error}
              </div>
            )}

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

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-4 text-xl text-slate-400 group-focus-within:text-indigo-600" />
                <input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-3 py-4 rounded-2xl bg-indigo-600 text-white font-bold"
            >
              {isLoading ? <FiLoader className="animate-spin" /> : "Sign In"}
            </button>
          </form>

          <div className="mt-10 text-center mb-6">
            <p className="text-sm text-slate-500 font-medium">
              New account?
              <Link
                href="/register"
                className="text-indigo-600 font-extrabold ml-1"
              >
                Create
              </Link>
            </p>
          </div>
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
