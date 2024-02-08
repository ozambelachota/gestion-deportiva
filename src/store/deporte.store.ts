import { create } from "zustand";
import { obtenerDeporte } from "../services/api.service";
import type { Deporte } from "../types/fixture.api.type";

type DeporteStoreType = {
  deporte: Deporte[];
  deporteSelect: number;
  getDeporte: () => Promise<void>;
  selectDeporte: (id: number) => void;
};

const DeporteStore = create<DeporteStoreType>()((set) => ({
  deporte: [
    {
      id: 0,
      nombre_tipo: "",
    },
  ],
  deporteSelect: 0,
  getDeporte: async () => {
    const deporte = await obtenerDeporte();
    set({ deporte });
  },
  selectDeporte: (id: number) => {
    set({ deporteSelect: id });
  },
}));

export default DeporteStore;