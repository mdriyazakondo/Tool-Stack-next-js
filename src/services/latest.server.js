"use server";

export const getLatest = async () => {
  const res = await fetch(`https://tools-stack.vercel.app/api/latest`);
  const data = await res.json();
  return data;
};
