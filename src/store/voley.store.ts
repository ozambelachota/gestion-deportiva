import { voley } from "../services/api.service";
import { VoleyPosicion } from "./../types/fixture.api.type";

import { create } from "zustand";

interface VoleyStore  {
  voley: VoleyPosicion[];
  voleySet: VoleyPosicion
  setVoley: (voley: VoleyPosicion[]) => void;
  getVoley: () => Promise<void>;
};

const voleyStore = create<VoleyStore>()((set) => ({
  voley: [{
    id: 0,
    promocion: 0,
    deporte_id: 0,
    puntos: 0,
    partidos_g: 0,
    partidos_p: 0,
    partidos_j: 0,
    promocion_participante: {
      nombre_promocion: "",
    }
  }],
  voleySet:{
    id: 0,
    promocion: 0,
    deporte_id: 0,
    puntos: 0,
    partidos_g: 0,
    partidos_p: 0,
    partidos_j: 0,
    promocion_participante: {
      nombre_promocion: "",
    }
  },
  setVoley: (voley: VoleyPosicion[]) => set({ voley }),
  getVoley: async () => {
    const tblVoley = await voley();
    set({ voley: tblVoley });
  },
}));

export default voleyStore;
