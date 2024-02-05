import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/login.store";

function ProtectedRouter() {
  const rol = useUserStore((state) => state.rol);
  useEffect(() => {}, [rol]);

  if (rol === "admin") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default ProtectedRouter;
