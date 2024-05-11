import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import es from "date-fns/locale/es";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FixtureRoutes from "./routes/fixture.routes";
import { useUserStore } from "./store/login.store";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "bg-slate-950",
    },
  },
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const setUser = useUserStore((state) => state.setUserData);
  const navigate = useNavigate();
  const rol = useUserStore((state) => state.rol);
  const user = useUserStore((state) => state.username);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const { username, profilePicture, login, id_user } = JSON.parse(userData);
      setUser(username, profilePicture, login, id_user);
  
       sessionStorage.removeItem('userData');
    }
  }, [user]);
  if(rol) {
    navigate("/admin/home", { replace: true });
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <ThemeProvider theme={darkTheme}>
            <FixtureRoutes />
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
