import { AccountCircle } from "@mui/icons-material";
import { AppBar, Button, Toolbar, useMediaQuery } from "@mui/material";
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
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            padding: isMobile ? "10px 0" : "10px",
            fontSize: isMobile ? "1rem" : "1.2rem",
            border: "1px solid #fff",
            margin: "2px",
          }}
        >
          Futbol
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/voley"
          sx={{
            padding: isMobile ? "10px 0" : "10px",
            fontSize: isMobile ? "1rem" : "1.2rem",
            border: "1px solid #fff",
            margin: "2px",
          }}
        >
          Voley y Voley Mixto
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{
            padding: isMobile ? "10px 0" : "10px",
            fontSize: isMobile ? "1rem" : "1.2rem",
            border: "1px solid #fff",
            margin: "2px",
          }}
        >
          <AccountCircle />
          Iniciar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
