import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import TablaPosicionVoley from "../components/tabla-posicion-voley.component";
import { getPartidosFechaNoMayor } from "../services/api.service";
import { fixtureStore } from "../store/fixture.store";
import { Fixture } from "../types/fixture.api.type";

function VoleyPage() {
  const fixtures = fixtureStore((state) => state.fixture);
  const obtenerPartidos = fixtureStore((state) => state.partidosPorFecha);

  const { isLoading, isError } = useQuery({
    queryKey: ["partidos"],
    queryFn: () => getPartidosFechaNoMayor(),
  });

  const filtrarPorTipo = (partidos: Fixture[] | null, tipoIds: number[]) => {
    return partidos?.filter(
      (partido) =>
        tipoIds.includes(partido.deporte_id) && partido.por_jugar === true
    );
  };
  const partidosFiltrados = filtrarPorTipo(fixtures, [2, 3]);

  useEffect(() => {
    obtenerPartidos();
    return () => {};
  }, []);

  if (isError) {
    return (
      <Typography color="error" variant="h5">
        Error al obtener partidos
      </Typography>
    );
  }
  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          size={"8em"}
          variant="indeterminate"
          color="success"
        />
      </Container>
    );
  }
  // Función para agrupar los partidos por grupo_id
  const groupBy = (array: any[] | null | undefined, key: string) => {
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
    const fechaActual = new Date();
    return grupoPartidos
      .filter((partido) => partido.por_jugar === true)
      .sort(
        (a, b) =>
          new Date(a.fecha_partido).getTime() -
          new Date(b.fecha_partido).getTime()
      )
      .map((partido) => {
        const fechaPartido = new Date(partido.fecha_partido);
        const tiempoRestante = fechaPartido.getTime() - fechaActual.getTime();

        return {
          ...partido,
          tiempoRestante,
        };
      });
  };

  const partidosAgrupados = groupBy(partidosFiltrados, "grupo_id");
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
    <div className="w-full h-full">
      <Typography textAlign={"center"} variant="h4">
        Voley y Voley Mixto
      </Typography>
      <Grid sx={{ width: "100%", height: "100%" }} container spacing={2}>
        {fixtures && fixtures.length > 0 ? (
          Object.keys(partidosAgrupados).map((grupoId) => (
            <Grid item xs={12} md={6} key={grupoId}>
              <Typography
                variant="h6"
                mb={2}
                sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
              >{`Grupo ${grupoId}`}</Typography>
              <TableContainer
                className="rounded w-full h-full"
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{backgroundColor:"black"}} >
                      <TableCell>Promoción</TableCell>
                      <TableCell>VS</TableCell>
                      <TableCell>Promoción</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Campo</TableCell>
                      <TableCell>Deporte</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {obtenerProximosPartidos(partidosAgrupados[grupoId]).map(
                      (partido) => (
                        <TableRow
                          key={partido.id}
                          sx={{
                            backgroundColor:
                              partido.tiempoRestante <= 0
                                ? "rgba(255, 0, 0, 0.3)" // Rojo cuando ya ha empezado
                                : partido.tiempoRestante < 10 * 60 * 1000
                                ? "rgba(0, 255, 0, 0.3)" // Verde cuando está por empezar (por ejemplo, 15 minutos antes)
                                : new Date().getTime() >
                                  new Date(partido.fecha_partido).getTime()
                                ? "rgba(255, 0, 0, 0.3)" // Rojo si ya ha pasado la fecha del partido
                                : partido.deporte_id === 2
                                ? "rgba(173, 216, 230, 0.5)" // Celeste para Voley
                                : partido.deporte_id === 3
                                ? "rgba(0, 0, 255, 0.5)" // Azul para Voley Mixto
                                : "transparent",
                          }}
                        >
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
                          <TableCell sx={{ padding: "8px" }}>
                            {partido.deporte_id == 2 ? "Voley" : "Voley Mixto"}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Typography variant="h4" color={"blueviolet"} margin={"4rem"}>
              No hay partidos programados
            </Typography>
          </Box>
        )}
      </Grid>
      <TablaPosicionVoley />
    </div>
  );
}

export default VoleyPage;
