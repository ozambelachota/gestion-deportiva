import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fixtureStore } from "../store/fixture.store";
import { ResultStore } from "../store/result.store";
import { Fixture } from "../types/fixture.api.type";
function ResultPage() {
  const fixtures = fixtureStore((state) => state.fixture) as Fixture[];
  const obtenerPartidos = fixtureStore((state) => state.obtenerPartidos);
  const results = ResultStore((state) => state.result);
  const getResults = ResultStore((state) => state.getResult);

  const [groupedFixtures, setGroupedFixtures] = useState<{
    [key: string]: Fixture[];
  }>({});

  useEffect(() => {
    getResults();
    obtenerPartidos();
  }, []);

  // Función para obtener el nombre del deporte según el tipo_id
  const getSportName = (tipoId: number): string => {
    switch (tipoId) {
      case 1:
        return "Fútbol";
      case 2:
        return "Vóley";
      case 3:
        return "Vóley Mixto";
      default:
        return "Desconocido";
    }
  };

  useEffect(() => {
    // Agrupar fixtures por n_fechas y tipo_id
    const grouped = fixtures?.reduce(
      (acc: { [key: string]: Fixture[] }, fixture) => {
        // Solo agregar fixtures por_jugar === false
        if (!fixture.por_jugar) {
          const key = `${fixture.n_fecha_jugada}_${fixture.deporte_id}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(fixture);
        }
        return acc;
      },
      {}
    );
    setGroupedFixtures(grouped || {});
  }, [fixtures]);

  return (
    <div>
      {Object.entries(groupedFixtures).map(([groupKey, groupFixtures]) => (
        <div key={groupKey}>
          <Typography variant="h4">
            Resultados de la fecha {groupFixtures[0]?.n_fecha_jugada} -
            {getSportName(groupFixtures[0]?.deporte_id)}
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ fontWeight: "bold", backgroundColor: "green" }}>
                <TableCell>Promoción</TableCell>
                <TableCell>VS</TableCell>
                <TableCell>Promoción</TableCell>
                <TableCell>Resultado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupFixtures.map((fixture) => {
                const resultsFilter = results.filter(
                  (result) => result.fixture_id === fixture.id
                );
                return (
                  <TableRow key={fixture.id}>
                    <TableCell>{fixture.promocion}</TableCell>
                    <TableCell>VS</TableCell>
                    <TableCell>{fixture.vs_promocion}</TableCell>
                    <TableCell>
                      {resultsFilter.map((res) => res.resultado)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
export default ResultPage;
