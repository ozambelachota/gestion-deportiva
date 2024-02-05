import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/login.store";
function ProtectedRouter() {
  const userLogin = useUserStore((state) => state.login);
  useEffect(() => {}, [userLogin]);

  if (userLogin !== "") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default ProtectedRouter;
