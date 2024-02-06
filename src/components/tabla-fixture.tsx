import {
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
import { format, parseISO } from "date-fns";
import React, { useEffect } from "react";
import { fixtureStore } from "../store/fixture.store";
import { Fixture } from "../types/fixture.api.type";

const TablaFixture: React.FC = () => {
  const partidos = fixtureStore((state) => state.fixture);
  const obtenerPartido = fixtureStore((state) => state.partidosPorFecha);

  useEffect(() => {
    obtenerPartido();
  }, [partidos]);

  // Función para agrupar los partidos por grupo_id
  const groupBy = (array: any[] | null, key: string) => {
    if (!array) {
      return {};
    }

    return array.reduce((result, currentValue) => {
      const groupKey = currentValue[key];
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {} as { [key: string]: any[] });
  };

  const obtenerProximosPartidos = (grupoPartidos: Fixture[]) => {
    return grupoPartidos
      .filter((partido) => new Date(partido.fecha_partido) > new Date())
      .sort(
        (a, b) =>
          new Date(a.fecha_partido).getTime() -
          new Date(b.fecha_partido).getTime()
      )
      .slice(0, 3);
  };

  const partidosAgrupados = groupBy(partidos, "grupo_id");
  const formatDate = (date: Date | string | null) => {
    if (!date) {
      return "";
    }

    try {
      const parsedDate = typeof date === "string" ? parseISO(date) : date;
      return format(parsedDate, "dd/MM HH:mm");
    } catch (error) {
      console.error("Error parsing or formatting date:", error);
      return "";
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {Object.keys(partidosAgrupados).map((grupoId) => (
          <Grid item xs={12} md={6} key={grupoId}>
            <Typography
              variant="h6"
              mb={2}
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >{`Grupo ${grupoId}`}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Promoción</TableCell>
                    <TableCell>VS</TableCell>
                    <TableCell>Promoción</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Campo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {obtenerProximosPartidos(partidosAgrupados[grupoId]).map(
                    (partido) => (
                      <TableRow key={partido.id}>
                        <TableCell sx={{ padding: "8px" }}>
                          {partido.promocion}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>VS</TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {partido.vs_promocion}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {formatDate(partido.fecha_partido)}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {partido.campo_id}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TablaFixture;
