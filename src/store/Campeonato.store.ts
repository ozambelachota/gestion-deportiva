import { create } from "zustand";
import { getCampeonatos } from "../services/api.service";
import { Campeonato } from "./../types/fixture.api.type";

interface campeonatoType {
  campeonatos: Campeonato[];
  campeonato: Campeonato;
  campeonatoParticipante: number;
  setCampeonato: (campeonato: Campeonato) => void;
  setCampeonatoParticipante: (campeonato: number) => void;
  getCampeonato: () => Promise<void>;
}
export const CampeonatoStore = create<campeonatoType>((set) => ({
  campeonatos: [
    {
      id: 0,
      fehcaInicio: new Date(),
      fechaFinal: new Date(),
      nombre_campeonato: "",
      user_id: "0",
    },
  ],
  campeonato: {
    id: 0,
    fehcaInicio: new Date(),
    fechaFinal: new Date(),
    nombre_campeonato: "",
    user_id: "0",
  },
  campeonatoParticipante: 0,
  setCampeonato: (campeonato: Campeonato) => set({ campeonato }),
  setCampeonatoParticipante: (campeonato: number) =>
    set({ campeonatoParticipante: campeonato }),
  getCampeonato: async () => {
    try {
      const campeonato = await getCampeonatos();
      if (campeonato) set({ campeonatos: campeonato });
    } catch (error) {
      console.error(error);
    }
  },
}));
