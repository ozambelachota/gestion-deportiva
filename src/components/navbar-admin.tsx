import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../services/api.service";
import { useUserStore } from "../store/login.store";

const NavbarAdmin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.username);
  const setUser = useUserStore((state) => state.setUserData);
  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const error = await signOut();

    if (error) {
      console.log(error);
      return;
    } else {
      navigate("/", { replace: true });
      setUser("", "", "", "");
    }

    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="primary" position="fixed" style={{ zIndex: 1101 }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            EXAFAM FIXTURE
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/admin/registrar-fixture"
          >
            Registrar Fixture
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="admin/registrar-promociones"
          >
            Registrar Participantes
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="admin/posicionar-promocion"
          >
            posiciones de grupos
          </Button>
          <Button color="inherit" component={Link} to="admin/sancion">
            Jugadores Sancionados
          </Button>
          <Button color="inherit" onClick={handleMenuClick}>
            {user}
          </Button>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>{user}</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
      </Menu>
    </>
  );
};

export default NavbarAdmin;
