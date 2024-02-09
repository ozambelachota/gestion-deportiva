import { create } from "zustand";
import { deporteId, obtenerDeporte } from "../services/api.service";
import type { Deporte } from "../types/fixture.api.type";

type DeporteStoreType = {
  deportes: Deporte[];
  deporteSelect: number;
  deporte: Deporte;
  getDeporteId: (id: number) => Promise<void>;
  getDeporte: () => Promise<void>;
  selectDeporte: (id: number) => void;
};

const DeporteStore = create<DeporteStoreType>()((set) => ({
  deportes: [
    {
      id: 0,
      nombre_tipo: "",
    },
  ],
  deporte: {
    id: 0,
    nombre_tipo: "",
  },
  deporteSelect: 0,
  getDeporte: async () => {
    const deportes = await obtenerDeporte();
    set({ deportes });
  },
  selectDeporte: (id: number) => {
    set({ deporteSelect: id });
  },
  getDeporteId: async (id: number) => {
    const deporte = await deporteId(id);
    set({ deporte });
  },
}));

export default DeporteStore;
