import {
  Box,
  Button,
  Paper,
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
import { useEffect, useState } from "react";
import { getPartidosFutbol } from "../services/api.service";
import { fixtureStore } from "../store/fixture.store";
import type { Fixture } from "../types/fixture.api.type";

const colorPalette = [
  "#4285f4",
  "#34a853",
  "#7E6363",
  "#ea4335",
  "#673ab7",
  "#e91e63",
  "#795548",
  "#f4b400",
];

const TablaFixture = () => {
  const fixtures = fixtureStore((state) => state.fixtureFutbol);
  const setFixtures = fixtureStore((state) => state.setFixturesFutbol);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["partidosFutbol"],
    queryFn: () => getPartidosFutbol(),
  });

  const [currentGroup, setCurrentGroup] = useState<number>(
    parseInt(localStorage.getItem("currentGroup") || "1", 10)
  );

  useEffect(() => {
    if (data) setFixtures(data);
  }, [data]);

  useEffect(() => {
    localStorage.setItem("currentGroup", currentGroup.toString());
  }, [currentGroup]);

  if (isError) {
    return (
      <Typography color="error" variant="h5">
        Error al obtener partidos
      </Typography>
    );
  }
  if (isLoading) {
    return <Typography variant="h5">Cargando partidos...</Typography>;
  }
  if (!data) {
    return <Typography variant="h5">No hay partidos disponibles</Typography>;
  }

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

  const partidosAgrupados = groupBy(fixtures, "grupo_id");
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

  const handleGroupChange = (group: number) => {
    setCurrentGroup(group);
  };

  return (
    <div className="w-full h-full">
      <Typography marginTop={"8px"} textAlign={"center"} variant="h5">
        FUTBOL
      </Typography>
      <div className="flex justify-center space-x-8 mt-4">
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Campo 1 : COLEGIO FAUSTINO MALDONADO
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Campo 2 : PARQUE TUPAC
        </Typography>
      </div>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        {fixtures && fixtures.length > 0 ? (
          Object.keys(partidosAgrupados)
            .filter((grupoId) => parseInt(grupoId, 10) === currentGroup)
            .map((grupoId) => (
              <Box
                key={grupoId}
                sx={{
                  maxWidth: "90%",
                  margin: "auto",
                }}
              >
                <Typography
                  variant="h6"
                  mb={2}
                  sx={{
                    fontSize: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      xs: "1.5rem",
                      md: "2rem",
                      color:
                        colorPalette[
                          (parseInt(grupoId) - 1) % colorPalette.length
                        ],
                      textShadow: `0px 0px 10px ${
                        colorPalette[
                          (parseInt(grupoId) - 1) % colorPalette.length
                        ]
                      }`,
                    },
                  }}
                >{`Grupo ${grupoId}`}</Typography>
                <TableContainer
                  className="rounded w-dvw flex justify-center align-center"
                  component={Paper}
                  sx={{
                    backgroundColor:
                      colorPalette[
                        (parseInt(grupoId) - 1) % colorPalette.length
                      ],
                    "&:hover": {
                      backgroundColor:
                        colorPalette[
                          (parseInt(grupoId) - 1) % colorPalette.length
                        ],
                      opacity: [0.9, 0.8, 0.7],
                    },
                    color: "",
                  }}
                >
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
                          <TableRow
                            key={partido.id}
                            sx={{
                              backgroundColor:
                                partido.tiempoRestante <= 0
                                  ? "rgba(255, 0, 0, 0.3)" // Rojo cuando ya ha empezado
                                  : partido.tiempoRestante < 10 * 60 * 1000
                                  ? "rgba(0, 255, 0, 0.3)" // Verde cuando está por empezar (por ejemplo, 10 minutos antes)
                                  : new Date().getTime() >
                                    new Date(partido.fecha_partido).getTime()
                                  ? "rgba(255, 0, 0, 0.3)" // Rojo si ya ha pasado la fecha del partido
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
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
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
      </Box>
    </div>
  );
};

export default TablaFixture;
