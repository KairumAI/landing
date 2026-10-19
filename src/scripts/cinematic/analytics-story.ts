import type { Chart as ChartType } from "chart.js";
import { analyticsStoryData as data } from "../../lib/analytics-story-data";

export function enhanceAnalyticsStory(motionAllowed: () => boolean) {
  let library: Promise<typeof ChartType> | undefined;
  document
    .querySelectorAll<HTMLElement>("[data-analytics-story]")
    .forEach((root) => {
      const canvas = root.querySelector<HTMLCanvasElement>("[data-as-chart]");
      if (!canvas) return;
      const period = () =>
        Number(
          root.querySelector<HTMLInputElement>("[data-as-period]:checked")
            ?.value ?? 7,
        );
      const compare =
        root.querySelector<HTMLInputElement>("[data-as-compare]")!;
      const labels = Array.from(
        root.querySelectorAll<HTMLElement>(".as-legend-series"),
      ).map((el) => el.textContent?.trim() ?? "");
      const reading = root.dataset.chartLabel!;
      let chart: ChartType<"line", number[], string> | undefined;
      let sentimentChart: ChartType<"line", number[], string> | undefined;
      const sentimentCanvas = root.querySelector<HTMLCanvasElement>(
        "[data-as-sentiment-chart]",
      );
      let loading = false;
      const update = () => {
        if (!chart) return;
        const count = period();
        chart.data.labels = Array.from(
          { length: count },
          (_, i) => `${reading} ${15 - count + i}`,
        );
        root
          .querySelectorAll<HTMLTableRowElement>(".as-chart-data tbody tr")
          .forEach((row, i) => {
            row.hidden = i < 14 - count;
          });
        chart.data.datasets.forEach((dataset, i) => {
          dataset.data = [...data.series[i as 0 | 1 | 2].slice(-count)];
          chart!.setDatasetVisibility(i, i === 0 || compare.checked);
        });
        chart.update(motionAllowed() ? undefined : "none");
        root
          .querySelectorAll<HTMLElement>(".as-legend-series")
          .forEach((el, i) => {
            el.hidden = i !== 0 && !compare.checked;
          });
      };
      async function load() {
        if (chart || loading) return;
        loading = true;
        try {
          library ??= import("chart.js/auto").then((module) => module.default);
          const Chart = await library;
          const accent =
            getComputedStyle(root)
              .getPropertyValue("--product-accent")
              .trim() || "#087f5b";
          const wrapper = canvas!.parentElement!;
          wrapper.hidden = false;
          chart = new Chart<"line", number[], string>(canvas!, {
            type: "line",
            data: {
              labels: [],
              datasets: labels.map((label, i) => ({
                label,
                data: [],
                borderColor: [accent, "#656a60", "#9a9d94"][i],
                backgroundColor: i === 0 ? `${accent}18` : "transparent",
                borderWidth: i === 0 ? 2.5 : 1.5,
                pointRadius: 0,
                pointHitRadius: 10,
                tension: 0.22,
                fill: i === 0,
                borderDash: i === 2 ? [4, 4] : [],
              })),
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: motionAllowed() ? { duration: 450 } : false,
              interaction: { intersect: false, mode: "index" },
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: "#fff",
                  titleColor: "#181818",
                  bodyColor: "#575757",
                  borderColor: "#e5e5df",
                  borderWidth: 1,
                  padding: 12,
                  callbacks: {
                    label: (item) => `${item.dataset.label}: ${item.parsed.y}%`,
                  },
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  border: { display: false },
                  ticks: {
                    color: "#64665d",
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 4,
                    font: { family: "Kairum Inter, sans-serif", size: 10 },
                  },
                },
                y: {
                  min: 0,
                  max: 100,
                  border: { display: false },
                  grid: { color: "#edede7" },
                  ticks: {
                    stepSize: 25,
                    color: "#64665d",
                    callback: (value) => `${value}%`,
                    font: { family: "Kairum Inter, sans-serif", size: 10 },
                  },
                },
              },
            },
          });
          update();
          if (sentimentCanvas) {
            sentimentCanvas.parentElement!.hidden = false;
            sentimentChart = new Chart<"line", number[], string>(
              sentimentCanvas,
              {
                type: "line",
                data: {
                  labels: data.sentimentTrend.map(
                    (_, i) => `${reading} ${i + 8}`,
                  ),
                  datasets: [
                    {
                      label: labels[0],
                      data: [...data.sentimentTrend],
                      borderColor: "#28704a",
                      borderWidth: 2,
                      pointRadius: 2,
                      tension: 0.2,
                    },
                  ],
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  animation: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (item) =>
                          `${item.dataset.label}: ${item.parsed.y}%`,
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      border: { display: false },
                      ticks: {
                        color: "#64665d",
                        maxRotation: 0,
                        maxTicksLimit: 4,
                        font: { family: "Kairum Inter, sans-serif", size: 10 },
                      },
                    },
                    y: {
                      min: 0,
                      max: 100,
                      border: { display: false },
                      grid: { color: "#edede7" },
                      ticks: {
                        color: "#64665d",
                        stepSize: 25,
                        callback: (value) => `${value}%`,
                        font: { family: "Kairum Inter, sans-serif", size: 10 },
                      },
                    },
                  },
                },
              },
            );
            const sentimentFallback =
              root.querySelector<HTMLDetailsElement>(".as-sentiment-data")!;
            if (!sentimentFallback.contains(document.activeElement))
              sentimentFallback.open = false;
          }
          const fallback =
            root.querySelector<HTMLDetailsElement>(".as-chart-data")!;
          if (!fallback.contains(document.activeElement)) fallback.open = false;
          fallback.dataset.enhanced = "true";
          root.dataset.chartReady = "true";
        } catch {
          canvas!.parentElement!.hidden = true;
          chart?.destroy();
          sentimentChart?.destroy();
          if (sentimentCanvas) sentimentCanvas.parentElement!.hidden = true;
          chart = undefined;
          library = undefined;
          root.dataset.chartReady = "fallback";
        } finally {
          loading = false;
        }
      }
      root
        .querySelectorAll<HTMLInputElement>(
          "[data-as-period], [data-as-compare]",
        )
        .forEach((input) => input.addEventListener("change", update));
      const media = matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", () => {
        if (chart && !motionAllowed()) {
          chart.stop();
          chart.options.animation = false;
          chart.update("none");
        }
      });
      if (typeof IntersectionObserver === "undefined") {
        void load();
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            void load();
          }
        },
        { rootMargin: "300px" },
      );
      observer.observe(root);
      // A BFCache restoration can happen repeatedly on the same document.
      window.addEventListener("pagehide", () => {
        observer.disconnect();
        chart?.destroy();
        sentimentChart?.destroy();
        chart = undefined;
        sentimentChart = undefined;
      });
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          chart = undefined;
          void load();
        }
      });
    });
}
