import { Route, Routes } from "react-router-dom";
import Admin from "../pages/admin";
import { Fixture } from "../pages/fixture";
import Home from "../pages/home";
import Login from "../pages/login";
import Promocion from "../pages/promocion";
import { RegisterPromocion } from "../pages/register-promocion";
import ProtectedRouter from "./protected.routes";
import TablaFixture from "../components/tabla-fixture";

const FixtureRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRouter />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/registrar-fixture" element={<Fixture />} />
          <Route path="/registrar-promociones" element={<Promocion />} />
          <Route
            path="/registrar-promociones/create/:id"
            element={<RegisterPromocion />}
          />
          <Route path="/admin/home" element={ <TablaFixture /> } />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
export default FixtureRoutes;
