"use server";

export const createUser = async (userData) => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUser = async (email) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users?email=${email}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUserAll = async (email) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users?email=${email}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
