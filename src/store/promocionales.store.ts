import { create } from "zustand";
import {
  insertPromocionParticipante,
  insertarPromociones,
} from "../services/api.service";
import { Promocional } from "../types/fixture.api.type";
import { PromocionParticipante } from "./../types/fixture.api.type";

type promocionType = {
  promocion: Promocional;
  promocionParticipante: PromocionParticipante;
  agregarPromocion: (promocion: Promocional) => Promise<void>;
  setPromocionParticipante: (promocion: PromocionParticipante) => Promise<void>;
};
export const PromocionStore = create<promocionType>((set) => ({
  promocion: {
    id: 0,
    nombre_promocional: "",
    id_promocion_participante: 0,
    n_goles: 0,
  },
  promocionParticipante: {
    id: 0,
    create_at: new Date(),
    nombre_promocion: "",
    estado: false,
    campeonato_id: 0,
    grupo_id: 0,
    tipo_id: 0,
  },
  agregarPromocion: async (promocion: Promocional) => {
    try {
      if (promocion) {
        const promocionData = await insertarPromociones(promocion);
        if (promocionData) set({ promocion: promocionData });
      } else {
        console.log("error al enviar");
      }
    } catch (error) {
      console.error(error);
    }
  },
  setPromocionParticipante: async (promocion: PromocionParticipante) => {
    try {
      if (promocion) {
        const promocionParticipanteData = await insertPromocionParticipante(
          promocion
        );

        if (promocionParticipanteData)
          set({ promocionParticipante: promocion });
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
