import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fixtureStore } from "../../store/fixture.store";

export function TableFixtureAdmin() {
  const fixutres = fixtureStore((state) => state.fixture);
  const partidosObtenidos = fixtureStore((state) => state.obtenerPartidos);
  const cargarDatos = async () => {
    await partidosObtenidos();
  };
  const fixtureFiltradoPorJugr = fixutres?.filter(({ por_jugar }) => {
    return por_jugar === true;
  });
  useEffect(() => {
    cargarDatos();
  }, [fixutres]);
  const navigate = useNavigate();
  const handleResult = (idFixture: number) => {
    navigate(`/admin/result-fixture/${idFixture}`);
  };
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Equipo 1</TableCell>
            <TableCell align="right">VS</TableCell>
            <TableCell align="right">Equipo 2</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fixtureFiltradoPorJugr?.map((fixture) => (
            <TableRow
              key={fixture.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{fixture?.promocion}</TableCell>
              <TableCell align="right">vs</TableCell>
              <TableCell align="right">{fixture.vs_promocion}</TableCell>
              <TableCell align="right">
                {fixture.por_jugar === true ? "Por jugar" : "Finalizado"}
              </TableCell>
              <TableCell align="right">
                <Button variant="contained">Terminar Partido</Button>
                <Button
                  sx={{ marginLeft: "20px" }}
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    handleResult(fixture.id as number);
                  }}
                >
                  Poner Resultado
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
