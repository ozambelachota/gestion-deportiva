import React from "react";
import NavbarAdmin from "../components/navbar-admin";


type props = {
  children?: React.ReactNode;
};
const LayoutAdmin = ({ children }: props) => {
  return (
    <>
        <NavbarAdmin />
        <div style={{ marginTop: "80px" }}>{children}</div>
    </>
  );
};

export default LayoutAdmin;
