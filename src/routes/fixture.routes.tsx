import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Convertir las importaciones a React.lazy
const FormEditSaancionComponent = React.lazy(
  () => import("../components/edit-form-sancion.component")
);
const FixtureCreate = React.lazy(
  () => import("../components/fixture/fixture-create")
);
const ResultFixtureFormPage = React.lazy(
  () => import("../components/fixture/result-fixture-form")
);
const FormPromocionParticipante = React.lazy(
  () => import("../components/form-promocion-participante")
);
const EditjugadorComponent = React.lazy(
  () => import("../components/nomina/edit-jugador.component")
);

const GolPage = React.lazy(() => import("../pages/Gol.page"));
const Admin = React.lazy(() => import("../pages/admin"));
const FixturePage = React.lazy(() =>
  import("../pages/fixture").then((module) => ({ default: module.FixturePage }))
);
const SancionPage = React.lazy(() => import("../pages/gol-sancion"));
const Home = React.lazy(() => import("../pages/home"));
const Layout = React.lazy(() => import("../pages/layout"));
const LayoutAdmin = React.lazy(() => import("../pages/layout-admin"));
const Login = React.lazy(() => import("../pages/login"));
const NominaPage = React.lazy(() => import("../pages/nomina"));
const Promocion = React.lazy(() => import("../pages/promocion"));
const RegisterPromocion = React.lazy(() =>
  import("../pages/register-promocion").then((module) => ({
    default: module.RegisterPromocion,
  }))
);
const ResultPage = React.lazy(() => import("../pages/resultado"));
const Sancion = React.lazy(() => import("../pages/sancion"));
const TablaPosicionPage = React.lazy(() => import("../pages/tabla-posicion"));
const GrupoPosicionComponents = React.lazy(
  () => import("../pages/tabla-posicion/grupo-posicion.component")
);
const PosicionEditPage = React.lazy(
  () => import("../pages/tabla-posicion/posicion-edit-promocion")
);
const TablaEditPosicionPage = React.lazy(
  () => import("../pages/tabla-posicion/tabla-edit.page")
);
const VoleyPage = React.lazy(() => import("../pages/voley"));
const TablaVoleyPage = React.lazy(() =>
  import("../pages/voley-posicion/voley-tabla.page").then((module) => ({
    default: module.TablaVoleyPage,
  }))
);

const EditedPartido = React.lazy(() =>
  import("../pages/partido/edit-partido.page").then((module) => ({
    default: module.EditedPartido,
  }))
);
const RoutePublic = () => {
  return (
    <Suspense
      fallback={
        <div className="h-dvh w-dvw flex justify-center items-center bg-fuchsia-950">
          <CircularProgress
            color="primary"
            className="flex justify-center align-items-center h-screen"
          />
        </div>
      }
    >
      <Layout>
        <Routes>
          <Route path="/resultado" element={<ResultPage />} />
          <Route path="/posicion" element={<TablaPosicionPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/voley" element={<VoleyPage />} />
          <Route path="/sancion" element={<SancionPage />} />
          <Route path="/goles" element={<GolPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

const RouterPrivate = () => {
  return (
    <Suspense
      fallback={
        <div className="w-dvw h-dvh flex justify-center items-center bg-fuchsia-950">
          <CircularProgress
            color="success"
            className="flex justify-center align-items-center h-screen"
          />
        </div>
      }
    >
      <LayoutAdmin>
        <Routes>
          <Route index element={<Admin />} />
          <Route path="registrar-fixture" element={<FixturePage />} />
          <Route path="registrar-promociones" element={<Promocion />} />
          <Route
            path="registrar-promociones/create/:id"
            element={<RegisterPromocion />}
          />
          <Route path="partido/:id" element={<EditedPartido />} />
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
          <Route path="voley/:deporte" element={<TablaVoleyPage />} />
          <Route
            path="posicion/edit/grupo/:id"
            element={<PosicionEditPage />}
          />
        </Routes>
      </LayoutAdmin>
    </Suspense>
  );
};

const FixtureRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="*" element={<RoutePublic />} />
        <Route path="admin/*" element={<RouterPrivate />} />
      </Routes>
    </Suspense>
  );
};

export default FixtureRoutes;
