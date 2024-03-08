import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  const getPromocionParticipante = fixtureStore(
    (state) => state.obtenerPromociones
  );
  const [formData, setFormData] = useState<ListaSancion>({
    motivo_sancion: "",
    estado_sancion: true,
    fecha_inicio_sancion: new Date(),
    fecha_final_sancion: new Date(),
    monto_sancion: 30,
    estado_pagado: false,
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
  useEffect(() => {
    getGrupos();
    getPromocionParticipante();
    getPromocionales();
  }, []);
  const [promocionFited, setPromocionFited] = useState<Promocional[]>([]);

  useEffect(() => {
    // Cuando el grupo seleccionado cambia, cargar las promociones correspondientes
    if (grupoSeleccionado !== null) {
      const promocionesFiltradas = promocionesParticipantes.filter(
        (promocion) => promocion.grupo_id === grupoSeleccionado
      );
      setPromocionesPorGrupo(promocionesFiltradas);

      const promocionalesFilter = promocionales.filter(
        (promocional) =>
          promocional.id_promocion_participante === selectPromocionParticipante
      );
      setPromocionFited(promocionalesFilter);
    }
  }, [grupoSeleccionado, promocionesParticipantes,promocionFited]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [selectPromocionParticipante, setSelectPromocionParticipante] =
    useState<number>(1);
  const [selectPromocional, setSelectPromocional] = useState<string>("");
  const handleSelectPromocional = (e: any) => {
    const { value } = e.target;
    setSelectPromocional(value as string);
  };
  const handlePromocionChange = (e: any) => {
    const { value } = e.target;
    setSelectPromocionParticipante(Number(value));
  };
  const handleGrupoChange = (e: any) => {
    const selectedGrupo = e.target.value as number;
    setGrupoSeleccionado(selectedGrupo);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Puedes realizar validaciones adicionales aquí antes de enviar el formulario
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Campos del formulario */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Motivo de sanción"
              name="motivo_sancion"
              value={formData.motivo_sancion}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Select value={grupoSeleccionado} onChange={handleGrupoChange}>
              {grupos.map((grupo) => (
                <MenuItem key={grupo.id} value={grupo.id}>
                  {grupo.nombre_grupo}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              value={selectPromocionParticipante}
              onChange={handlePromocionChange}
            >
              {grupoSeleccionado > 0 &&
                promocionesPorGrupo.map((promocion) => (
                  <MenuItem key={promocion.id} value={promocion.id}>
                    {promocion.nombre_promocion}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              name="promocional"
              value={selectPromocional}
              onChange={handleSelectPromocional}
            >
              {promocionFited.length > 0 &&
                promocionFited.map((promocion) => (
                  <MenuItem
                    key={promocion.id}
                    value={promocion.nombre_promocional}
                  >
                    {promocion.nombre_promocional}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default FormSancionComponent;
