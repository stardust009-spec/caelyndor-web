/**
 * Términos bloqueados específicos del español de Chile.
 * Editable sin tocar la lógica de moderación: agregar o quitar es una línea.
 * Los términos se comparan ya normalizados (minúsculas, sin diacríticos).
 */
export const ES_CL_BLOCKED = {
  genitalesExplicitos: ["pene", "pico", "tula", "pichula", "verga", "polla"],
  terminosSexualesVulgares: [] as string[], // completar según criterio editorial
  insultosSexuales: ["maraca", "maraco"],
  expresionesObscenasChilenas: [
    "weon",
    "weón",
    "hueon",
    "hueón",
    "culiao",
    "culiado",
    "culeado",
    "conchetumadre",
    "conchesumadre",
    "ctm",
    "chucha"
  ],
  variantesAbreviadas: ["ctm"]
};
