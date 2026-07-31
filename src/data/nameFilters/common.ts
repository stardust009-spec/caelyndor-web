/**
 * Términos generales bloqueados, no ligados a un dialecto.
 * Editable sin tocar la lógica de moderación (src/lib/nameModeration).
 */
export const COMMON_BLOCKED = {
  // Discurso de odio y slurs: categoría vacía en la entrega inicial a propósito.
  // Poblarla es decisión editorial de Claudio/equipo, caso a caso — son términos
  // sensibles y dependientes de contexto regional que conviene revisar con
  // criterio humano antes de codificarlos.
  discursoDeOdio: [] as string[]
};
