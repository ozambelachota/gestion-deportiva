import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar
      position="static"
      sx={{
        margin: "5px",
        backgroundColor: "darkgreen",
        borderBottom: "1px solid #fff",
        borderRadius: "5px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Centro los elementos horizontalmente
          padding: "0",
          flexDirection: isMobile ? "column" : "row", // Alineación vertical en dispositivos móviles
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            padding: isMobile ? "10px 0" : "10px",
            fontSize: isMobile ? "1.2rem" : "1.5rem",
            textAlign: isMobile ? "center" : "left", // Alineación centrada en dispositivos móviles
          }}
        >
          Exafam Fixture
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{
            padding: isMobile ? "10px 0" : "10px",
            fontSize: isMobile ? "1rem" : "1.2rem",
            border: "1px solid #fff",
          }}
        >
          Iniciar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
