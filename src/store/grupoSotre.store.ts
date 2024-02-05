import { create } from 'zustand'

import { GrupoPromocion } from '../types/fixture.api.type.ts'

import { obtenerGrupo } from '../services/api.service.ts'

type grupo = {
  grupos: GrupoPromocion[];
  selectGrupo: number;
  obtenerGrupo: () => Promise<void>
  selectedGrupo: (id: number) => void
}


export const GrupoStore = create<grupo>((set) => ({
  grupos: [{
    id: 0,
    nombre_grupo: ''
  }],
  selectGrupo: 0,
  obtenerGrupo: async () => {
    const grupos = await obtenerGrupo()
    set({ grupos })
  },
  selectedGrupo: (id: number) => {
    if (id <= 0) {
      console.error('no hay ningun grupo seleccionado')
    }
    else {
      set({ selectGrupo: id })
    }
  }

}))
