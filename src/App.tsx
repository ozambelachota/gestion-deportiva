import { Container, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import es from "date-fns/locale/es";
import { useEffect } from "react";
import "./App.css";
import Layout from "./pages/layout";
import LayoutAdmin from "./pages/layout-admin";
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
const queryClient = new QueryClient();

function App() {
  const user = useUserStore((state) => state.username);

  useEffect(() => {}, [user]);
  return (
    <>
      <Container sx={{ width: "100%", height: "100vh" }} maxWidth="lg">
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <ThemeProvider theme={darkTheme}>
              {user && (
                <LayoutAdmin>
                  <FixtureRoutes />
                </LayoutAdmin>
              )}
              {!user && (
                <Layout>
                  <FixtureRoutes />
                </Layout>
              )}
            </ThemeProvider>
          </LocalizationProvider>
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
