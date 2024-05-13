import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import es from "date-fns/locale/es";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clientApi } from "./api/client.api";
import FixtureRoutes from "./routes/fixture.routes";
import { userAdmin } from "./services/api.service";
import { useUserStore } from "./store/login.store";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
    clientApi.auth.getSession().then(({ data }) => {
      if (data.session) {
        userAdmin(data.session.user.id).then((rol) => {
          setUser(
            data.session.user.user_metadata.full_name,
            data.session.user.user_metadata.picture,
            rol,
            data.session.user.id
          );
        });
        if (rol === "admin") navigate("/admin/home", { replace: true });
        
      }
    });
  }, [user]);

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
