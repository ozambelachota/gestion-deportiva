import { Navigate, Route, Routes } from "react-router-dom";
import FormEditSaancionComponent from "../components/edit-form-sancion.component";
import FixtureCreate from "../components/fixture/fixture-create";
import ResultFixtureFormPage from "../components/fixture/result-fixture-form";
import FormPromocionParticipante from "../components/form-promocion-participante";
import EditjugadorComponent from "../components/nomina/edit-jugador.component";
import TablaFixture from "../components/tabla-fixture";
import GolPage from "../pages/Gol.page";
import Admin from "../pages/admin";
import { FixturePage } from "../pages/fixture";
import { default as SancionPage } from "../pages/gol-sancion";
import Home from "../pages/home";
import Login from "../pages/login";
import NominaPage from "../pages/nomina";
import Promocion from "../pages/promocion";
import { RegisterPromocion } from "../pages/register-promocion";
import ResultPage from "../pages/resultado";
import Sancion from "../pages/sancion";
import TablaPosicionPage from "../pages/tabla-posicion";
import GrupoPosicionComponents from "../pages/tabla-posicion/grupo-posicion.component";
import TablaEditPosicionPage from "../pages/tabla-posicion/tabla-edit.page";
import VoleyPage from "../pages/voley";
import ProtectedRouter from "./protected.routes";
import PosicionEditPage from "../pages/tabla-posicion/posicion-edit-promocion";

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
          <Route path="nomina/:id" element={<NominaPage />} />
          <Route path="nomina/edit/:id" element={<EditjugadorComponent />} />
          <Route
            path="result-fixture/:id"
            element={<ResultFixtureFormPage />}
          />
          <Route path="sancion/create" element={<Sancion />} />
          <Route path="sancion" element={<Sancion />} />
          <Route
            path="sancion/edit/:id"
            element={<FormEditSaancionComponent />}
          />
          <Route
            path="posicionar-promocion"
            element={<TablaEditPosicionPage />}
          />
          <Route
            path="ver-posicion/promocion/grupo/:id"
            element={<GrupoPosicionComponents />}
          />

          <Route
            path="posicion/edit/grupo/:id"
            element={<PosicionEditPage />}
          />

          <Route path="home" element={<TablaFixture />} />
        </Route>
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/posicion" element={<TablaPosicionPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/voley" element={<VoleyPage />} />
        <Route path="/sancion" element={<SancionPage />} />
        <Route path="/goles" element={<GolPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};
export default FixtureRoutes;
