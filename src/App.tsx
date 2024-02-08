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
  },
});
const queryClient = new QueryClient();

function App() {
  const user = useUserStore((state) => state.username);

  useEffect(() => {}, [user]);
  return (
    <>
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-radial-gradient"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-radial-gradient"></div>
        <Container sx={{ width: "100%", height: "100vh" }} maxWidth="lg">
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
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
      </div>
    </>
  );
}

export default App;
