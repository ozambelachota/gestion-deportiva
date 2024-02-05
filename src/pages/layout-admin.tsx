import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import NavbarAdmin from "../components/navbar-admin";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type props = {
  children?: React.ReactNode;
};
const LayoutAdmin = ({ children }: props) => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <NavbarAdmin />
        <div style={{ marginTop: "80px" }}>{children}</div>
      </ThemeProvider>
    </>
  );
};

export default LayoutAdmin;
