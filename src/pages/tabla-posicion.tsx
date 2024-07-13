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

import { useEffect, useState } from "react";

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

  const [currentGroup, setCurrentGroup] = useState<number>(
    parseInt(localStorage.getItem("currentGroupPosicion") || "1", 10)
  );

  useEffect(() => {
    uploadTablaPosicion();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentGroupPosicion", currentGroup.toString());
  }, [currentGroup]);

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
    const grupoId = currentGroup.toString();

    if (groupsTabla[grupoId] && groupsTabla[grupoId].length > 0) {
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

      doc.text("EXAFAM 2024-2025", 10, 10);
      doc.text(`Tabla de Posiciones - Grupo ${grupoId}`, 10, 20);
      autoTable(doc, {
        head: [["#", "PJ", "PG", "PE", "PP", "GF", "GC", "DG", "Puntos"]],
        body: tableData,
        startY: 30,
      });

      doc.save(`tabla_posiciones_grupo_${grupoId}.pdf`);
    } else {
      alert("No hay datos disponibles para el grupo seleccionado");
    }
  };

  const handleGroupChange = (group: number) => {
    setCurrentGroup(group);
  };

  return (
    <>
      <Button color="success" variant="contained" onClick={handleDownloadPDF}>
        <Download /> Descargar PDF
      </Button>

      <div className="w-full h-full">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            my: 2,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((group) => (
            <Button
              key={group}
              variant={currentGroup === group ? "contained" : "outlined"}
              onClick={() => handleGroupChange(group)}
              sx={{ mx: 1 }}
            >
              Grupo {group}
            </Button>
          ))}
        </Box>

        {Object.keys(groupsTabla).map(
          (grupoId, index) =>
            parseInt(grupoId) === currentGroup && (
              <div key={grupoId} className="tabla-container">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      marginTop={"8px"}
                      textAlign={"center"}
                      variant="h5"
                    >
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
                              <TableCell align="left">Puntos</TableCell>
                              <TableCell align="left">PJ</TableCell>
                              <TableCell>PG</TableCell>
                              <TableCell>PE</TableCell>
                              <TableCell>PP</TableCell>
                              <TableCell>GF</TableCell>
                              <TableCell>GC</TableCell>
                              <TableCell>DG</TableCell>
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
                                  <TableCell>{equipo.pj}</TableCell>
                                  <TableCell>{equipo.pg}</TableCell>
                                  <TableCell>{equipo.pe}</TableCell>
                                  <TableCell>{equipo.pp}</TableCell>
                                  <TableCell>{equipo.goles_f}</TableCell>
                                  <TableCell>{equipo.goles_e}</TableCell>
                                  <TableCell>
                                    {equipo.diferencia_goles}
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
            )
        )}
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
