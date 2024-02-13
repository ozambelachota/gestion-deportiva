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
        backgroundColor: "#001F3F", // Color azul noche
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
          to="/resultado"
          sx={{
            padding: isMobile ? "5px 0" : "8px", // Ajuste en el padding para hacerlo más pequeño
            fontSize: isMobile ? "0.7rem" : "1rem", // Ajuste en el tamaño de la fuente
            border: "1px solid #fff",
            margin: "2px",
          }}
        >
          Resultados fecha anterior
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/posicion"
          sx={{
            padding: isMobile ? "5px 0" : "8px",
            fontSize: isMobile ? "0.7rem" : "1rem",
            border: "1px solid #fff",
            margin: "2px",
          }}
        >
          Tabla de posiciones
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            padding: isMobile ? "5px 0" : "8px",
            fontSize: isMobile ? "0.7rem" : "1rem",
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
            padding: isMobile ? "5px 0" : "8px",
            fontSize: isMobile ? "0.7rem" : "1rem",
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
            padding: isMobile ? "5px 0" : "8px",
            fontSize: isMobile ? "0.7rem" : "1rem",
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
