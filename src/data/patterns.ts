export type PatternState = "mencion" | "comparacion" | "ausente";

export const patterns = {
  explorar: {
    question: "¿Qué software de inventario conviene a una pyme?",
    insight:
      "En este ejemplo ficticio, Norte aparece cuando se pregunta por control de stock. El lugar cambia según la consulta.",
    rows: [
      ["Inventario para pymes", "mencion", "ausente", "mencion"],
      ["Alternativas de stock", "mencion", "mencion", "ausente"],
      ["Stock en tiempo real", "mencion", "mencion", "mencion"],
      ["Conectar mi tienda", "ausente", "mencion", "ausente"],
    ],
  },
  comparar: {
    question: "¿Cómo se compara Norte con otras opciones?",
    insight:
      "Las integraciones entran en la comparación. Ya no alcanza con saber que el producto controla stock.",
    rows: [
      ["Control de stock", "comparacion", "comparacion", "mencion"],
      ["Integraciones", "mencion", "comparacion", "comparacion"],
      ["Información publicada", "comparacion", "mencion", "mencion"],
      ["Ajuste para mi pyme", "ausente", "comparacion", "comparacion"],
    ],
  },
  elegir: {
    question: "¿Qué tendría que revisar antes de elegir?",
    insight:
      "Aparece una pregunta pendiente: qué integraciones tiene Norte. Esa duda conecta la lectura con una acción sobre la web.",
    rows: [
      ["Funciones de stock", "mencion", "comparacion", "mencion"],
      ["Integraciones a revisar", "comparacion", "mencion", "comparacion"],
      ["Próximos pasos", "mencion", "mencion", "ausente"],
      ["Dónde conocer más", "mencion", "ausente", "mencion"],
    ],
  },
} satisfies Record<
  string,
  {
    question: string;
    insight: string;
    rows: [string, PatternState, PatternState, PatternState][];
  }
>;

export const stateLabels: Record<PatternState, string> = {
  mencion: "Mención",
  comparacion: "Comparación",
  ausente: "Sin mención",
};
