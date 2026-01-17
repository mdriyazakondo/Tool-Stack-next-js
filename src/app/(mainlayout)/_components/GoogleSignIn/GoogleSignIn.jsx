"use client";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { createUser } from "@/services/user.service";

export default function GoogleSignIn() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const logInData = session?.user;

  const userData = {
    email: logInData?.email,
    photo: logInData?.image,
    name: logInData?.name,
    role: logInData?.role,
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    const dataUser = await signIn("google", { callbackUrl: "/" });
    const res = await createUser(userData);
    console.log(dataUser, "data");
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
