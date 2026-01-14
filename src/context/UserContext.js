"use client";
import { createContext, useState } from "react";

export const userContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState();
  const userAuth = { users, setUsers };

  return (
    <userContext.Provider value={userAuth}>{children}</userContext.Provider>
  );
};

export default UserContextProvider;
