import { Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { PromocionStore } from "../../store/promocionales.store";

interface FormData {
  nombre_promocional: string;
  n_goles: number;
}

function EditjugadorComponent() {
  const { id } = useParams();
  const promocion = PromocionStore((state) => state.promocionById);
  const getPromocionById = PromocionStore((state) => state.getPromocionById);
  const navigate = useNavigate();
  const updatePromocion = PromocionStore((state) => state.updatePromcoion);

  const { control, handleSubmit } = useForm<FormData>({
    values: {
      nombre_promocional: promocion?.nombre_promocional,
      n_goles: promocion?.n_goles,
    },
  });

  const onUpdate = (data: FormData) => {
    if (data.nombre_promocional === "") {
      toast.error("Se requiere un nombre");
      return;
    }
    if (data.n_goles < 0) {
      toast.error("Se requiere un numero de goles positivo");
      return;
    }
    updatePromocion({
      id: Number(id),
      id_promocion_participante: promocion?.id_promocion_participante,
      nombre_promocional: data.nombre_promocional,
      n_goles: data.n_goles,
    });
    toast.success("Promocional actualizado");
  };

  useEffect(() => {
    getPromocionById(Number(id));
  }, [id]);
  return (
    <div className="flex flex-col justify-center items-center">
      <Typography variant="h3">
        Editar jugador de la promocion{" "}
        {promocion?.promocion_participante.nombre_promocion}
      </Typography>
      <form
        onSubmit={handleSubmit(onUpdate)}
        className="flex flex-col justify-center items-center my-5"
      >
        <Controller
          name="nombre_promocional"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nombre Promocional"
              color="secondary"
              {...field}
            />
          )}
        />
        <Controller
          name="n_goles"
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              color="secondary"
              label="Numero de goles"
              {...field}
            />
          )}
        />
        <Button type="submit" variant="contained" color="secondary">
          Editar
        </Button>
        <Button
          onClick={() => {
            navigate("/admin/registrar-promociones");
          }}
        >
          Volver
        </Button>
      </form>
      <Toaster position="top-center" duration={4000} theme="dark" />
    </div>
  );
}

export default EditjugadorComponent;
