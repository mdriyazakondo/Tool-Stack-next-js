"use server";
export const createItem = async (item) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_AUTH_URL || "https://tools-stack.vercel.app"}/api/my-orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      },
    );
    if (!res.ok) {
      throw new Error("Failed to create item");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("createItem Error:", error);
    return { success: false, message: error.message };
  }
};
