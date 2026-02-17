import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  authLoading: boolean;
  refreshUser: boolean;
  setRefreshUser: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
