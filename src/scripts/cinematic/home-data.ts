// Normalized drawing coordinates, never measured mentions, dates or outcomes.
// The product scene identifies this as an Esquema and exposes no numeric values.
export const homeIllustration = {
  actors: [
    {
      name: "tu_marca",
      color: "#9b7500",
      positions: [0.34, 0.44, 0.39, 0.57, 0.51, 0.64, 0.56, 0.62, 0.54, 0.61],
      length: 0.68,
    },
    {
      name: "competidor_a",
      color: "#3f3f3f",
      positions: [0.57, 0.53, 0.59, 0.48, 0.54, 0.47, 0.51, 0.44, 0.5, 0.45],
      length: 0.52,
    },
    {
      name: "competidor_b",
      color: "#777777",
      positions: [0.24, 0.31, 0.27, 0.38, 0.33, 0.39, 0.32, 0.37, 0.31, 0.36],
      length: 0.38,
    },
  ],
} as const;
