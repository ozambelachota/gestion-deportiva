export interface Campeonato {
  id?: number;
  nombre_campeonato: string;
  fehcaInicio: Date;
  fechaFinal: Date;
  user_id: string;
}

export interface campo {
  id_campo: number;
  nombre_campo: string;
}

export interface Fixture {
  id?: number;
  promocion: string;
  vs_promocion: string;
  fecha_partido: Date;
  campo_id: number;
  grupo_id: number;
  n_fecha_jugada: number;
}
export interface GrupoPromocion {
  id: number;
  nombre_grupo: string;
}
export interface PromocionParticipante {
  id: number;
  create_at: Date;
  nombre_promocion: string;
  estado: boolean;
  fecha_admitido: Date | null;
  campeonato_id: number;
  grupo_id: number;
  tipo_id: number;
}
export interface TablaPosicion {
  id?: number;
  posicion: number;
  promocion: string;
  diferencia_goles: number;
  grupo_id: number;
}
export interface ListaDeuda {
  id?: number;
  nombre_jugador: string;
  estado: string;
  mes_deuda: Date;
  promocion_id: number;
}
export interface ListaSancion {
  id?: number;
  motivo_sancion: string;
  estado_sancion: boolean;
  fecha_inicio_sancion: Date;
  fecha_final_sancion: Date;
  monto_sancion: number;
  estado_pagado: boolean;
  cant_tarjeta_amarillas: number;
  cant_tarjeta_rojas: number;
  promocion_id: number;
  tipo_sancion: number;
}

export interface PresidenteMesa {
  id?: number;
  nombre: string;
  apellido: string;
}
export interface Deporte {
  id?: number;
  nombre_tipo: string;
}
export interface Promocional {
  id?: number;
  nombre_promocional: string;
  apellido_promocional: string;
  id_promocion_participante: number;
}
