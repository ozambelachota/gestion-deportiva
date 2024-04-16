import { create } from "zustand";
import {
  getByIdPromocionales,
  getGoles,
  getPromocionales,
  getSanciones,
  insertedJugadorSancionado,
  jugadorSancionadoById,
  obtenerPromocionWithParticipantes,
  promocionesParticipantesByGrupoId,
  updateJugadorSancionado,
} from "../services/api.service";
import type {
  ListaSancion,
  PromocionParticipante,
  Promocional,
  PromocionalWithParticipante,
  TipoSancion,
} from "../types/fixture.api.type";
import { tipoSanciones } from "./../services/api.service";

interface SancionGolState {
  tipoSancion: TipoSancion[];
  idPromocionParticipante: number;
  setIdPromocionParticipante: (id: number) => void;
  promocionesPartipantes: PromocionParticipante[];
  obtenerPromocionalesPorParticipante: (id: number) => Promise<void>;
  sancion: ListaSancion[];
  jugadorSancionado: ListaSancion;
  goleadoor: Promocional[];
  getSancion: () => Promise<void>;
  getTipoSancion: () => Promise<void>;
  getGoles: () => Promise<void>;
  promocionales: Promocional[];
  obtenerPromocionales: () => Promise<void>;
  insertJugadorSancion: (sancion: ListaSancion) => Promise<void>;
  jugadorSancionadoById: (id: number) => Promise<void>;
  sancionadoId: ListaSancion;
  setSancionJugador: (sancion: ListaSancion) => void;
  getPromocionesParticipantesPorGrupo: (idGrupo: number) => Promise<void>;
  updateJugadorSancion: (sancion: ListaSancion) => Promise<void>;
  setEditarSancion: (sancion: ListaSancion) => void;
  promocionWithParticipante: PromocionalWithParticipante[];
  getPromocionWithParticipante: () => Promise<void>;
}

export const useSancionGolStore = create<SancionGolState>((set) => ({
  tipoSancion: [],
  grupoSelect: 0,
  sancion: [],
  goleadoor: [],
  promocionales: [],
  promocionesPartipantes: [],
  idPromocionParticipante: 0,
  setIdPromocionParticipante: (id: number) => {
    set({ idPromocionParticipante: id });
  },
  promocionalesYparticipante: [],
  getPromocionesParticipantesPorGrupo: async (
    grupoId: number,
    tipoId: number = 1
  ) => {
    if (grupoId < 0) {
      set({ promocionesPartipantes: [] });
    } else {
      const promocionParticipantes = await promocionesParticipantesByGrupoId(
        grupoId,
        tipoId
      );
      if (!promocionParticipantes) return;

      set({ promocionesPartipantes: promocionParticipantes });
    }
  },
  promocionParticipanteSelect: 0,
  obtenerPromocionalesPorParticipante: async (id: number) => {
    const promocionales = await getByIdPromocionales(id);
    if (!promocionales) return;
    set({ promocionales });
  },
  setSancionJugador: (jugador: ListaSancion) => {
    set({ jugadorSancionado: jugador });
  },
  jugadorSancionado: {
    promocion_id: 0,
    nombre_promocion: "",
    tipo_sancion: 0,
    cant_tarjeta_amarilla: 0,
    cant_tarjeta_roja: 0,
    estado_pago_sancion: false,
    estado_sancion: true,
    monto_sancion: 0,
    motivo_sancion: "",
    ultima_fecha: 0,
  },
  jugadorSancionadoById: async (id: number) => {
    const jugadorSancionado = await jugadorSancionadoById(id);
    if (!jugadorSancionado || id <= 0) return;
    set({ sancionadoId: jugadorSancionado });
  },
  sancionadoId: {
    id: 0,
    promocion_id: 0,
    nombre_promocion: "",
    tipo_sancion: 0,
    cant_tarjeta_amarilla: 0,
    cant_tarjeta_roja: 0,
    estado_pago_sancion: false,
    estado_sancion: true,
    ultima_fecha: 0,
    monto_sancion: 0,
    motivo_sancion: "",
  },
  obtenerPromocionales: async () => {
    const promocionales = await getPromocionales();
    if (!promocionales) return;
    set({ promocionales });
  },
  getSancion: async () => {
    const sancion = await getSanciones();
    if (!sancion) return;
    set({ sancion });
  },
  getGoles: async () => {
    const goles = await getGoles();
    if (!goles) return;
    set({ goleadoor: goles });
  },
  getTipoSancion: async () => {
    const tipoSancion = await tipoSanciones();
    if (!tipoSancion) return;
    set({ tipoSancion });
  },
  insertJugadorSancion: async (sancion: ListaSancion) => {
    await insertedJugadorSancionado(sancion);
    console.log(sancion);
    if (!sancion) return;
    set({ jugadorSancionado: sancion });
  },
  updateJugadorSancion: async (sancion: ListaSancion) => {
    if (!sancion) return;
    const jugador = await updateJugadorSancionado(sancion);
    if (!jugador) return;
    set({ sancionadoId: jugador });
  },
  setEditarSancion: (jugador: ListaSancion) => {
    set({ sancionadoId: jugador });
  },
  promocionWithParticipante: [],
  getPromocionWithParticipante: async () => {
    const promocionWithParticipanteData =
      await obtenerPromocionWithParticipantes();
    if (!promocionWithParticipanteData) return;

    set({ promocionWithParticipante: promocionWithParticipanteData });
  },
}));
