import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.tsx";
import { refresh, getMe } from "../data/auth.ts";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | User>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const refreshLogin = async () => {
      try {
        setAuthLoading(true);
        await refresh();
        console.log("Token refreshed");
        const { user } = await getMe();
        console.log("Refresh: Fetched user:", user);
        setUser(user);
      } catch (error) {
        console.log("Refresh: ", error);
      } finally {
        setAuthLoading(false);
      }
    };
    refreshLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
