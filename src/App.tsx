import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import es from "date-fns/locale/es";
import "./App.css";
import Layout from "./pages/layout";
import LayoutAdmin from "./pages/layout-admin";
import FixtureRoutes from "./routes/fixture.routes";
import { useUserStore } from "./store/login.store";

function App() {
  const user = useUserStore((state) => state.username);

  return (
    <>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
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
        </LocalizationProvider>
      </Container>
    </>
  );
}

export default App;
