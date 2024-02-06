import { CssBaseline, LinearProgress, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/navbar.component";
import { nombreCampeonato } from "../services/api.service";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
