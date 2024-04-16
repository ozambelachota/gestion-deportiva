import {create} from 'zustand'
import { Voley } from '../types/voley.type'
import { updateVoley, voley } from '../voley.service'

interface VoleyStore {
  voleys: Voley[],
  voley: Voley
  setVoley: (voley: Voley) => void
  getVoley: (deporte:number) => void
  updateVoleySet: (voley: Voley) => Promise<void>
}
export const useVoleyStore = create<VoleyStore>()((set) => ({
  voleys: [],
  voley:{
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
  setVoley: (voley) => set({ voley }),
  getVoley: async (deporte:number) => {
    const tblVoley = await voley(deporte);
    set({ voleys: tblVoley });
  },
  updateVoleySet: async (voley:Voley) => {
    const voleyNew = await updateVoley(voley);
    console.log(voleyNew)
    if(voleyNew)  
    set({ voley: voleyNew });
  }
}))