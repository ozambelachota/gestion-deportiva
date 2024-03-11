import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useSancionGolStore } from "../store/sancion-gol.store";
import { ListaSancion } from "../types/fixture.api.type";

interface FormUpdate {
  nombre_promocion: string;
  motivo_sancion: string;
  cant_tarjeta_amarilla: number;
  cant_tarjeta_roja: number;
  tipo_sancion: number;
}

function FormEditSaancionComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const jugadorSancionadoById = useSancionGolStore(
    (state) => state.jugadorSancionadoById
  );
  const updatingJugadorSancionado = useSancionGolStore(
    (state) => state.updateJugadorSancion
  );
  const tipoSancion = useSancionGolStore((state) => state.tipoSancion);
  const getTipoSancion = useSancionGolStore((state) => state.getTipoSancion);
  const sancionadoId = useSancionGolStore((state) => state.sancionadoId);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormUpdate>({
    values: {
      nombre_promocion: sancionadoId.nombre_promocion,
      cant_tarjeta_amarilla: sancionadoId.cant_tarjeta_amarilla,
      cant_tarjeta_roja: sancionadoId.cant_tarjeta_roja,
      tipo_sancion: sancionadoId.tipo_sancion,
      motivo_sancion: sancionadoId.motivo_sancion,
    },
  });
  useEffect(() => {
    getTipoSancion();

    if (id) {
      jugadorSancionadoById(Number(id));
    }
  }, [id]);

  const onUpdateJugadorSancionado: SubmitHandler<FormUpdate> = (data) => {
    console.log(data);
    if (data.cant_tarjeta_amarilla < sancionadoId.cant_tarjeta_amarilla) {
      toast.error(
        "La cantidad de tarjetas amarillas no puede ser menor a la actual"
      );
      return;
    }
    if (data.cant_tarjeta_amarilla < 0) {
      toast.error(
        "Se requiere una cantidad de tarjetas amarillas mayor a cero"
      );
      return;
    }

    onUpdate({
      ...sancionadoId,
      cant_tarjeta_amarilla: data.cant_tarjeta_amarilla,
      cant_tarjeta_roja: data.cant_tarjeta_roja,
      motivo_sancion: data.motivo_sancion,
      tipo_sancion: data.tipo_sancion,
    });
    console.log(data);
    toast.success("Jugador sancionado editado");
  };

  const onUpdate = async (jugador: ListaSancion) => {
    if (jugador == sancionadoId) {
      toast.error("No se puede editar porque no hay cambios");
      return;
    }
    updatingJugadorSancionado(jugador);
  };
  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center w-full h-full m-0">
      <Typography variant="h5">Editando al jugador sancionado</Typography>
      <form onSubmit={handleSubmit(onUpdateJugadorSancionado)}>
        <FormControl fullWidth className="my-2">
          <Controller
            name="nombre_promocion"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre Promocion"
                disabled
                name="nombre_promocion"
                variant="standard"
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth className="my-2">
          <Controller
            name="motivo_sancion"
            control={control}
            render={({ field }) => (
              <TextField
                label="Motivo Sancion"
                {...field}
                name="motivo_sancion"
                variant="standard"
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth className="my-2">
          <Controller
            name="tipo_sancion"
            control={control}
            render={({ field }) => (
              <>
                <InputLabel id="lbl-tipo-sancion">Tipo Sancion</InputLabel>
                <Select
                  {...field}
                  label="Tipo Sancion"
                  labelId="lbl-tipo-sancion"
                  name="tipo_sancion"
                >
                  <MenuItem value={0}>Ninguno</MenuItem>
                  {tipoSancion.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre_tipo + "-" + tipo.cantidad_fecha}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          />
        </FormControl>
        <FormControl fullWidth className="my-2">
          <Controller
            name="cant_tarjeta_amarilla"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cant. Tarjetas Amarillas"
                variant="standard"
              />
            )}
          />
        </FormControl>
        {errors && (
          <Typography color={"red"}>
            {errors.cant_tarjeta_amarilla?.message}
          </Typography>
        )}
        <FormControl fullWidth className="my-2">
          <Controller
            name="cant_tarjeta_roja"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cant. Tarjetas Rojas"
                variant="standard"
              />
            )}
          />
        </FormControl>
        {errors && (
          <Typography color={"red"}>
            {errors.cant_tarjeta_roja?.message}
          </Typography>
        )}
        <ButtonGroup>
          <Button
            color="success"
            className="m-4"
            variant="contained"
            type="submit"
          >
            Actualizar
          </Button>
          <Button
            className="m-4"
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate("/admin/sancion");
            }}
          >
            Cancelar
          </Button>
        </ButtonGroup>
      </form>
      <Toaster position="top-center" duration={4000} theme="dark" />
    </div>
  );
}

export default FormEditSaancionComponent;
