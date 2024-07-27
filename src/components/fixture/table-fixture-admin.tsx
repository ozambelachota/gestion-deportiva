import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
  const [selectedRound, setSelectedRound] = useState<number | string>("");
  const partidosObtenidos = fixtureStore((state) => state.obtenerPartidos);
  const cargarDatos = async () => {
    await partidosObtenidos();
  };

  const fixtureFiltradoPorJugr = fixutres?.filter(({ por_jugar }) => por_jugar === true) || [];
  
  const fixtureFiltradoPorRonda = fixtureFiltradoPorJugr.filter((fixture) => {
    if (!selectedRound) return true;
    return fixture.n_fecha_jugada === selectedRound;
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
  }, []);

  const navigate = useNavigate();

  const handleResult = (idFixture: number) => {
    navigate(`/admin/result-fixture/${idFixture}`);
  };

  const handleConfirm = async () => {
    await desactivePartido({ ...fixture, por_jugar: false });
    cargarDatos();
    setOpen(false);
  };

  return (
    <div>
      <FormControl sx={{ marginBottom: "20px", minWidth: 120 }}>
        <InputLabel id="select-round-label">Ronda</InputLabel>
        <Select
          labelId="select-round-label"
          id="select-round"
          value={selectedRound}
          label="Ronda"
          onChange={(e) => setSelectedRound(e.target.value)}
        >
          <MenuItem value="">
            Seleccionar ronda
          </MenuItem>
          {[...Array(11).keys()].map((round) => (
            <MenuItem key={round + 1} value={round + 1}>
              {round + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Equipo 1</TableCell>
              <TableCell align="right">VS</TableCell>
              <TableCell align="right">Equipo 2</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Deporte</TableCell>
              <TableCell align="center">Ronda</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fixtureFiltradoPorRonda.map((fixture) => (
              <TableRow
                key={fixture.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{fixture.promocion}</TableCell>
                <TableCell align="right">vs</TableCell>
                <TableCell align="right">{fixture.vs_promocion}</TableCell>
                <TableCell align="right">
                  {fixture.por_jugar ? "Por jugar" : "Finalizado"}
                </TableCell>
                <TableCell align="right">{deporte(fixture.deporte_id)}</TableCell>
                <TableCell align="center">{fixture.n_fecha_jugada}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setFixture(fixture);
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
                  <Button
                    onClick={() => {
                      navigate(`partido/${fixture.id}`);
                    }}
                  >
                    Editar Partido
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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