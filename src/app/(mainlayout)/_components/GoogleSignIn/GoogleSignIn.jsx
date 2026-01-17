"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

export default function GoogleSignIn() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/items" });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border rounded-xl"
    >
      {loading ? <FiLoader className="animate-spin" /> : <FcGoogle size={24} />}
      Sign in with Google
    </button>
  );
}
