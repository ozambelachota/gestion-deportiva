import {
  AccountCircle,
  CalendarMonth as CalendarMonthIcon,
  Menu as MenuIcon,
  SportsSoccer as SportsSoccerIcon,
  SportsVolleyball as SportsVolleyballIcon,
} from "@mui/icons-material";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    {
      text: "Resultados fecha anterior",
      to: "/resultado",
      icon: <CalendarMonthIcon />,
    },
    {
      text: "Tabla de posiciones",
      to: "/posicion",
      icon: <AlignVerticalBottomIcon />,
    },
    { text: "Futbol", to: "/", icon: <SportsSoccerIcon /> },
    {
      text: "Voley y Voley Mixto",
      to: "/voley",
      icon: <SportsVolleyballIcon />,
    },
    { text: "Goleadores y sancionados", to: "/goles-sancion" },
    { text: "Iniciar sesión", to: "/login", icon: <AccountCircle /> },
  ];

  return (
    <AppBar position="sticky" className="w-full " color="secondary">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Centro los elementos horizontalmente
          padding: "0",
          flexDirection: isMobile ? "column" : "row", // Alineación vertical en dispositivos móviles
        }}
      >
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: isMobile ? "100%" : "auto",
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={RouterLink}
                to={item.to}
                onClick={toggleDrawer(false)}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        {!isMobile && (
          <>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.to}
                sx={{
                  padding: "5px 0",
                  fontSize: "0.8rem",
                  border: "1px solid #fff",
                  margin: "2px",
                }}
              >
                {item.icon}
                {item.text}
              </Button>
            ))}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
