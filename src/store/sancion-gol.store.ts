import { create } from "zustand";
import {
  getByIdPromocionales,
  getGoles,
  getPromocionales,
  getSanciones,
  insertedJugadorSancionado,
  jugadorSancionadoById,
  updateJugadorSancionado,
} from "../services/api.service";
import type {
  ListaSancion,
  Promocional,
  TipoSancion,
} from "../types/fixture.api.type";
import { tipoSanciones } from "./../services/api.service";

interface SancionGolState {
  tipoSancion: TipoSancion[];
  grupoSelect: number;
  promocionParticipanteSelect: number;
  setSelectProomocionParticipante: (id: number) => void;
  obtenerPromocionalesPorParticipante: (id: number) => Promise<void>;
  setGrupoSelect: (id: number) => void;
  selectedPromocional: string;
  sancion: ListaSancion[];
  setSelectedPromocional: (promocional: string) => void;
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
  updateJugadorSancion: (sancion: ListaSancion) => Promise<void>;
  setEditarSancion: (sancion: ListaSancion) => void;
}

export const useSancionGolStore = create<SancionGolState>((set) => ({
  tipoSancion: [],
  grupoSelect: 0,
  sancion: [],
  goleadoor: [],
  promocionales: [],
  promocionParticipanteSelect: 0,
  obtenerPromocionalesPorParticipante: async (id: number) => {
    const promocionales = await getByIdPromocionales(id);
    if (!promocionales) return;
    set({ promocionales });
  },
  setSelectProomocionParticipante: (id: number) => {
    set({ promocionParticipanteSelect: id });
  },
  setSancionJugador: (jugador: ListaSancion) => {
    set({ jugadorSancionado: jugador });
  },
  setGrupoSelect: (id: number) => {
    set({ grupoSelect: id });
  },
  jugadorSancionado: {
    id: 0,
    promocion_id: 0,
    nombre_promocion: "",
    tipo_sancion: 0,
    cant_tarjeta_amarilla: 0,
    cant_tarjeta_roja: 0,
    estado_pago_sancion: false,
    estado_sancion: true,
    fecha_fin_sancion: new Date(),
    fecha_inicio_sancion: new Date(),
    monto_sancion: 0,
    motivo_sancion: "",
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
    fecha_fin_sancion: new Date(),
    fecha_inicio_sancion: new Date(),
    monto_sancion: 0,
    motivo_sancion: "",
  },
  selectedPromocional: "",
  setSelectedPromocional: (promocional: string) => {
    set({ selectedPromocional: promocional });
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
}));
