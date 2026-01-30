import type { ReactNode } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext.tsx";

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | User>(null);
  // const [authLoading, setAuthLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
