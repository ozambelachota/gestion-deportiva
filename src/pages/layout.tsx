import "@fontsource/poppins";
import { CssBaseline, LinearProgress, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/navbar.component";
import { nombreCampeonato } from "../services/api.service";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "indigo",
      paper: "#111827",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

type props = {
  children: React.ReactNode;
};

const Layout = ({ children }: props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campeonaato", 1],
    queryFn: () => nombreCampeonato(1),
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <div className="flex justify-center items-center flex-col md:flex-row m-0">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-40 h-40 m-0"
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
            variant="h2"
            sx={{
              fontFamily: "Warnes",
              fontSize: "2.7rem",
              color: "#fff",
              textAlign: "center",
              textShadow:
                "2px 2px 5px rgba(255, 255, 0, 1), 4px 4px 10px rgba(255, 255, 0, 0.8)",
              transform: "rotateX(20deg) rotateY(10deg)",
            }}
          >
            {data}
          </Typography>
        )}
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-40 h-40 m-0"
            src="LOGO-EXAFAM.webp"
            alt="logo exafam"
          />
          <img src="trofeo.png" className="w-20 h-20" alt="" />
        </div>
        <div className="custom-shape-divider-top-1712936773">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <CssBaseline />
      <div>{children}</div>
    </ThemeProvider>
  );
};

export default Layout;
