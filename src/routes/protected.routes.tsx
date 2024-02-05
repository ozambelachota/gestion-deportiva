import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/login.store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ProtectedRouter() {
  const rol = useUserStore((state) => state.rol);
  useEffect(() => {}, [rol]);

  if (rol === "admin") {
    return (
      <ThemeProvider theme={darkTheme}>
        <Outlet />
      </ThemeProvider>
    );
  }
  return <Navigate to="/" />;
}

export default ProtectedRouter;
