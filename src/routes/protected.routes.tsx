import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/login.store";

const ADMIN_ROL = "admin";

function ProtectedRouter() {
  const rol = useUserStore((state) => state.rol);
  useEffect(() => {}, [rol]);

  if (rol === ADMIN_ROL) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default ProtectedRouter;
