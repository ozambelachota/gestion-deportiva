import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { useVoleyStore } from "../store/Voley.store";

interface FormVoley {
  id?: number;
  puntos: number;
  partidos_g: number;
  partidos_p: number;
  partidos_j: number;
}

function FormEditVoleyPosicion() {
  const { voley, updateVoleySet, getVoley } = useVoleyStore();
  const { control, handleSubmit } = useForm<FormVoley>({
    defaultValues: {
      puntos: voley?.puntos,
      partidos_g: voley?.partidos_g,
      partidos_p: voley?.partidos_p,
      partidos_j: voley?.partidos_j,
    },
  });
  const onUpdateVoley: SubmitHandler<FormVoley> = async (data) => {
    if (
      data.puntos < 0 ||
      data.partidos_g < 0 ||
      data.partidos_p < 0 ||
      data.partidos_j < 0
    ) {
      toast.error("Se requiere un numero positivo");
    } else {
      toast.success("Posicion actualizada");
      updateVoleySet({ ...voley, ...data });
      getVoley(voley.deporte_id)
    }
  };
  return (
    <div className="bg-slate-800  p-4  flex flex-col justify-center align-center">
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Editar Posicion {voley.promocion_participante?.nombre_promocion}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <form onSubmit={handleSubmit(onUpdateVoley)}>
          <Controller
            name="puntos"
            control={control}
            render={({ field }) => (
              <TextField autoFocus type="number" label="Puntos" {...field} />
            )}
          />
          <Controller
            name="partidos_g"
            control={control}
            render={({ field }) => (
              <TextField type="number" label="Partidos ganados" {...field} />
            )}
          />
          <Controller
            name="partidos_p"
            control={control}
            render={({ field }) => (
              <TextField type="number" label="Partidos perdidos" {...field} />
            )}
          />
          <Controller
            name="partidos_j"
            control={control}
            render={({ field }) => (
              <TextField type="number" label="Partidos jugados" {...field} />
            )}
          />
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </form>
      </Box>
      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export default FormEditVoleyPosicion;
