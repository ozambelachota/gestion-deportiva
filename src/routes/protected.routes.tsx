import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/login.store";

function ProtectedRouter() {
  const { setUserData, username } = useUserStore();

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const { username, profilePicture, login, id_user } = JSON.parse(userData);
      setUserData(username, profilePicture, login, id_user);
    }
  }, [username]);

  if (username) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default ProtectedRouter;
