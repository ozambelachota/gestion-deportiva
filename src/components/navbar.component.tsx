import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ margin: "10px" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography
          align="center"
          sx={{ color: "black" }}
          variant="h6"
          component={Link}
          to="/"
        >
          Exafam Fixture
        </Typography>
        <Button color="inherit" component={Link} to="/login">
          Iniciar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
