import {
  AccountCircle,
  CalendarMonth as CalendarMonthIcon,
  SportsSoccer as SportsSoccerIcon,
  SportsVolleyball as SportsVolleyballIcon,
} from "@mui/icons-material";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import {
  AppBar,
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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

export default function Navbar() {
  return (
    <Box className="flex flex-col md:flex-row">
      <CssBaseline />
      <AppBar position="sticky" component="nav" color="transparent">
        <Toolbar className="flex flex-col md:flex-row justify-center md:justify-between items-center p-0 h-auto md:h-16">
          <List className="flex flex-col md:flex-row p-0">
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                className="flex items-center p-2 md:p-4 text-white hover:bg-gray-700"
              >
                <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
                <RouterLink to={item.to} className="text-white">
                  {item.text}
                </RouterLink>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
