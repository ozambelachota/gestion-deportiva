import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { fixtureStore } from "../../store/fixture.store";
import { ResultadStoreForm } from "../../store/resultado.store";

function ResultFixtureFormPage() {
  const partido = fixtureStore((state) => state.partido);
  const buscarPartido = fixtureStore((state) => state.buscarPartido);
  const { id } = useParams();
  const navigate = useNavigate();
  const obtenerPromociones = fixtureStore((state) => state.obtenerPromociones);
  const equipos = fixtureStore((state) => state.promocionParticipante);
  const { ganador, setGanador, resultado, setResult, insertResult } =
    ResultadStoreForm();
  useEffect(() => {
    obtenerPromociones();
    buscarPartido(Number(id));
  }, [partido]);

  const equiposFilter = equipos.filter((promocion) => {
    return (
      promocion.grupo_id === partido.grupo_id &&
      promocion.tipo_id == partido.deporte_id
    );
  });

  const handleSaveResult = async () => {
    if (resultado == "") {
      toast.error("Se requiere un resultado");
      return;
    }
    if (partido.id) {
    
      insertResult({
        fixture_id: partido.id,
        resultado: resultado,
        ganador_id: ganador,
      });
      navigate("/admin/registrar-fixture");
    }
  };
  return (
    <>
      <Card sx={{ maxWidth: 400, margin: "auto" }}>
        <CardContent>
          <Typography variant="h5" textAlign="center">
            Resultado del partido
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
              <Typography variant="h5">vs</Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <TextField
                label="Equipo 1"
                value={partido.promocion}
                disabled
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <TextField
                label="Equipo 2"
                value={partido.vs_promocion}
                disabled
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <TextField
                label="Resultado"
                type="text"
                value={resultado}
                onChange={(e) => setResult(e.target.value)}
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <FormControl>
                <InputLabel id="select-ganador-label">Ganador</InputLabel>
                <Select
                  labelId="select-ganador-label"
                  id="select-ganador"
                  value={ganador}
                  onChange={(e) =>
                    setGanador(
                      e.target.value === "null" ? null : Number(e.target.value)
                    )
                  }
                  size="small"
                  sx={{ minWidth: "120px" }}
                >
                  <MenuItem value="null">Empate</MenuItem>
                  {equiposFilter.map((promocion) => (
                    <MenuItem key={promocion.id} value={promocion.id}>
                      {promocion.nombre_promocion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={handleSaveResult}
                disabled={!resultado}
              >
                Guardar Resultado
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Toaster position="top-center" theme="dark" duration={4000} />
    </>
  );
}

export default ResultFixtureFormPage;
