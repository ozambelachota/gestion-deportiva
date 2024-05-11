import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixtureStore } from "../../store/fixture.store";

interface FixtureUpdate {
  id?: number;
  promocion: string;
  vs_promocion: string;
  fecha_partido: Date;
  campo_id: number;
  grupo_id: number;
  deporte_id: number;
  n_fecha_jugada: number;
  por_jugar: boolean;
}

export function TableFixtureAdmin() {
  const fixutres = fixtureStore((state) => state.fixture);
  const { desactivePartido } = fixtureStore();
  const [open, setOpen] = useState(false);
  const [fixture, setFixture] = useState<FixtureUpdate>({
    promocion: "",
    vs_promocion: "",
    fecha_partido: new Date(),
    campo_id: 0,
    grupo_id: 0,
    deporte_id: 0,
    n_fecha_jugada: 0,
    por_jugar: false,
    id: 0,
  });
  const partidosObtenidos = fixtureStore((state) => state.obtenerPartidos);
  const cargarDatos = async () => {
    await partidosObtenidos();
  };
  const fixtureFiltradoPorJugr = fixutres?.filter(({ por_jugar }) => {
    return por_jugar === true;
  });

  const deporte = (tipo: number) => {
    switch (tipo) {
      case 1:
        return "Fútbol";
      case 2:
        return "Voley";
      case 3:
        return "Voley Mixto";
      default:
        return "Desconocido";
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [fixture]);
  const navigate = useNavigate();
  const handleResult = (idFixture: number) => {
    navigate(`/admin/result-fixture/${idFixture}`);
  };
  const handleConfirm = () => {
    desactivePartido({ ...fixture, por_jugar: false });
    cargarDatos();
    setOpen(false);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Equipo 1</TableCell>
              <TableCell align="right">VS</TableCell>
              <TableCell align="right">Equipo 2</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">deporte</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fixtureFiltradoPorJugr?.map((fixture) => {
              return (
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
                    {deporte(fixture.deporte_id)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setFixture(fixture);
                        cargarDatos();
                        setOpen(true);
                      }}
                    >
                      Terminar Partido
                    </Button>
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
                    <Button>editar partido</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas terminar el partido?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleConfirm} variant="contained" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
