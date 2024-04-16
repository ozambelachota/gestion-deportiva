import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    const userData = sessionStorage.getItem('userData')
    if(userData){
      const { username, profilePicture, login, id_user } = JSON.parse(userData)
      setUser(username, profilePicture, login, id_user)
    }
    if (!user) {
      navigate("/", { replace: true });
    }
  }, []);

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
      sessionStorage.removeItem("userData");
    }

    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="secondary" position="fixed" style={{ zIndex: 1101 }}>
        <Toolbar sx={{display:'flex', justifyContent: 'space-between' }}>
          <Button
            color="inherit"
            component={Link}
            to="/admin/home"
          >
            EXAFAM FIXTURE
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/admin/registrar-fixture"
          >
            Registrar Fixture
          </Button>
          <Button color="inherit" component={Link} to="registrar-promociones">
            Registrar Participantes
          </Button>
          <Button color="inherit" component={Link} to="posicionar-promocion">
            posiciones de grupos
          </Button>
          <Button color="inherit" component={Link} to="sancion">
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
