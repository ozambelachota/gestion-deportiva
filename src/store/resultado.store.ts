import { create } from "zustand";
import { getResult, insertedResult } from "../services/api.service";
export interface FormResult {
  fixture_id: number;
  resultado: string;
  ganador_id: number | null;
} 

interface storeResult {
  result: FormResult;
  results: FormResult[];
  resultado: string;
  ganador: number | null;
  setGanador: (ganador: number | null) => void;
  getResult: () => Promise<void>;
  setResult: (result: string) => void;
  insertResult: (result: FormResult) => Promise<void>;
}

export const ResultadStoreForm = create<storeResult>()((set) => ({
  result: {
    id: 0,
    create_at: new Date(),
    fixture_id: 0,
    resultado: "",
    ganador_id: 0,
  },
  ganador: 0,
  results: [
    {
      id: 0,
      create_at: new Date(),
      fixture_id: 0,
      resultado: "",
      ganador_id: 0,
    },
  ],
  resultado: "",
  getResult: async () => {
    const results = await getResult();
    set({ results });
  },
  setResult: (resultado: string) => {
    set({ resultado });
  },
  insertResult: async (resultInsert: FormResult) => {
    const resultados = await insertedResult(resultInsert);
    if (resultados) set({ results: resultados });
  },
  setGanador: (ganador: number | null) => {
    set({ ganador });
  },
}));
