"use server";

export const getLatest = async () => {
  const res = await fetch(
    `${process.env.NEXT_AUTH_URL || "http://localhost:3000"}/api/latest`
  );
  const data = await res.json();
  return data;
};
