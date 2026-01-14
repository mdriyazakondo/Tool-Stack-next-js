"use client";

import { userContext } from "@/context/UserContext";
import { getUser } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";

const useUser = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const { users, setUsers } = useContext(userContext);

  useEffect(() => {
    if (!email) return;
    const fetchUser = async () => {
      const data = await getUser(email);
      setUsers(data);
    };

    fetchUser();
  }, [email, setUsers]);

  return { users, status };
};

export default useUser;
