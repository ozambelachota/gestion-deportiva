import { CssBaseline, LinearProgress, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/navbar.component";
import { nombreCampeonato } from "../services/api.service";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#240747",
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
      <Navbar />
      <div className="flex justify-center items-center flex-col md:flex-row m-0">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-60 h-60 m-0 p-2"
            src="LOGO-EXAFAM.webp"
            alt="logo exafam"
          />
          <img src="trofeo.png" className="w-20 h-20" alt="" />
        </div>
        {isLoading && <LinearProgress color="success" />}
        {isError && <div>Error</div>}
        {data && (
          <Typography
            className="m-0"
            color={"yellow"}
            variant="h3"
            textAlign={"center"}
          >
            {data}
          </Typography>
        )}
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-60 h-60 m-0 p-2"
            src="LOGO-EXAFAM.webp"
            alt="logo exafam"
          />
          <img src="trofeo.png" className="w-20 h-20" alt="" />
        </div>
      </div>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
