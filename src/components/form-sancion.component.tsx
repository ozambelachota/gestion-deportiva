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
  const sancion = useSancionGolStore((state) => state.jugadorSancionado);
  const getTipoSancion = useSancionGolStore((state) => state.getTipoSancion);
  const tipoSanciones = useSancionGolStore((state) => state.tipoSancion);
  const promcionesPartcipantes = useSancionGolStore(
    (state) => state.promocionesPartipantes
  );
  const promoionesParticipantesPorGrupo = useSancionGolStore(
    (state) => state.getPromocionesParticipantesPorGrupo
  );
  const promocionales = useSancionGolStore((state) => state.promocionales);

  const insertarSancionJugador = useSancionGolStore(
    (state) => state.insertJugadorSancion
  );
  const promocionalesPorPromocionParticipante = useSancionGolStore(
    (state) => state.obtenerPromocionalesPorParticipante
  );
  const { control, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: {
      grupo_id: 0,
      cant_tarjeta_amarilla: 0,
      cant_tarjeta_roja: 0,
      nombre_promocion: "",
      promocion_id: 0,
      tipo_sancion: 0,
      motivo_sancion: "",
    },
  });
  const idPromocionParticipante = useSancionGolStore(
    (state) => state.idPromocionParticipante
  );
  const setIdPromocionParticipante = useSancionGolStore(
    (state) => state.setIdPromocionParticipante
  );

  useEffect(() => {
    getGrupos();
    getTipoSancion();
    if (idPromocionParticipante > 0) {
      promocionalesPorPromocionParticipante(idPromocionParticipante);
      console.log(promocionales);
    }
  }, [promcionesPartcipantes, idPromocionParticipante]);

  const onInsertJugadorSancion: SubmitHandler<FormData> = (data) => {
    if (Number(data.cant_tarjeta_amarilla) < 0) {
      toast.error(
        "Se requiere una cantidad de tarjetas amarillas mayor a cero"
      );
      return;
    }
    if (data.nombre_promocion === "") {
      toast.error("Se requiere una promoción");
      return;
    }
    if (Number(data.cant_tarjeta_roja) < 0) {
      toast.error("Se requiere una cantidad de tarjetas rojas mayor a cero");
      return;
    }
    if (data.promocion_id === 0) {
      toast.error("Se requiere una promoción");
      return;
    }
    console.log(data);
    onSave({
      ...sancion,
      tipo_sancion: Number(data.tipo_sancion),
      promocion_id: data.promocion_id,
      cant_tarjeta_amarilla: Number(data.cant_tarjeta_amarilla),
      cant_tarjeta_roja: Number(data.cant_tarjeta_roja),
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
                name="grupo_id"
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel id="select-grupo">Seleccionar grupo</InputLabel>
                    <Select
                      {...field}
                      labelId="select-grupo"
                      label="Seleccionar grupo"
                      onChange={(e) => {
                        setValue("grupo_id", Number(e.target.value));
                        if (Number(e.target.value) > 0) {
                          promoionesParticipantesPorGrupo(
                            Number(e.target.value)
                          );
                        }
                      }}
                    >
                      <MenuItem value={0} disabled>
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
                      {...field}
                      labelId="select-promocion-participante"
                      label="Seleccionar promocion participante"
                      onChange={(e) => {
                        setValue("promocion_id", Number(e.target.value));
                        setIdPromocionParticipante(Number(e.target.value));
                      }}
                    >
                      <MenuItem value={0} disabled>
                        Seleccionar promocion participante
                      </MenuItem>
                      {promcionesPartcipantes &&
                        promcionesPartcipantes.map((promocion) => (
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
                      label="Seleccionar promocional"
                    >
                      <MenuItem value={0} disabled>
                        Seleccionar promocional
                      </MenuItem>
                      {promocionales.map((promocional) => (
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
                      onChange={(e) => {
                        setValue("tipo_sancion", Number(e.target.value));
                      }}
                    >
                      <MenuItem value={0} disabled>
                        Ninguno
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
          </Grid>{" "}
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
                    onChange={(e) => {
                      if (e.target.value == "" || e.target.name == undefined) {
                        setValue("cant_tarjeta_amarilla", 0);
                      }
                      setValue("cant_tarjeta_amarilla", Number(e.target.value));
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Controller
                name="motivo_sancion"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        if (
                          e.target.value == "" ||
                          e.target.name == undefined
                        ) {
                          setValue("motivo_sancion", "");
                        }
                        setValue("motivo_sancion", e.target.value);
                      }}
                      label="Motivo de la sanción"
                    />
                  );
                }}
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
                    onChange={(e) => {
                      if (e.target.value == "" || e.target.name == undefined) {
                        setValue("cant_tarjeta_roja", 0);
                      }
                      setValue("cant_tarjeta_roja", Number(e.target.value));
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Button variant="contained" color="primary" type="submit">
                Insertar Jugador
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
