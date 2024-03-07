import { CssBaseline, LinearProgress, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/navbar.component";
import { nombreCampeonato } from "../services/api.service";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#191f2c",
    },
  },
});

type props = {
  children: React.ReactNode;
};

const Layout = ({ children }: props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campeonaato", 2],
    queryFn: () => nombreCampeonato(2),
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Typography color={"white"} textAlign={"center"} variant="h4">
        EXAFAM Calendario
      </Typography>
      <CssBaseline />
      {isLoading && <LinearProgress color="success" />}
      {isError && <div>Error</div>}
      {data && (
        <Typography variant="h4" textAlign={"center"}>
          {data}
        </Typography>
      )}
      <Navbar />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
