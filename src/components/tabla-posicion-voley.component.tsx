import {
  Box,
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
import voleyStore from "../store/voley.store";
import { VoleyPosicion } from "../types/fixture.api.type";
const colorPalette = ["#808080", "#478C9C"];
function TablaPosicionVoley() {
  const voleyPositions = voleyStore((state) => state.voley);
  const getVoleyPositions = voleyStore((state) => state.getVoley);

  useEffect(() => {
    getVoleyPositions();
  }, []);
  const groupBy = (array: VoleyPosicion[] | null, key: string) => {
    if (!array) {
      return {};
    }

    const sortedArray = array.sort((a, b) => {
      if (b.puntos !== a.puntos) {
        return b.puntos - a.puntos; // Ordenar por puntos de mayor a menor
      } else {
        return b.partidos_g - a.partidos_g; // Si los puntos son iguales, ordenar por diferencia de goles
      }
    });

    return sortedArray.reduce((result, currentValue: any) => {
      const groupKey = currentValue[key];
      // rome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {} as { [key: string]: VoleyPosicion[] });
  };

  const groupsTabla = groupBy(voleyPositions, "deporte_id"); // Group by deporte_id instead of grupo_id

  return (
    <div className="w-full mt-6">
      {Object.keys(groupsTabla).map((deporteId, index) => (
        <Grid container spacing={2} key={deporteId}>
          <Grid item xs={12}>
            <Typography marginTop={"8px"} textAlign={"center"} variant="h5">
              Tabla de Posiciones -
              {deporteId == "2" ? "Voley Femenino" : "Voley Mixto"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              className="rounded"
              sx={{
                background: colorPalette[index],
                color: "blueviolet",
              }}
            >
              <Table
                size="small"
                sx={{ backgroundImage: "url('/neones.png')" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Equipo</TableCell>
                    <TableCell align="center">Puntos</TableCell>
                    <TableCell align="center">Partidos Ganados</TableCell>
                    <TableCell align="center">Partidos Pertidos</TableCell>
                    <TableCell align="center">N° de partidos jugados</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupsTabla[deporteId].map((equipo) => {
                    return (
                      <TableRow key={equipo.id}>
                        <TableCell sx={{ textAlign: "center" }}>
                          {equipo.promocion_participante.nombre_promocion}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            background: "url('/estrella.png')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            color: "black",
                            backgroundSize: "contain",
                          }}
                        >
                          {equipo.puntos}
                        </TableCell>
                        <TableCell sx={{ color: "black" }} align="center">
                          {equipo.partidos_g}
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          {equipo.partidos_p}
                        </TableCell>
                        <TableCell align="center" sx={{ color: "blue" }}>
                          {equipo.partidos_j}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
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
  );
}

export default TablaPosicionVoley;
