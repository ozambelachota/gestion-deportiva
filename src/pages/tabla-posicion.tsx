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

import { useEffect } from "react";

import { PosicionStore } from "../store/PosicionStore";

import { type TablaPosicion } from "../types/fixture.api.type";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

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
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {} as { [key: string]: TablaPosicion[] });
  };

  const groupsTabla = groupBy(tablaPosicion, "grupo_id");
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    let groupsProcessed = 0;
    let isGroup7Processed = false;
    let startY = 20; // Posición Y inicial

    let hasDataToShow = false; // Variable para rastrear si hay datos para mostrar

    Object.keys(groupsTabla).forEach((grupoId) => {
      const tableData = groupsTabla[grupoId].map((equipo) => {
        return [
          equipo.promocion_participante?.nombre_promocion || "",
          equipo.pj,
          equipo.pg,
          equipo.pe,
          equipo.pp,
          equipo.goles_f,
          equipo.goles_e,
          equipo.diferencia_goles,
          equipo.puntos,
        ];
      });

      if (tableData.length > 0) {
        // Verificar si hay datos para mostrar
        hasDataToShow = true; // Marcar que hay datos para mostrar

        if (!isGroup7Processed && grupoId === "7") {
          // Si no se ha procesado el grupo 7, agregar una página nueva para él
          doc.addPage();
          doc.text(`Tabla de Posiciones - Grupo ${grupoId}`, 10, 10);
          autoTable(doc, {
            head: [["#", "PJ", "PG", "PE", "PP", "GF", "GC", "DG", "Puntos"]],
            body: tableData,
            startY: 20,
          });
          isGroup7Processed = true; // Marcar el grupo 7 como procesado
        } else {
          if (groupsProcessed % 2 === 0 && grupoId !== "7") {
            doc.addPage();
            startY = 20;
          }

          doc.text(`Tabla de Posiciones - Grupo ${grupoId}`, 10, startY + 10);
          autoTable(doc, {
            head: [["#", "PJ", "PG", "PE", "PP", "GF", "GC", "DG", "Puntos"]],
            body: tableData,
            startY: startY + 20,
          });
          startY = doc.internal.pageSize.height - 180; // Actualizar la posición Y de inicio para la próxima tabla
          groupsProcessed++;
        }
      }
    });

    if (hasDataToShow) {
    }

    doc.save("tabla_posiciones.pdf");
  };

  return (
    <>
      <Button color="success" variant="contained" onClick={handleDownloadPDF}>
        <Download /> Descargar PDF
      </Button>

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
                                {
                                  equipo.promocion_participante
                                    ?.nombre_promocion
                                }
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
    </>
  );
};

export default TablaPosicionPage;
