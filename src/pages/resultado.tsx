import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { fixtureStore } from "../store/fixture.store";
import { ResultStore } from "../store/result.store";

function ResultPage() {
  const fixtures = fixtureStore((state) => state.fixture);
  const obtenerPartidos = fixtureStore((state) => state.obtenerPartidos);
  const results = ResultStore((state) => state.result);
  const getResults = ResultStore((state) => state.getResult);

  const fixturesFilter = fixtures?.filter(
    (fixture) => fixture.por_jugar === false
  );
  useEffect(() => {
    getResults();
    obtenerPartidos();
  }, []);

  useEffect(() => {
    console.log("Results:", results);
    console.log("Fixtures Filter:", fixturesFilter);
  }, [results, fixturesFilter]);

  return (
    <div>
      <Typography variant="h4">Resultados de la fecha anterior</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Promoción</TableCell>
            <TableCell>VS</TableCell>
            <TableCell>Promoción</TableCell>
            <TableCell>Resultado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fixturesFilter?.map((fixture) => {
            const resultsFilter = results.filter((result) => {
              console.log(result);
              return result.fixture_id == fixture.id;
            });
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
  );
}

export default ResultPage;
