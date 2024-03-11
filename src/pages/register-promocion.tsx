import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PromocionStore } from "../store/promocionales.store";

export const RegisterPromocion = () => {
  const { control, handleSubmit } = useForm();

  const { id } = useParams();
  const agregarPromocion  = PromocionStore(state => state.agregarPromocion);
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const { nombre_promocional, apellido_promocional } = data;
    if (!id && !data) return;
    else {
      console.log(data);
      agregarPromocion({
        nombre_promocional: nombre_promocional+" "+apellido_promocional,
        id_promocion_participante: parseInt(id as string),
        n_goles: 0,
      });
      navigate("/");
    }
  };

  return (
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
                defaultValue=""
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
                name="apellido_promocional"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    id="apellidoPromocional"
                    label="Apellido Promocional"
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
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
