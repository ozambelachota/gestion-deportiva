import {
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
import { ResultStore } from "../store/result.store";
import type { Resultado } from "../types/fixture.api.type";

function ResultPage() {
  const results = ResultStore((state) => state.result);
  const getResults = ResultStore((state) => state.getResult);

  const [groupedResults, setGroupedResults] = useState<{
    [key: string]: Resultado[];
  }>({});


  results.sort((a, b) => a.fixture_exafam.grupo_id - b.fixture_exafam.grupo_id);

  useEffect(() => {
    getResults();
  }, []);

  results.sort((a, b) => b.fixture_exafam.n_fecha_jugada - a.fixture_exafam.n_fecha_jugada);

  useEffect(() => {
    const grouped = results?.reduce(
      (acc: { [key: string]: Resultado[] }, result) => {
        const { fixture_exafam } = result;
        const key = `${fixture_exafam.n_fecha_jugada}_${fixture_exafam.deporte_id}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(result);
        return acc;
      },
      {}
    );
    setGroupedResults(grouped || {});
  }, [results]);

  const getSportName = (deporteId: number): string => {
    switch (deporteId) {
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

  // Colores para las tablas
  const colors = [
    "#317f43",
    "#495e76",
    "#FF1493",
    "#FFA500",
    "#746e5d",
    "#D400FF",
    "#FF0000",
    "#082032",
    "#FF6347",
    "1A1A40",
    "#1E5128",
    "#04293A",
  ];

  

  return (
    <div className="">
      {Object.entries(groupedResults).map(([groupKey, groupResults], index) => (
        <div key={groupKey}>
          <Typography variant="h4">
            Resultados de la fecha
            {groupResults[0]?.fixture_exafam.n_fecha_jugada} -{" "}
            {getSportName(groupResults[0]?.fixture_exafam.deporte_id)}
          </Typography>
          <TableContainer component={Paper} >
            <Table size="small" sx={{ bgcolor: colors[index % colors.length] }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Promoción</TableCell>
                  <TableCell align="center">VS</TableCell>
                  <TableCell align="center">Promoción</TableCell>
                  <TableCell align="center">Resultado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell align="center">{result.fixture_exafam.promocion}</TableCell>
                    <TableCell align="center">VS</TableCell>
                    <TableCell align="center">{result.fixture_exafam.vs_promocion}</TableCell>
                    <TableCell align="center">{result.resultado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
}
export default ResultPage;
