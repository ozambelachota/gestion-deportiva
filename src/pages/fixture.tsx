import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
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
import type { Fixture } from "../types/fixture.api.type";
export const FixturePage = () => {
  const grupos = GrupoStore((state) => state.grupos);
  const obtenerGrupo = GrupoStore((state) => state.obtenerGrupo);
  const fixture = fixtureStore((state) => state.fixture);
  const obtenerPromocionGrupo = fixtureStore(
    (state) => state.obtenerPromocionGrupo
  );
  const promocionesPorGrupos = fixtureStore(
    (state) => state.promocionesPorGrupos
  );
  const {
    setEmparejamiento,
    equipo1,
    equipo2,
    emparejamiento,
    setEquipo1,
    setEquipo2,
  } = fixtureStore();

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
  const matches: Fixture[] = [];

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

  const handleChangeEmparejamiento = (event: any) => {
    setEmparejamiento(event.target.value);
  };

  const handleChangeEquipo1 = (event: any) => {
    setEquipo1(event.target.value);
  };

  const handleChangeEquipo2 = (event: any) => {
    setEquipo2(event.target.value);
  };
  const handleGeneratePartido = () => {
    const promocionesAleatorias = [...promocionesPorGrupos];
    const totalPromociones = promocionesAleatorias.length;
    const usedIndices = new Set();

    // Ajusta la hora inicial al valor seleccionado
    let horaActual = new Date(horaInicial);

    // Genera partidos de acuerdo al tipo de emparejamiento
    if (emparejamiento === "automatico") {
      // Genera los dos primeros partidos simultáneamente
      for (let i = 0; i < 2; i++) {
        let index;
        do {
          index = Math.floor(Math.random() * totalPromociones);
        } while (usedIndices.has(index));

        usedIndices.add(index);

        const equipo1 = promocionesAleatorias[index].nombre_promocion;

        // Crea una nueva variable para la segunda hora
        let horaSegundoPartido = addMinutes(horaActual, 25);

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
      toast.success("Partido generado con exito");
    } else if (emparejamiento === "manual") {
      // Emparejamiento manual
      if (equipo1 === equipo2) {
        toast.error("Los equipos no pueden ser iguales");
        return;
      }
      if (equipo1 == "" || equipo2 == "") {
        toast.error("Los equipos no pueden ser vacios");
        return;
      }
      matches.push({
        promocion: equipo1,
        vs_promocion: equipo2,
        campo_id: campoSelect,
        grupo_id: selectGrupo,
        n_fecha_jugada: numeroFechaJugados,
        fecha_partido: horaActual,
      });
      toast.success("Partido generado con exito");
    }
    setVsPromocion([...matches]);
  };
  const handleEdit = (index: number, equipo1: string, equipo2: string) => {
    const updatedMatches = [...vsPromocion];
    updatedMatches[index].promocion = equipo1;
    updatedMatches[index].vs_promocion = equipo2;

    if (equipo1 == equipo2) {
      toast.error("Los equipos no pueden ser iguales");
      return;
    } else if (
      updatedMatches[index].promocion == updatedMatches[index].vs_promocion
    ) {
      toast.error("No se puede editar el partido");
      return;
    } else {
      setVsPromocion(updatedMatches);
      toast.success("Partido editado con exito");
    }
  };

  const handleChangeSelectGrupo = (event: any) => {
    selectedGrupo(event.target.value as number);
  };
  const handleChangeSelectCampo = (event: any) => {
    selectCampo(event.target.value as number);
  };

  const handleSavePartido = () => {
    if (vsPromocion.length < 3 && emparejamiento === "automatico") {
      toast.error("Se requiere al menos 3 partidos");
      return;
    }
    if (numeroFechaJugados <= 0) {
      toast.error("Se requiere al menos una fecha jugada");
      return;
    }
    if (selectGrupo <= 0) {
      toast.error("Se requiere un grupo");
      return;
    }
    if (campoSelect <= 0) {
      toast.error("Se requiere un campo");
      return;
    } else {
      addPartido(vsPromocion);
      setVsPromocion([]);
      setNumeroFechaJugados(0);
      setHoraInicial(new Date());
      toast.success("Partidos guardados");
    }
  };

  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        Generar partidos{" "}
      </Typography>
      <Box
        sx={{
          border: "1px solid #fff",
          borderRadius: "8px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "600px", // Ajusta el valor según tus necesidades
          margin: "auto", // Centra la caja horizontalmente
        }}
      >
        {/* Primera fila */}
        <RadioGroup
          row
          aria-label="tipo-emparejamiento"
          name="tipo-emparejamiento"
          value={emparejamiento}
          onChange={handleChangeEmparejamiento}
        >
          <FormControlLabel
            value="automatico"
            control={<Radio />}
            label="Automático"
          />
          <FormControlLabel value="manual" control={<Radio />} label="Manual" />
        </RadioGroup>

        <div style={{ display: "flex", gap: "10px" }}>
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
        <div style={{ display: "flex", gap: "10px" }}>
          <DatePicker
            label="Fecha del primer partido"
            sx={{ flexGrow: 1, margin: "10px" }}
            value={horaInicial}
            onChange={(date) => setHoraInicial(date as Date)}
          />
          <TimePicker
            label="Hora del primer partido"
            sx={{ flexGrow: 1, margin: "10px" }}
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
        {/* Nuevo: Selects para emparejamiento manual */}
        {emparejamiento === "manual" && (
          <div style={{ display: "flex", gap: "20px" }}>
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="select-equipo1-label">Equipo 1</InputLabel>
              <Select
                labelId="select-equipo1-label"
                id="select-equipo1-select"
                value={equipo1}
                onChange={handleChangeEquipo1}
                label="Equipo 1"
                size="small"
              >
                <MenuItem value={""}>Seleccionar Equipo</MenuItem>
                {promocionesPorGrupos.map(({ id, nombre_promocion }) => (
                  <MenuItem key={id} value={nombre_promocion}>
                    {nombre_promocion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="select-equipo2-label">Equipo 2</InputLabel>
              <Select
                labelId="select-equipo2-label"
                id="select-equipo2-select"
                value={equipo2}
                onChange={handleChangeEquipo2}
                label="Equipo 2"
                size="small"
              >
                <MenuItem value={""}>Seleccionar Equipo</MenuItem>
                {promocionesPorGrupos.map(({ id, nombre_promocion }) => (
                  <MenuItem key={id} value={nombre_promocion}>
                    {nombre_promocion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}

        {/* Botones */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ margin: "2px" }}
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
      <ListFixture
        vsPromocion={vsPromocion}
        promociones={promocionesPorGrupos}
        onEdit={handleEdit}
      />
      <Toaster position="top-center" duration={4000} />
    </>
  );
};
