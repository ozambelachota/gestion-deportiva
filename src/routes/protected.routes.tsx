import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUserStore } from "../store/login.store";

function ProtectedRouter() {
  const { rol, username } = useUserStore();

  useEffect(() => {
    const { admin } = JSON.parse(sessionStorage.getItem("userData") || "{}");
    if (!rol || !admin) {
      sessionStorage.removeItem("userStore");
    }
  }, [username]);

  return <Outlet />;
}

export default ProtectedRouter;
