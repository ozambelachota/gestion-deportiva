import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import NavbarAdmin from "../components/navbar-admin";

type props = {
  children?: React.ReactNode;
};
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})
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
