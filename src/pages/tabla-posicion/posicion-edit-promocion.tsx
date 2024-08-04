import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { PosicionStore } from "../../store/PosicionStore";

interface FormData {
  nombre_promocion: string;
  goles_favor: number;
  goles_contra: number;
  diferencia_goles: number;
  puntos: number;
  pj: number;
  pg: number;
  pp: number;
  pe: number;
}

function PosicionEditPage() {
  const promocionTabla = PosicionStore((state) => state.promocionTablaPosicion);
  const { control, handleSubmit } = useForm<FormData>({
    values: {
      nombre_promocion: promocionTabla.promocion_participante?.nombre_promocion,
      goles_favor: promocionTabla.goles_f,
      goles_contra: promocionTabla.goles_e,
      diferencia_goles: promocionTabla.diferencia_goles,
      puntos: promocionTabla.puntos,
      pj: promocionTabla.pj,
      pg: promocionTabla.pg,
      pp: promocionTabla.pp,
      pe: promocionTabla.pe,
    },
  });
  const updateTablaPosicion = PosicionStore(
    (state) => state.updatingTablaPosicionFutbol
  );

  const getByIdPromocion = PosicionStore(
    (state) => state.getPosicionByIdPromocion
  );

  const { id } = useParams();

  useEffect(() => {
    getByIdPromocion(Number(id));
  }, [id]);

  const onSubmit = (data: FormData) => {
    if (data.goles_favor < 0 || data.goles_contra < 0) {
      toast.error("Se requiere un numero de goles positivo");
      return;
    }
    if (data.pj < 0) {
      toast.error("Se requiere un numero de partidos jugados positivo");
      return;
    }
    if (data.pg < 0) {
      toast.error("Se requiere un numero de partidos ganados positivo");
      return;
    }
    if (data.pp < 0) {
      toast.error("Se requiere un numero de partidos perdidos positivo");
      return;
    }
    if (data.pe < 0) {
      toast.error("Se requiere un numero de partidos empatados positivo");
      return;
    }
    toast.success("Promocional guardado");
    onUpdate(data);
  };
  const onUpdate = (data: FormData) => {
    updateTablaPosicion({
      id: Number(id),
      promocion: promocionTabla.promocion,
      goles_f: data.goles_favor,
      goles_e: data.goles_contra,
      diferencia_goles: data.diferencia_goles,
      puntos: data.puntos,
      pj: data.pj,
      pg: data.pg,
      pp: data.pp,
      pe: data.pe,
      grupo_id: promocionTabla.grupo_id,
    });
  };

  return (
    <Box
      sx={{
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3">
        Editar tabla de la {' '}
        {promocionTabla.promocion_participante?.nombre_promocion}{" "}
      </Typography>

      <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="nombre_promocion"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nombre promocion"
              disabled
              variant="outlined"
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          name="goles_favor"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Goles a favor"
              variant="outlined"
              type="number"
              margin="normal"
            />
          )}
        />
        <Controller
          name="goles_contra"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Goles en contra"
              variant="outlined"
              type="number"
              margin="normal"
            />
          )}
        />
        <Controller
          name="diferencia_goles"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Diferencia de goles"
              variant="outlined"
              type="number"
            />
          )}
        />

        <Controller
          name="puntos"
          control={control}
          render={({ field }) => (
            <TextField
              label="Puntos"
              variant="outlined"
              type="number"
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          name="pj"
          control={control}
          render={({ field }) => (
            <TextField
              label="PJ"
              variant="outlined"
              type="number"
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          name="pg"
          control={control}
          render={({ field }) => (
            <TextField
              label="PG"
              variant="outlined"
              type="number"
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          name="pp"
          control={control}
          render={({ field }) => (
            <TextField
              label="PP"
              variant="outlined"
              type="number"
              margin="normal"
              {...field}
            />
          )}
        />

        <Controller
          name="pe"
          control={control}
          render={({ field }) => (
            <TextField
              label="PE"
              variant="outlined"
              type="number"
              margin="normal"
              {...field}
            />
          )}
        />
        <ButtonGroup>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
          <Button variant="contained" color="error">
            Cancelar
          </Button>
        </ButtonGroup>
      </form>
      <Toaster position="top-center" duration={4000} theme="dark" />
    </Box>
  );
}

export default PosicionEditPage;
