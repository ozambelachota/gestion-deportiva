import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { fixtureStore } from "../store/fixture.store";
import { GrupoStore } from "../store/grupoSotre.store";
import { useSancionGolStore } from "../store/sancion-gol.store";
import {
  ListaSancion,
  PromocionParticipante,
  Promocional,
} from "../types/fixture.api.type";

function FormSancionComponent() {
  const grupos = GrupoStore((state) => state.grupos);
  const getGrupos = GrupoStore((state) => state.obtenerGrupo);
  const promocionesParticipantes = fixtureStore(
    (state) => state.promocionParticipante
  );
  const getTipoSancion = useSancionGolStore((state) => state.getTipoSancion);
  const tipoSanciones = useSancionGolStore((state) => state.tipoSancion);
  const getPromocionParticipante = fixtureStore(
    (state) => state.obtenerPromociones
  );
  const [formData, setFormData] = useState<ListaSancion>({
    motivo_sancion: "",
    estado_sancion: true,
    fecha_inicio_sancion: new Date(),
    fecha_fin_sancion: new Date(),
    monto_sancion: 30,
    estado_pago_sancion: false,
    cant_tarjeta_amarilla: 0,
    cant_tarjeta_roja: 0,
    promocion_id: 0,
    tipo_sancion: 0,
    nombre_promocion: "",
  });
  const promocionales = useSancionGolStore((state) => state.promocionales);

  const getPromocionales = useSancionGolStore(
    (state) => state.obtenerPromocionales
  );
  const insertarSancionJugador = useSancionGolStore(
    (state) => state.insertJugadorSancion
  );
  const setSelectedPromocional = useSancionGolStore(
    (state) => state.setSelectedPromocional
  );
  const selectedPromocional = useSancionGolStore(
    (state) => state.selectedPromocional
  );
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<number>(0);
  const [promocionesPorGrupo, setPromocionesPorGrupo] = useState<
    PromocionParticipante[]
  >([
    {
      campeonato_id: 0,
      grupo_id: 0,
      id: 0,
      create_at: new Date(),
      estado: true,
      nombre_promocion: "",
      tipo_id: 0,
    },
  ]);
  const [promocionFited, setPromocionFited] = useState<Promocional[]>([]);

  useEffect(() => {
    getGrupos();
    getTipoSancion();
    getPromocionParticipante();
    getPromocionales();
  }, [selectedPromocional, formData]);

  useEffect(() => {
    // Cuando el grupo seleccionado cambia, cargar las promociones correspondientes
    if (grupoSeleccionado !== null) {
      const promocionesFiltradas = promocionesParticipantes.filter(
        (promocion) =>
          promocion.grupo_id === grupoSeleccionado && promocion.tipo_id === 1
      );
      setPromocionesPorGrupo(promocionesFiltradas);

      const promocionalesFilter = promocionales.filter(
        (promocional) =>
          promocional.id_promocion_participante === selectPromocionParticipante
      );
      setPromocionFited(promocionalesFilter);
    }
  }, [grupoSeleccionado, promocionesParticipantes, promocionFited]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [selectPromocionParticipante, setSelectPromocionParticipante] =
    useState<number>(1);
  const handleSelectPromocional = (e: any) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      nombre_promocion: value as string,
    }));
    setSelectedPromocional(value as string);
  };
  const handlePromocionChange = (e: any) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      promocion_id: Number(value),
    }));
    setSelectPromocionParticipante(Number(value));
  };
  const handleGrupoChange = (e: any) => {
    const selectedGrupo = e.target.value as number;
    setGrupoSeleccionado(selectedGrupo);
  };
  const [selectSancion, setSelectSancion] = useState<number>(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      tipo_sancion: selectSancion,
      promocion_id: selectPromocionParticipante,
    });
    if (formData.cant_tarjeta_amarilla <= 0) {
      toast.error("Se requiere la cantidad de tarjetas amarillas");
      return;
    }
    if (formData.cant_tarjeta_roja < 0) {
      toast.error("Se requiere la cantidad de tarjetas rojas");
      return;
    }
    if (formData.nombre_promocion === "") {
      toast.error("Se requiere el nombre del promocional");
      return;
    }
    if (formData.promocion_id === 0) {
      toast.error("Se requiere un participante");
      return;
    } else {
      onSave(formData);
      toast.success("jugador sancionado guardado");
    }
  };
  const onSave = async (sancionJugador: ListaSancion) => {
    await insertarSancionJugador(sancionJugador);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container spacing={0.5} sx={{ margin: "10px 10px" }}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Motivo de sanción"
                name="motivo_sancion"
                value={formData.motivo_sancion}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id={"select-grupo"}>Seleccionar Grupo</InputLabel>
              <Select
                labelId="select-grupo"
                label="Seleccionar Grupo"
                value={grupoSeleccionado}
                onChange={handleGrupoChange}
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
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-promocion">
                Seleccionar Promoción
              </InputLabel>
              <Select
                label="Promoción participante"
                labelId="select-promocion"
                value={selectPromocionParticipante}
                onChange={handlePromocionChange}
              >
                <MenuItem value={0} disabled selected>
                  Seleccionar promoción
                </MenuItem>
                {promocionesPorGrupo.map((promocion) => (
                  <MenuItem key={promocion.id} value={promocion.id}>
                    {promocion.nombre_promocion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-promocional">
                Seleccionar Promocional
              </InputLabel>

              <Select
                name="nombre_promocional"
                label="Seleccionar Promocional"
                labelId="select-promocional"
                value={selectedPromocional}
                onChange={handleSelectPromocional}
              >
                <MenuItem value={""} disabled selected>
                  Seleccionar promocional
                </MenuItem>
                {promocionFited.map((promocion) => (
                  <MenuItem
                    key={promocion.id}
                    value={promocion.nombre_promocional}
                  >
                    {promocion.nombre_promocional}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-sancion">Seleccionar sanción</InputLabel>
              <Select
                label="seleccionar sanción"
                labelId="select-sancion"
                name="tipo_sancion"
                value={selectSancion}
                onChange={(e) => {
                  setSelectSancion(Number(e.target.value));
                }}
              >
                <MenuItem value={0} selected>
                  sin sancion
                </MenuItem>
                {tipoSanciones.map((sancion) => (
                  <MenuItem key={sancion.id} value={sancion.id}>
                    {sancion.nombre_tipo} - {sancion.cantidad_fecha}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                type="number"
                name="cant_tarjeta_amarilla"
                label="Cant. Tarjeta Amarilla"
                value={formData.cant_tarjeta_amarilla}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                type="number"
                name="cant_tarjeta_roja"
                label="Cant. Tarjeta Rojas"
                value={formData.cant_tarjeta_roja}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <Button variant="contained" color="primary" type="submit">
                Enviar
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Toaster position="top-center" duration={4000} className="" />
    </>
  );
}

export default FormSancionComponent;
