import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/navbar.component";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type props = {
  children: React.ReactNode;
};

const Layout = ({ children }: props) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
