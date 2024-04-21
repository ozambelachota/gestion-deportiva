import { addMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CampoStore } from "../store/campo.store";
import DeporteStore from "../store/deporte.store";
import { fixtureStore } from "../store/fixture.store";
import { GrupoStore } from "../store/grupoSotre.store";
import { Fixture } from "../types/fixture.api.type";

export const useFixturePage = () => {
  const grupos = GrupoStore((state) => state.grupos);
  const obtenerGrupo = GrupoStore((state) => state.obtenerGrupo);
  const fixture = fixtureStore((state) => state.fixture);
  const obtenerPromocionGrupo = fixtureStore(
    (state) => state.obtenerPromocionGrupo
  );
  const deporteSelect = DeporteStore((state) => state.deporteSelect);

  const deportes = DeporteStore((state) => state.deportes);

  const selectDeporte = DeporteStore((state) => state.selectDeporte);

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
  const setVsPromocion = fixtureStore((state) => state.setVsPromcion);
  const vsPromocion = fixtureStore((state) => state.vsPromocion);
  let matches: Fixture[] = [];

  const addPartido = fixtureStore((state) => state.guardarPartido);
  const campos = CampoStore((state) => state.campos);
  const selectCampo = CampoStore((state) => state.selectCampo);
  const campoSelect = CampoStore((state) => state.campoSelect);

  const fecha = fixtureStore((state) => state.fecha);
  const setFecha = fixtureStore((state) => state.setFecha);

  async function cargarDatos() {
    await obtenerGrupo();
    if (selectGrupo <= 0) return;
    else await obtenerPromocionGrupo(selectGrupo);
  }
  useEffect(() => {
    cargarDatos();
    return () => {};
  }, [
    vsPromocion,
    selectGrupo,
    numeroFechaJugados,
    deporteSelect,
    campoSelect,
    emparejamiento,
  ]);
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
    const partidosGenerados = new Set(); // Conjunto para rastrear partidos generados

    if (
      campoSelect < 0 ||
      deporteSelect <= 0 ||
      selectGrupo <= 0 ||
      numeroFechaJugados <= 0
    ) {
      toast.error(
        "Por favor selecciona un campo, deporte, grupo y número de fecha válido."
      );
      return;
    }

    if (emparejamiento === "automatico") {
      const promocionesAleatorias = [...promocionesFiltradas];
      const totalPromociones = promocionesAleatorias.length;

      if (totalPromociones < 6) {
        toast.error(
          "Se requieren al menos 6 equipos para generar partidos automáticamente."
        );
        return;
      }

      matches = [];

      let fechaInicio = new Date(fecha);
      for (let fecha = 1; fecha <= 5; fecha++) {
        const equiposDisponibles = [...promocionesAleatorias];
        equiposDisponibles.sort(() => Math.random() - 0.5);
        let numEquipos = equiposDisponibles.length;
        const numPartidosNecesarios = 3; // Tres partidos por fecha

        if (numEquipos < numPartidosNecesarios * 2) {
          // Si hay menos equipos de los necesarios para tres partidos, duplica los equipos
          equiposDisponibles.push(...equiposDisponibles);
          numEquipos = equiposDisponibles.length;
        }

        const numPartidos = Math.floor(numEquipos / 2);
        let horaPartido = fechaInicio;

        for (let i = 0; i < numPartidos; i++) {
          const equipoLocal = equiposDisponibles[i];
          const equipoVisitante = equiposDisponibles[numPartidos + i];

          const partidoId = `${equipoLocal.nombre_promocion}-${
            equipoVisitante ? equipoVisitante.nombre_promocion : "Descansa"
          }`;

          if (partidosGenerados.has(partidoId)) {
            // Si el partido ya ha sido generado, omitirlo y continuar con el siguiente
            continue;
          }

          matches.push({
            promocion: equipoLocal.nombre_promocion,
            vs_promocion: equipoVisitante
              ? equipoVisitante.nombre_promocion
              : "Descansa",
            fecha_partido: horaPartido,
            grupo_id: selectGrupo,
            campo_id: campoSelect,
            deporte_id: deporteSelect,
            n_fecha_jugada: fecha,
            por_jugar: true,
          });

          // Agregar el partido generado al conjunto de partidos generados
          partidosGenerados.add(partidoId);

          horaPartido = addMinutes(horaPartido, 25);
        }

        // Añadir partidos de descanso si es necesario
        for (let i = numPartidos; i < numPartidosNecesarios; i++) {
          const equipoDescansa = equiposDisponibles[i];
          const fechaDescanso = addMinutes(horaPartido, 5); // Descanso 5 minutos después del último partido
          matches.push({
            promocion: equipoDescansa.nombre_promocion,
            vs_promocion: "Descansa",
            fecha_partido: fechaDescanso,
            grupo_id: selectGrupo,
            campo_id: campoSelect,
            deporte_id: deporteSelect,
            n_fecha_jugada: fecha,
            por_jugar: true,
          });

          horaPartido = addMinutes(horaPartido, 25);
        }

        // Añadir una semana (7 días) para la próxima fecha
        fechaInicio = new Date(fechaInicio);
        fechaInicio.setDate(fechaInicio.getDate() + 7);
      }

      toast.success("Partidos generados automáticamente con éxito");
    } else if (emparejamiento === "manual") {
      if (!equipo1 || !equipo2) {
        toast.error(
          "Por favor selecciona ambos equipos para generar un partido manualmente."
        );
        return;
      }

      if (equipo1 === equipo2) {
        toast.error("Los equipos no pueden ser iguales.");
        return;
      }

      const partidoId = `${equipo1}-${equipo2}`;

      if (
        partidosGenerados.has(partidoId) ||
        partidosGenerados.has(`${equipo2}-${equipo1}`)
      ) {
        // Si el partido ya ha sido generado (en cualquiera de los dos sentidos), mostrar un error
        toast.error("Este partido ya ha sido generado.");
        return;
      }

      matches.push({
        promocion: equipo1,
        vs_promocion: equipo2,
        campo_id: campoSelect,
        grupo_id: selectGrupo,
        n_fecha_jugada: numeroFechaJugados,
        deporte_id: deporteSelect,
        fecha_partido: new Date(fecha),
        por_jugar: true,
      });

      toast.success("Partido generado manualmente con éxito");
    }

    setVsPromocion(matches);
  };

  const promocionesFiltradas = promocionesPorGrupos.filter(
    (promocion) => promocion.tipo_id === deporteSelect
  );
  const handleEdit = (
    index: number,
    equipo1: string,
    equipo2: string,
    fecha: Date,
    campo: number
  ) => {
    const updatedMatches = [...vsPromocion];
    updatedMatches[index].promocion = equipo1;
    updatedMatches[index].vs_promocion = equipo2;
    updatedMatches[index].fecha_partido = fecha;
    updatedMatches[index].campo_id = campo;

    if (equipo1 === equipo2) {
      toast.error("Los equipos no pueden ser iguales");
      return;
    } else if (
      equipo1 === updatedMatches[index].promocion &&
      equipo2 === updatedMatches[index].vs_promocion
    ) {
      toast.error("No se puede editar el partido");
      return;
    } else {
      setVsPromocion(updatedMatches);
      toast.success("Partido editado con éxito");
    }
  };
  const handleChangeSelectGrupo = (event: any) => {
    selectedGrupo(event.target.value as number);
  };
  const handleChangeSelectCampo = (event: any) => {
    selectCampo(event.target.value as number);
  };
  const handleSavePartido = async () => {
    try {
      if (numeroFechaJugados <= 0) {
        toast.error("Se requiere al menos una fecha jugada");
        return;
      } else if (selectGrupo <= 0) {
        toast.error("Se requiere un grupo");
        return;
      } else if (campoSelect <= 0) {
        toast.error("Se requiere un campo");
        return;
      } else if (deporteSelect <= 0) {
        toast.error("Debe seleccionar un deporte");
        return;
      } else {
        await addPartido(vsPromocion);
        setVsPromocion([]);
        toast.success("Partidos guardados");
      }
    } catch (error) {
      console.error("Error al guardar partidos:", error);
      toast.error(
        "Error al guardar partidos. Consulta la consola para más detalles."
      );
    }
  };

  return {
    emparejamiento,
    deporteSelect,
    deportes,
    numeroFechaJugados,
    selectGrupo,
    campoSelect,
    fecha,
    setFecha,
    vsPromocion,
    grupos,
    campos,
    handleChangeEmparejamiento,
    selectDeporte,
    handleChangeSelectGrupo,
    handleChangeSelectCampo,
    setNumeroFechaJugados,
    handleGeneratePartido,
    handleEdit,
    handleSavePartido,
    handleChangeEquipo1,
    handleChangeEquipo2,
    fixture,
    equipo1,
    equipo2,
    setEquipo1,
    setEquipo2,
    promocionesPorGrupos,
    promocionesFiltradas,
  };
};
