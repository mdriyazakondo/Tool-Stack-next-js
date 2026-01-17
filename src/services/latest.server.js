"use server";

export const getLatest = async () => {
  const res = await fetch(
    `${process.env.NEXT_AUTH_URL || "https://tools-stack.vercel.app"}/api/latest`,
  );
  const data = await res.json();
  return data;
};
