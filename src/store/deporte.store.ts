import { create } from "zustand";
import { deporteId, } from "../services/api.service";
import type { Deporte } from "../types/fixture.api.type";

type DeporteStoreType = {
  deportes: Deporte[];
  deporteSelect: number;
  deporte: Deporte;
  getDeporteId: (id: number) => Promise<void>;
  selectDeporte: (id: number) => void;
};

const DeporteStore = create<DeporteStoreType>()((set) => ({
  deportes: [
    {
      id: 1,
      nombre_tipo: "futbol",
    },
    {
      id: 2,
      nombre_tipo: "voley",
    },
    {
      id: 3,
      nombre_tipo: "voley mixto",
    },
  ],
  deporte: {
    id: 0,
    nombre_tipo: "",
  },
  deporteSelect: 0,

  selectDeporte: (id: number) => {
    set({ deporteSelect: id });
  },
  getDeporteId: async (id: number) => {
    const deporte = await deporteId(id);
    set({ deporte });
  },
}));

export default DeporteStore;
