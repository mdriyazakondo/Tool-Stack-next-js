"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

const GoogleSignIn = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/items" });
    } catch (error) {
      console.error("Google Login Error:", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-slate-400 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 group"
      >
        {isGoogleLoading ? (
          <FiLoader className="animate-spin text-xl text-slate-500" />
        ) : (
          <>
            <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
            <span className="text-slate-700 font-bold">
              Sign in with Google
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default GoogleSignIn;
