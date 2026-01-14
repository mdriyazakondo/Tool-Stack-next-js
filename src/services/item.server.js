"use server";
export const createItem = async (item) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_AUTH_URL || "http://localhost:3000"}/api/add-item`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
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

export const getAllItems = async () => {
  const res = await fetch(
    `${process.env.NEXT_AUTH_URL || "http://localhost:3000"}/api/add-item`
  );
  const data = await res.json();
  return data;
};

export const singleItem = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_AUTH_URL || "http://localhost:3000"}/api/add-item/${id}`
  );
  const data = await res.json();
  return data;
};

export const updateItem = async ({ item, id }) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_AUTH_URL || "http://localhost:3000"
      }/api/add-item/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
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

export const deleteItem = async (id) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_AUTH_URL || "http://localhost:3000"
      }/api/add-item/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete the item");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: error.message };
  }
};
