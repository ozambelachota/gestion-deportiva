import { create } from "zustand";
import {
  getGoles,
  getPromocionales,
  getSanciones,
  insertedJugadorSancionado,
  jugadorSancionadoById,
} from "../services/api.service";
import type {
  ListaSancion,
  Promocional,
  TipoSancion,
} from "../types/fixture.api.type";
import { tipoSanciones } from "./../services/api.service";

interface SancionGolState {
  tipoSancion: TipoSancion[];
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
}

export const useSancionGolStore = create<SancionGolState>((set) => ({
  tipoSancion: [],
  sancion: [],
  goleadoor: [],
  promocionales: [],
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
    if (!jugadorSancionado) return;
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
}));
