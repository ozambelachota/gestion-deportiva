import { Navigate, Route, Routes } from "react-router-dom";
import FixtureCreate from "../components/fixture/fixture-create";
import ResultFixtureFormPage from "../components/fixture/result-fixture-form";
import FormPromocionParticipante from "../components/form-promocion-participante";
import TablaFixture from "../components/tabla-fixture";
import Admin from "../pages/admin";
import { FixturePage } from "../pages/fixture";
import GolSancionPage from "../pages/gol-sancion";
import Home from "../pages/home";
import Login from "../pages/login";
import Promocion from "../pages/promocion";
import { RegisterPromocion } from "../pages/register-promocion";
import ResultPage from "../pages/resultado";
import Sancion from "../pages/sancion";
import TablaPosicionPage from "../pages/tabla-posicion";
import VoleyPage from "../pages/voley";
import ProtectedRouter from "./protected.routes";

const FixtureRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<ProtectedRouter />}>
          <Route path="home" element={<Admin />} />
          <Route path="registrar-fixture" element={<FixturePage />} />
          <Route path="registrar-promociones" element={<Promocion />} />
          <Route
            path="registrar-promociones/create/:id"
            element={<RegisterPromocion />}
          />
          <Route path="fixture/create" element={<FixtureCreate />} />
          <Route
            path="promocion/create"
            element={<FormPromocionParticipante />}
          />
          <Route
            path="result-fixture/:id"
            element={<ResultFixtureFormPage />}
          />
          <Route path="sancion/create" element={<Sancion />} />
          <Route path="sancion" element={<Sancion />} />
          <Route path="home" element={<TablaFixture />} />
        </Route>
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/posicion" element={<TablaPosicionPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/voley" element={<VoleyPage />} />
        <Route path="/goles-sancion" element={<GolSancionPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};
export default FixtureRoutes;
