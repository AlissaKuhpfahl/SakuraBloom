import { useAuth } from "../contexts/useAuth.tsx";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) {
      console.log("Protected Layout:useEffect: authloading...return");
      return;
    }
    if (!user) {
      console.log("Protected Layout:useEffect: no user...navigate to login");
      navigate("/login");
    }
  }, [user, navigate, authLoading]);

  if (authLoading) {
    console.log("PL: return <p>Loading...");
    return <p>Loading...</p>;
  }
  if (!user) {
    console.log("PL: No user, return null");
    return null;
  }
  return <Outlet />;
};

export default ProtectedLayout;
