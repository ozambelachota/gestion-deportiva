import { create } from "zustand";
import { getTablaPosiciones } from "../services/api.service";
import type { TablaPosicion } from "../types/fixture.api.type";

interface posicionType {
  tablaPosicion: TablaPosicion[];
  uploadTablaPosicion: () => Promise<void>;
}

export const PosicionStore = create<posicionType>()((set) => ({
  tablaPosicion: [
    {
      id: 0,
      create_at: new Date(),
      promocion: 0,
      goles_f: 0,
      goles_e: 0,
      puntos: 0,
      diferencia_goles: 0,
      grupo_id: 0,
    },
  ],
  uploadTablaPosicion: async () => {
    const tablaPosicion = await getTablaPosiciones();
    set({ tablaPosicion });
  },
}));
