import type { PreguntaQuiz } from "../logica";

/**
 * Banco · La empanada mágica (aún sin publicar en la web: todo queda
 * inactivo hasta que se publique). Párrafos = manuscrito
 * Proyecto NX_03/Obra/Maquetado/Mini historias/La empanada mágica.docx.
 */

const OBRA = "la-empanada-magica";
const TORNEO = "gran-torneo-etilico-de-glaciem";

export const BANCO_LA_EMPANADA_MAGICA: readonly PreguntaQuiz[] = [
  {
    id: "empanada-c01", obra: OBRA, tipo: "conexion", dificultad: 3,
    // Canon confirmado por el autor (13-oct-2026): las empanadas de Cindralith
    // occidental llevan Nalga de Ángel. Como ningún texto lo dice, la pregunta
    // misma hace el puente y evalúa recordar la especia de La empanada mágica.
    enunciado:
      "En el Gran Torneo Etílico de Glaciem, una confesión sobre las empanadas de Cindralith occidental desata una pelea. Esas empanadas llevan la especia que, en La empanada mágica, a Lyzi le daba vergüenza nombrar. ¿Cuál es?",
    opciones: ["Nalga de Ángel", "Cola de Ángel", "Cola del Diablo", "Pluma de Fénix"], correcta: 0,
    explicacion:
      "Rubí pidió Nalga de Ángel; Lyzi dijo «Cola de Ángel» porque «Nalga de Ángel» le sonaba feo, y Don Carlito terminó vendiéndole Cola del Diablo. Las empanadas de Cindralith occidental llevan la verdadera: Nalga de Ángel.",
    fuente: { obra: OBRA, parrafo: 28, cita: "—Cola de Ángel —repitió Lyzi, con una dignidad cada vez más frágil—. Es que “Nalga de Ángel” sonaba feo." },
    requiere: [OBRA, TORNEO],
    spoilers: [TORNEO]
  }
];
