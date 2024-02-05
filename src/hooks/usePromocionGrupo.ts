import { useEffect } from "react";
import { fixtureStore } from "../store/fixture.store";

export const usePromocionGrupo = (id: number) => {
  const { promocionesPorGrupos, obtenerPromocionGrupo } = fixtureStore();

  useEffect(() => {
    obtenerPromocionGrupo(id)

  }, [promocionesPorGrupos])

  return { promocionesPorGrupos }
}
