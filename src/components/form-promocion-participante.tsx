import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { CampeonatoStore } from "../store/Campeonato.store";
import DeporteStore from "../store/deporte.store";
import { GrupoStore } from "../store/grupoSotre.store";
import { PromocionStore } from "../store/promocionales.store";
import { PromocionParticipante } from "../types/fixture.api.type";
function FormPromocionParticipante() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PromocionParticipante>();

  const handleFormSubmit = (data: PromocionParticipante) => {
    if (data.campeonato_id < 0) {
      toast.error("Se requiere un campeonato");
      return;
    }
    if (data.tipo_id < 0) {
      toast.error("Se requiere un deporte");
      return;
    }
    if (data.grupo_id < 0) {
      toast.error("Se requiere un grupo");
      return;
    }
    if (data.nombre_promocion == "") {
      toast.error("Se requiere un nombre");
      return;
    }
    reset();
    toast.success("Participante guardado");
    onSave(data);
  };
  const promocionParticipanteSet = PromocionStore(
    (state) => state.setPromocionParticipante
  );
  const onSave = (promocion: PromocionParticipante) => {
    promocionParticipanteSet(promocion);
  };
  const deportes = DeporteStore((state) => state.deportes);
  const getDeportes = DeporteStore((state) => state.getDeporte);
  const getGrupos = GrupoStore((state) => state.obtenerGrupo);
  const grupos = GrupoStore((state) => state.grupos);
  const campeonatos = CampeonatoStore((state) => state.campeonatos);
  const getCampeonatos = CampeonatoStore((state) => state.getCampeonato);
  useEffect(() => {
    getDeportes();
    getGrupos();
    getCampeonatos();
  }, []);

  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        Inscripcion de nueva promoción
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box m={2}>
          <Controller
            name="nombre_promocion"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Nombre de la promoción"
                fullWidth
                {...field}
                error={!!errors.nombre_promocion}
                helperText={errors.nombre_promocion?.message}
              />
            )}
          />
        </Box>
        <Box m={2}>
          <FormControl fullWidth>
            <InputLabel id="campeonato-id-label">Campeonato</InputLabel>
            <Controller
              name="campeonato_id"
              control={control}
              defaultValue={0} // Puedes establecer el valor predeterminado según tu lógica
              render={({ field }) => (
                <Select
                  {...field}
                  label="Campeonato"
                  labelId="campeonato-id-label"
                >
                  <MenuItem selected disabled value={0}>
                    Seleccionar campeonato
                  </MenuItem>
                  {campeonatos.map((campeonato) => (
                    <MenuItem key={campeonato.id} value={campeonato.id}>
                      {campeonato.nombre_campeonato}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>
        <Box m={2}>
          <FormControl fullWidth>
            <InputLabel id="grupo-id-label">Grupo</InputLabel>
            <Controller
              name="grupo_id"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select {...field} label="Grupo" labelId="grupo-id-label">
                  <MenuItem selected disabled value={0}>
                    Seleccionar grupo
                  </MenuItem>
                  {grupos.map((grupo) => (
                    <MenuItem key={grupo.id} value={grupo.id}>
                      {grupo.nombre_grupo}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>
        <Box m={2}>
          <FormControl fullWidth>
            <InputLabel id="tipo-id-label">Deporte</InputLabel>
            <Controller
              name="tipo_id"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select {...field} label="Tipo deporte" labelId="tipo-id-label">
                  <MenuItem selected disabled value={0}>
                    Seleccionar deporte
                  </MenuItem>
                  {deportes.map((deporte) => (
                    <MenuItem key={deporte.id} value={deporte.id}>
                      {deporte.nombre_tipo}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>
        <Box m={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Save />}
            type="submit"
          >
            Guardar
          </Button>
        </Box>
      </form>
      <Toaster position="top-center" />
    </>
  );
}

export default FormPromocionParticipante;
