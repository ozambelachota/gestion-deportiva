import  { useState } from 'react';
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
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

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
  { text: "Futbol", to: "/", icon: <SportsSoccerIcon color="success" /> },
  {
    text: "Voley y Voley Mixto",
    to: "/voley",
    icon: <SportsVolleyballIcon />,
  },
  {
    text: "Goleadores",
    to: "/goles",
    icon: <SportsSoccerIcon color="warning" />,
  },
  {
    text: "Sanciones",
    to: "/sancion",
    icon: <SportsSoccerIcon color="error" />,
  },
  { text: "Iniciar sesión", to: "/login", icon: <AccountCircle /> },
];

export default function Navbar(props: Props) {
  const { window } = props;
  const isMobile = useMediaQuery("(max-width:800px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        EXAFAM
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.to}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="sticky" component="nav" color="secondary">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            flexDirection: isMobile ? "column" : "row",
            backgroundColor: "indigo",
            opacity: 0.7,
            color: "#fff",
            transition: "height 0.3s ease",
            gap: "1rem",
            height: "0.2em",
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
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
                    fontSize: "1rem",
                    color: "#fff",
                    border: "1px solid #fff",
                    margin: "15px",
                    ":hover": {
                      backgroundColor: "#cccccc",
                    },
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
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
