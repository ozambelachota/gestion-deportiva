import { create } from "zustand";
import { Promocional } from "../types/fixture.api.type";
import { insertarPromociones } from "../services/api.service";

type promocionType = {
  promocion: Promocional;
  agregarPromocion: (promocion: Promocional) => Promise<void>;
};
export const PromocionStore = create<promocionType>((set) => ({
  promocion: {
    id: 0,
    nombre_promocional: "",
    apellido_promocional: "",
    id_promocion_participante: 0,
  },
  agregarPromocion: async (promocion: Promocional) => {
    try {
      if (promocion) {
        const { error } = await insertarPromociones(promocion);
        set({ promocion });
        console.log(error);
      } else {
        console.log("error al enviar");
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
