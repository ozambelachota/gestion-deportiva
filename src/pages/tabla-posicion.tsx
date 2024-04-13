import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PosicionStore } from "../store/PosicionStore";

import { type TablaPosicion } from "../types/fixture.api.type";
import PDFGenerator from "./report/components/tabla-reporte.component";
const colorPalette = [
  "#4285f4",
  "#34a853",
  "#8900f2",
  "#ea4335",
  "#4361ee",
  "#e91e63",
  "#795548",
];

const TablaPosicionPage: React.FC = () => {
  const tablaPosicion = PosicionStore((state) => state.tablaPosicion);
  const uploadTablaPosicion = PosicionStore(
    (state) => state.uploadTablaPosicion
  );
  useEffect(() => {
    uploadTablaPosicion();
  }, []);

  const groupBy = (array: TablaPosicion[] | null, key: string) => {
    if (!array) {
      return {};
    }

    const sortedArray = array.sort((a, b) => {
      if (b.puntos !== a.puntos) {
        return b.puntos - a.puntos; // Ordenar por puntos de mayor a menor
      } else {
        return b.diferencia_goles - a.diferencia_goles; // Si los puntos son iguales, ordenar por diferencia de goles
      }
    });

    return sortedArray.reduce((result, currentValue: any) => {
      const groupKey = currentValue[key];
      // rome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {} as { [key: string]: TablaPosicion[] });
  };

  const groupsTabla = groupBy(tablaPosicion, "grupo_id");

  return (
    <>
      <PDFDownloadLink
        document={
          <PDFGenerator
            groupsTabla={groupsTabla}
          />
        }
        fileName="tbl_posicion"
      >
        {({ loading, error }) => {
          if (error) {
            return <div>{error.message}</div>;
          }

          return loading ? (
            "Cargando..."
          ) : (
            <Button>
              <Download /> Descargar
            </Button>
          );
        }}
      </PDFDownloadLink>

      <div className="w-full h-full">
        {Object.keys(groupsTabla).map((grupoId, index) => (
          <div key={grupoId} className="tabla-container">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography marginTop={"8px"} textAlign={"center"} variant="h5">
                  Tabla de Posiciones - Grupo {grupoId}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{ overflowX: "auto" }}>
                  <TableContainer component={Paper} className="rounded">
                    <Table
                      size="small"
                      sx={{
                        background: colorPalette[index],
                        backgroundImage: "url(/table.png)",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell align="left">PJ</TableCell>
                          <TableCell>PG</TableCell>
                          <TableCell>PE</TableCell>
                          <TableCell>PP</TableCell>
                          <TableCell>GF</TableCell>
                          <TableCell>GC</TableCell>
                          <TableCell>DG</TableCell>
                          <TableCell align="left">Puntos</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {groupsTabla[grupoId].map((equipo) => {
                          return (
                            <TableRow key={equipo.id}>
                              <TableCell>
                                {equipo.promocion_participante?.nombre_promocion}
                              </TableCell>
                              <TableCell>{equipo.pj}</TableCell>
                              <TableCell>{equipo.pg}</TableCell>
                              <TableCell>{equipo.pe}</TableCell>
                              <TableCell>{equipo.pp}</TableCell>
                              <TableCell>{equipo.goles_f}</TableCell>
                              <TableCell>{equipo.goles_e}</TableCell>
                              <TableCell>{equipo.diferencia_goles}</TableCell>
                              <TableCell
                                sx={{
                                  background: "url('/estrella-n.png')",
                                  backgroundSize: "2.7rem",
                                  backgroundPosition: "left",
                                  backgroundRepeat: "no-repeat",
                                }}
                                align="left"
                              >
                                {equipo.puntos}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </Grid>
          </div>
        ))}
        {Object.keys(groupsTabla).length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Typography variant="h4" color={"blueviolet"} margin={"4rem"}>
              No hay datos de tabla de posiciones disponibles
            </Typography>
          </Box>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tabla-container {
            display: none;
          }
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="swiper-container"
      >
        {Object.keys(groupsTabla).map((grupoId, index) => (
          <SwiperSlide key={grupoId}>
            <div className="swiper-slide">
              <Typography marginTop={"8px"} textAlign={"center"} variant="h5">
                Tabla de Posiciones - Grupo {grupoId}
              </Typography>
              <div style={{ overflowX: "auto" }}>
                <TableContainer sx={{ fontSize: '1.2rem' }} component={Paper} className="rounded">
                  <Table
                    size="small"
                    sx={{
                      background: colorPalette[index],
                      backgroundImage: "url(/table.png)",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">PJ</TableCell>
                        <TableCell>PG</TableCell>
                        <TableCell>PE</TableCell>
                        <TableCell>PP</TableCell>
                        <TableCell>GF</TableCell>
                        <TableCell>GC</TableCell>
                        <TableCell>DG</TableCell>
                        <TableCell align="left">Puntos</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupsTabla[grupoId].map((equipo) => {
                        return (
                          <TableRow key={equipo.id}>
                            <TableCell>
                              {equipo.promocion_participante?.nombre_promocion}
                            </TableCell>
                            <TableCell>{equipo.pj}</TableCell>
                            <TableCell>{equipo.pg}</TableCell>
                            <TableCell>{equipo.pe}</TableCell>
                            <TableCell>{equipo.pp}</TableCell>
                            <TableCell>{equipo.goles_f}</TableCell>
                            <TableCell>{equipo.goles_e}</TableCell>
                            <TableCell>{equipo.diferencia_goles}</TableCell>
                            <TableCell
                              sx={{
                                background: "url('/estrella-n.png')",
                                backgroundSize: "2.7rem",
                                backgroundPosition: "left",
                                backgroundRepeat: "no-repeat",
                              }}
                              align="left"
                            >
                              {equipo.puntos}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-container {
          display: none;
        }
        @media (max-width: 768px) {
          .swiper-container {
            display: block;
          }
          .tabla-container {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default TablaPosicionPage;
