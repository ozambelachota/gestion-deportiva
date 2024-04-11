import { create } from "zustand";
import { Campo } from "./../types/fixture.api.type";

interface CampoType {
  campos: Campo[];
  campoSelect: number;

  selectCampo: (id: number) => void;
}

export const CampoStore = create<CampoType>()((set) => ({
  campos: [
    {
      id_campo: 1,
      nombre_campo: "campo 1",
    },
    {
      id_campo: 2,
      nombre_campo: "campo 2",
    },
    {
      id_campo: 3,
      nombre_campo: "campo 3",
    },
  ],
  campoSelect: 0,

  selectCampo: (id: number) => {
    if (id <= 0) {
      console.error("no hay ningun campo seleccionado");
    } else {
      set({ campoSelect: id });
    }
  },
}));
