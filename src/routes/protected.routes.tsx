import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/login.store";

function ProtectedRouter() {
  const ADMIN_ROL = "admin";
  const rol = useUserStore((state) => state.rol);
  useEffect(() => {}, [rol]);

  if (true) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default ProtectedRouter;
