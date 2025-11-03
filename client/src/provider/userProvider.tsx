import { UserContext } from "@/context/userContext";
import type { UserType } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    username: "",
    onboarded: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
