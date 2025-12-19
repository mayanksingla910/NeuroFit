import { createContext } from "react";
import type { UserType } from "@/types/user";

export type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: {
    name: "",
    email: "",
    username: "",
    onboarded: false,
  },
  setUser: () => {},
  loading: false,
});
