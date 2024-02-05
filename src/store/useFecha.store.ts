import { create } from 'zustand'


type Fecha = {
  fecha: [];

  fechaInicio:null
  setSelectFecha: (date) => void
}

export const FechaStore = create<Fecha>((set) => ({
  fecha: [],
  fechaInicio:null,
  setSelectFecha: (date) =>  set({fechaInicio:date})
})) 
