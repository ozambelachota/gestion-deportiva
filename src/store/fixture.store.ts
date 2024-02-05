import { create } from "zustand";
import {
  getPartidosFechaNoMayor,
  insertFixturePartidos,
  obtenerDeporte,
  obtenerGrupo,
  obtenerPromocionalesParticipantes,
  obtenerPromocionesPorGrupos,
} from "../services/api.service";
import {
  GrupoPromocion,
  PromocionParticipante,
} from "../types/fixture.api.type";
import { Deporte, Fixture } from "./../types/fixture.api.type";
type Store = {
  promocionParticipante: PromocionParticipante[];
  promocionesPorGrupos: PromocionParticipante[];
  grupo: GrupoPromocion[];
  deporte: Deporte[];
  fixture: Fixture[] | [] | null;
  fecha: Date;
  selectGrupo: number;
  obtenerPromociones: () => Promise<void>;
  obtenerGrupo: () => Promise<void>;
  getDeporte: (id: number) => Promise<void>;
  obtenerPromocionGrupo: (id: number) => Promise<void>;
  guardarPartido: (partido: Fixture[]) => Promise<void>;
  partidosPorFecha: () => Promise<void>;
};

export const fixtureStore = create<Store>((set) => ({
  promocionParticipante: [
    {
      id: 0,
      campeonato_id: 0,
      create_at: new Date(),
      estado: false,
      fecha_admitido: new Date(),
      grupo_id: 0,
      nombre_promocion: "",
      tipo_id: 0,
    },
  ],
  promocionesPorGrupos: [
    {
      campeonato_id: 0,
      create_at: new Date(),
      estado: false,
      fecha_admitido: new Date(),
      grupo_id: 0,
      id: 0,
      nombre_promocion: "",
      tipo_id: 0,
    },
  ],
  grupo: [
    {
      id: 0,
      nombre_grupo: "",
    },
  ],
  deporte: [
    {
      id: 0,
      nombre_tipo: "",
    },
  ],
  fixture: [
    {
      campo_id: 0,
      fecha_partido: new Date(),
      grupo_id: 0,
      promocion: "",
      id: 0,
      vs_promocion: "",
      n_fecha_jugada: 0,
    },
  ],
  fecha: new Date(),
  selectGrupo: 1,
  obtenerPromociones: async () => {
    const promociones = await obtenerPromocionalesParticipantes();
    set({ promocionParticipante: promociones });
  },
  getDeporte: async (id: number) => {
    const deporte = await obtenerDeporte(id);
    set({ deporte });
  },
  obtenerGrupo: async () => {
    const grupo = await obtenerGrupo();
    set({ grupo });
  },
  obtenerPromocionGrupo: async (id: number) => {
    const promociones = await obtenerPromocionesPorGrupos(id);
    set({ promocionesPorGrupos: promociones });
  },
  guardarPartido: async (partido: Fixture[]) => {
    const savePartido = await insertFixturePartidos(partido);
    set({ fixture: savePartido });
  },
  partidosPorFecha: async () => {
    const partiods = await getPartidosFechaNoMayor();
    set({ fixture: partiods });
  }
}));
