// Fixed synthetic observations for the public demonstration. Never client data.
export const analyticsStoryData = {
  series: [
    [20, 24, 22, 28, 26, 30, 32, 26, 30, 28, 34, 40, 36, 38],
    [34, 32, 36, 30, 34, 38, 36, 34, 35, 35, 33, 36, 32, 32],
    [18, 20, 24, 22, 20, 26, 24, 24, 22, 25, 26, 25, 28, 28],
  ],
  ranking: [38, 32, 28, 24, 18],
  sentimentTrend: [44, 50, 48, 52, 58, 54, 56],
  // Positive / neutral / negative counts, each row totals its topic mentions.
  sentiment: [
    [21, 6, 3],
    [10, 8, 6],
    [12, 5, 3],
    [8, 5, 3],
    [5, 4, 1],
  ],
  citations: [32, 24, 16, 12, 10, 6],
  pageCitations: [14, 10, 8],
} as const;
