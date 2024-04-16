export interface Voley {
  id?: number
  promocion: number
  deporte_id:number
  promocion_participante?: {
    nombre_promocion: string
  }
  puntos: number
  partidos_g: number
  partidos_p: number
  partidos_j: number
}