import { Save } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { PromocionStore } from "../store/promocionales.store";
interface FormData {
  nombre_promocional: string;
  n_goles: number;
}
export const RegisterPromocion = () => {
  const { control, handleSubmit, setValue, reset } = useForm<FormData>();

  const { id } = useParams();
  const agregarPromocion = PromocionStore((state) => state.agregarPromocion);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { nombre_promocional, n_goles } = data;
    if (nombre_promocional === "") {
      toast.error("Se requiere un nombre");
      return;
    }
    if (n_goles < 0) {
      toast.error("Se requiere un numero de goles positivo");
      return;
    } else {
      toast.success("Promocional guardado");
      console.log(data);
      agregarPromocion({
        nombre_promocional: nombre_promocional,
        id_promocion_participante: parseInt(id as string),
        n_goles: n_goles,
      });
      reset();
      navigate("/");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Registrar Promocional
          </Typography>
          <form
            noValidate
            autoComplete="off"
            style={{ width: "100%", marginTop: 20 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_promocional"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      required
                      fullWidth
                      id="nombrePromocional"
                      label="Nombre Promocional"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="n_goles"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      type="number"
                      defaultValue={0}
                      label="N° de goles"
                      onChange={(e) => {
                        if (Number(e.target.value) == 0) {
                          setValue("n_goles", 0);
                        }
                        setValue("n_goles", Number(e.target.value));
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              <Save /> Guardar
            </Button>
          </form>
        </Paper>
      </Container>

      <Toaster position="top-center" duration={4000} theme="dark" />
    </>
  );
};
