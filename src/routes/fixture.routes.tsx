import { Route, Routes } from "react-router-dom";
import TablaFixture from "../components/tabla-fixture";
import Admin from "../pages/admin";
import { FixturePage } from "../pages/fixture";
import Home from "../pages/home";
import Login from "../pages/login";
import Promocion from "../pages/promocion";
import { RegisterPromocion } from "../pages/register-promocion";
import Sancion from "../pages/sancion";
import ProtectedRouter from "./protected.routes";

const FixtureRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRouter />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/registrar-fixture" element={<FixturePage />} />
          <Route path="/registrar-promociones" element={<Promocion />} />
          <Route
            path="/registrar-promociones/create/:id"
            element={<RegisterPromocion />}
          />
          <Route path="/sancion" element={<Sancion />} />
          <Route path="/admin/home" element={<TablaFixture />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
export default FixtureRoutes;
