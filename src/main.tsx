import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Helmet } from "react-helmet";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <Helmet>
      <meta charSet="utf-8" />
      <title>EXAFAM FIXTURE</title>
      <meta name="description" content="sistema de emparejamiento deportivo" />
      <meta property="og:title" content="EXAFAM FIXTURE"/>
      <meta property="og:description" content="deporte examenes" />
      <meta property="og:image" content="LGOO-EXAFAM.webp" />
      <meta property="og:url" content="https://exafam-fixture.netlify.app/" />
      <meta property="og:type" content="website" />
    </Helmet>
    <BrowserRouter basename="/"> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
