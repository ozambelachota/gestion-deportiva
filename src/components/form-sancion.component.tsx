import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { fixtureStore } from "../store/fixture.store";
import { GrupoStore } from "../store/grupoSotre.store";
import { useSancionGolStore } from "../store/sancion-gol.store";
import { ListaSancion } from "../types/fixture.api.type";

interface FormData {
  grupo_id: number;
  cant_tarjeta_amarilla: number;
  cant_tarjeta_roja: number;
  nombre_promocion: string;
  promocion_id: number;
  tipo_sancion: number;
  motivo_sancion: string;
}

function FormSancionComponent() {
  const grupos = GrupoStore((state) => state.grupos);
  const getGrupos = GrupoStore((state) => state.obtenerGrupo);
  const promocionesParticipantes = fixtureStore(
    (state) => state.promocionParticipante
  );
  const sancionn = useSancionGolStore((state) => state.jugadorSancionado);
  const setGrupoSelect = useSancionGolStore((state) => state.setGrupoSelect);
  const getTipoSancion = useSancionGolStore((state) => state.getTipoSancion);
  const tipoSanciones = useSancionGolStore((state) => state.tipoSancion);
  const getPromocionParticipante = fixtureStore(
    (state) => state.obtenerPromociones
  );
  const promocionales = useSancionGolStore((state) => state.promocionales);

  const selectPromocionParticipante = useSancionGolStore(
    (state) => state.promocionParticipanteSelect
  );
  const setSelectPromocionParticipante = useSancionGolStore(
    (state) => state.setSelectProomocionParticipante
  );
  const getPromocionales = useSancionGolStore(
    (state) => state.obtenerPromocionales
  );
  const insertarSancionJugador = useSancionGolStore(
    (state) => state.insertJugadorSancion
  );
  const selectedPromocional = useSancionGolStore(
    (state) => state.selectedPromocional
  );

  const grupoSelect = useSancionGolStore((state) => state.grupoSelect);
  const { control, handleSubmit, reset } = useForm<FormData>({
    values: {
      grupo_id: grupoSelect,
      cant_tarjeta_amarilla: 0,
      cant_tarjeta_roja: 0,
      nombre_promocion: "",
      promocion_id: selectPromocionParticipante,
      tipo_sancion: 0,
      motivo_sancion: "",
    },
  });

  useEffect(() => {
    getGrupos();
    getTipoSancion();
    getPromocionParticipante();
    getPromocionales();
  }, [selectedPromocional, grupoSelect, selectPromocionParticipante]);

  const promocionFilted = promocionesParticipantes.filter(
    (promocion) => promocion.grupo_id === grupoSelect && promocion.tipo_id === 1
  );
  const promocionalesFilter = promocionales.filter(
    (promocional) =>
      promocional.id_promocion_participante === selectPromocionParticipante
  );
  const onInsertJugadorSancion: SubmitHandler<FormData> = (data) => {
    if (data.cant_tarjeta_amarilla <= 0) {
      toast.error(
        "Se requiere una cantidad de tarjetas amarillas mayor a cero"
      );
      return;
    }
    if (data.nombre_promocion === "") {
      toast.error("Se requiere una promoción");
      return;
    }
    if (data.cant_tarjeta_roja < 0) {
      toast.error("Se requiere una cantidad de tarjetas rojas mayor a cero");
      return;
    }
    onSave({
      ...sancionn,
      tipo_sancion: data.tipo_sancion,
      promocion_id: data.promocion_id,
      cant_tarjeta_amarilla: data.cant_tarjeta_amarilla,
      cant_tarjeta_roja: data.cant_tarjeta_roja,
      motivo_sancion: data.motivo_sancion,
      nombre_promocion: data.nombre_promocion,
    });
    toast.success("Jugador sancionado");
  };
  const onSave = async (sancionJugador: ListaSancion) => {
    await insertarSancionJugador(sancionJugador);
    reset();
  };

  return (
    <>
      <form
        style={{ width: "100%" }}
        onSubmit={handleSubmit(onInsertJugadorSancion)}
      >
        <Grid container spacing={0.5} sx={{ margin: "10px 10px" }}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="motivo_sancion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Motivo de la sanción"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="grupo_id"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel id="select-grupo">Seleccionar grupo</InputLabel>
                    <Select
                      labelId="select-grupo"
                      {...field}
                      label="Seleccionar grupo"
                      onChange={(e) => {
                        setGrupoSelect(Number(e.target.value));
                      }}
                    >
                      <MenuItem value={0} disabled selected>
                        Seleccionar grupo
                      </MenuItem>
                      {grupos.map((grupo) => (
                        <MenuItem key={grupo.id} value={grupo.id}>
                          {grupo.nombre_grupo}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="promocion_id"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel id="select-promocion-participante">
                      Seleccionar promocion participante
                    </InputLabel>
                    <Select
                      labelId="select-promocion-participante"
                      {...field}
                      label="Seleccionar promocion participante"
                      onChange={(e) => {
                        setSelectPromocionParticipante(Number(e.target.value));
                      }}
                    >
                      <MenuItem value={0} disabled selected>
                        Seleccionar promocion participante
                      </MenuItem>
                      {promocionFilted.map((promocion) => (
                        <MenuItem key={promocion.id} value={promocion.id}>
                          {promocion.nombre_promocion}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="nombre_promocion"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel id="select-promocional">
                      Seleccionar promocional
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="select-promocional"
                      label="Seleccionar promocional "
                    >
                      <MenuItem value={0} disabled>
                        Seleccionar promocional
                      </MenuItem>
                      {promocionalesFilter.map((promocional) => (
                        <MenuItem
                          key={promocional.id}
                          value={promocional.nombre_promocional}
                        >
                          {promocional.nombre_promocional}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="tipo_sancion"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel id="select-tipo-sancion">
                      Seleccionar tipo de sancion
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="select-tipo-sancion"
                      label="Seleccionar tipo de sancion"
                    >
                      <MenuItem value={0} selected>
                        ninguno
                      </MenuItem>
                      {tipoSanciones.map((sancion) => (
                        <MenuItem key={sancion.id} value={sancion.id}>
                          {sancion.nombre_tipo + "-" + sancion.cantidad_fecha}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="cant_tarjeta_amarilla"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Cant. Tarjeta Amarillas"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="cant_tarjeta_roja"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Cant. Tarjeta Rojas"
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Button variant="contained" color="primary" type="submit">
                activar sancion
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Toaster position="top-center" duration={4000} />
    </>
  );
}

export default FormSancionComponent;
