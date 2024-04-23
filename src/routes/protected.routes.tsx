import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/login.store";

const ROL = "admin";
function ProtectedRouter() {
  const { rol, username } = useUserStore();

  useEffect(() => {
    if (!rol) {
      sessionStorage.removeItem("userStore");
    }
  }, [username]);

  if (username && rol === ROL) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default ProtectedRouter;
