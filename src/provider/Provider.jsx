"use client";
import { SessionProvider } from "next-auth/react";
import UserContextProvider from "@/context/UserContext";

const Provider = ({ children }) => {
  return (
    <div>
      <SessionProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </SessionProvider>
    </div>
  );
};

export default Provider;
