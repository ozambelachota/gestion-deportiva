import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers-pro";
import { addMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { fixtureStore } from "../store/fixture.store";
import { GrupoStore } from "../store/grupoSotre.store";

import { Toaster, toast } from "sonner";
import { ListFixture } from "../components/list-fixture.component";
import { CampoStore } from "../store/campo.store";
export const Fixture = () => {
  const grupos = GrupoStore((state) => state.grupos);
  const obtenerGrupo = GrupoStore((state) => state.obtenerGrupo);
  const fixture = fixtureStore((state) => state.fixture);
  const obtenerPromocionGrupo = fixtureStore(
    (state) => state.obtenerPromocionGrupo
  );
  const promocionesPorGrupos = fixtureStore(
    (state) => state.promocionesPorGrupos
  );
  const [numeroFechaJugados, setNumeroFechaJugados] = useState(0);

  const selectGrupo = GrupoStore((state) => state.selectGrupo);
  const selectedGrupo = GrupoStore((state) => state.selectedGrupo);
  const [vsPromocion, setVsPromocion] = useState([
    {
      promocion: "",
      vs_promocion: "",
      fecha_partido: new Date(),
      campo_id: selectGrupo,
      grupo_id: 0,
      n_fecha_jugada: 0,
    },
  ]);

  const addPartido = fixtureStore((state) => state.guardarPartido);
  const campos = CampoStore((state) => state.campos);
  const obtenerCampos = CampoStore((state) => state.obtenrCampos);
  const selectCampo = CampoStore((state) => state.selectCampo);
  const campoSelect = CampoStore((state) => state.campoSelect);
  const [horaInicial, setHoraInicial] = useState(new Date());
  useEffect(() => {
    obtenerGrupo();
    obtenerCampos();
    if (selectGrupo <= 0) return;
    else obtenerPromocionGrupo(selectGrupo);
    return () => {};
  }, [vsPromocion, selectGrupo, numeroFechaJugados]);
  const handleGeneratePartido = () => {
    const promocionesAleatorias = [...promocionesPorGrupos];
    const totalPromociones = promocionesAleatorias.length;
    if (totalPromociones < 3) {
      console.error("No hay suficientes promociones para generar partidos.");
      return;
    }

    const matches = [];
    const usedIndices = new Set();

    // Ajusta la hora inicial al valor seleccionado
    let horaActual = new Date(horaInicial);

    // Genera los dos primeros partidos simultáneamente
    for (let i = 0; i < 2; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * totalPromociones);
      } while (usedIndices.has(index));

      usedIndices.add(index);

      const equipo1 = promocionesAleatorias[index].nombre_promocion;

      // Crea una nueva variable para la segunda hora
      let horaSegundoPartido = addMinutes(horaActual, 30);

      let index2;
      do {
        index2 = Math.floor(Math.random() * totalPromociones);
      } while (usedIndices.has(index2));

      usedIndices.add(index2);

      const equipo2 = promocionesAleatorias[index2].nombre_promocion;

      matches.push({
        promocion: equipo1,
        vs_promocion: equipo2,
        fecha_partido: new Date(horaActual),
        grupo_id: selectGrupo,
        campo_id: campoSelect,
        n_fecha_jugada: numeroFechaJugados,
      });

      // Asigna la nueva hora para el segundo partido
      horaActual = horaSegundoPartido;
    }

    // Genera el tercer partido con el intervalo de 30 minutos y sin repetir promociones
    let index3;
    do {
      index3 = Math.floor(Math.random() * totalPromociones);
    } while (usedIndices.has(index3));

    usedIndices.add(index3);

    const equipo3 = promocionesAleatorias[index3].nombre_promocion;

    let index4;
    do {
      index4 = Math.floor(Math.random() * totalPromociones);
    } while (usedIndices.has(index4));

    matches.push({
      promocion: equipo3,
      vs_promocion: promocionesAleatorias[index4].nombre_promocion,
      fecha_partido: horaActual,
      grupo_id: selectGrupo,
      campo_id: campoSelect,
      n_fecha_jugada: numeroFechaJugados,
    });

    setVsPromocion(matches);
  };

  const handleChangeSelectGrupo = (event: any) => {
    selectedGrupo(event.target.value as number);
  };
  const handleChangeSelectCampo = (event: any) => {
    selectCampo(event.target.value as number);
  };

  const handleSavePartido = () => {
    if (vsPromocion.length < 3) return;
    if (numeroFechaJugados <= 0) return;
    if (selectGrupo <= 0) return;
    if (campoSelect <= 0) return;
    else {
      addPartido(vsPromocion);
      setVsPromocion([]);
      setNumeroFechaJugados(0);
      setHoraInicial(new Date());
      toast.success("Partidos guardados");
    }
  };

  return (
    <>
      <Typography variant="h3">Generar partidos </Typography>
      <Box
        sx={{
          border: "1px solid #fff",
          borderRadius: "8px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Primera fila */}
        <div style={{ display: "flex", gap: "20px" }}>
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel id="select-grupo-label">Grupo</InputLabel>
            <Select
              labelId="select-grupo-label"
              id="select-grupo-select"
              value={selectGrupo}
              onChange={handleChangeSelectGrupo}
              label="Grupo"
              size="small"
            >
              <MenuItem value={0}>Seleccionar Grupo</MenuItem>
              {grupos.map(({ id, nombre_grupo }) => (
                <MenuItem key={id} value={id}>
                  {nombre_grupo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel id="select-campo-label">Campo</InputLabel>
            <Select
              labelId="select-campo-label"
              id="select-campo-select"
              value={campoSelect}
              onChange={handleChangeSelectCampo}
              label="Campo"
              size="small"
            >
              <MenuItem value={0}>Seleccionar Campo</MenuItem>
              {campos.map(({ id_campo, nombre_campo }) => (
                <MenuItem key={id_campo} value={id_campo}>
                  {nombre_campo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Segunda fila */}
        <div style={{ display: "flex", gap: "20px" }}>
          <DatePicker
            label="Fecha del primer partido"
            sx={{ flexGrow: 1, margin: "20px" }}
            value={horaInicial}
            onChange={(date) => setHoraInicial(date as Date)}
          />
          <TimePicker
            label="Hora del primer partido"
            sx={{ flexGrow: 1, margin: "20px" }}
            value={horaInicial}
            onChange={(date) => setHoraInicial(date as Date)}
          />
          <TextField
            label="Número de Fechas Jugadas"
            type="number"
            size="small"
            value={numeroFechaJugados}
            onChange={(e) => setNumeroFechaJugados(parseInt(e.target.value))}
            sx={{ margin: "20px" }}
          />
        </div>

        {/* Botones */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ margin: "4px" }}
            variant="contained"
            onClick={() => {
              handleGeneratePartido();
            }}
            disabled={!selectGrupo}
          >
            {!fixture ? "Generar siguiente partido" : "Generar primera fecha"}
          </Button>
          <Button
            onClick={handleSavePartido}
            sx={{ padding: "4px" }}
            variant="contained"
          >
            Guardar fixture
          </Button>
        </div>
      </Box>
      <ListFixture vsPromocion={vsPromocion} />
      <Toaster position="top-center" duration={4000} />
    </>
  );
};
