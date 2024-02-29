import { create } from "zustand";
import { getGoles, getSanciones } from "../services/api.service";
import type {
  ListaSancion,
  Promocional,
  TipoSancion,
} from "../types/fixture.api.type";
import { tipoSanciones } from "./../services/api.service";

interface SancionGolState {
  tipoSancion: TipoSancion[];
  sancion: ListaSancion[];
  goleadoor: Promocional[];
  getSancion: () => Promise<void>;
  getTipoSancion: () => Promise<void>;
  getGoles: () => Promise<void>;
}

export const useSancionGolStore = create<SancionGolState>((set) => ({
  tipoSancion: [],
  sancion: [],
  goleadoor: [],
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
}));
