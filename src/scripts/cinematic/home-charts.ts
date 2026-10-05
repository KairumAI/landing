import type { Chart as ChartType, LineElement, Plugin } from "chart.js";
import { homeIllustration } from "./home-data.js";
let Chart: typeof ChartType | undefined;
type SceneChart =
  ChartType<"bar", number[], string> | ChartType<"line", number[], string>;
let library: Promise<void> | undefined;
function loadCharts() {
  if (Chart) return Promise.resolve();
  return (library ??= import("chart.js/auto")
    .then((module) => {
      Chart = module.default;
    })
    .catch((error) => {
      library = undefined;
      throw error;
    }));
}

export function enhanceStudyCharts(
  motionAllowed: () => boolean,
  listeners: (() => void)[],
) {
  document.querySelectorAll<HTMLElement>(".scene-analytics").forEach((root) => {
    const charts: {
      chart: SceneChart;
      graph: HTMLElement;
      visible: boolean;
      started: boolean;
      done: boolean;
      moving: boolean;
      clock: { value: number };
    }[] = [];
    const seen = new WeakSet<HTMLElement>();
    const visibility = new WeakMap<HTMLElement, boolean>();
    const graphs = [...root.querySelectorAll<HTMLElement>(".study-graph")];
    let loading = false,
      disposed = false,
      frame = 0,
      previous = 0,
      elapsed = 0;
    const common = {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: Math.min(devicePixelRatio, 2),
      animation: false as const,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      events: [] as [],
    };
    function stopAmbient() {
      if (frame) cancelAnimationFrame(frame);
      frame = previous = 0;
      charts.forEach(
        ({ graph }) =>
          (graph.dataset.chartAmbient = !motionAllowed()
            ? "reduced"
            : "paused"),
      );
    }
    function tick(time: number) {
      frame = 0;
      const active = charts.filter(
        (record) => record.done && record.visible && record.moving,
      );
      if (disposed || !motionAllowed() || document.hidden || !active.length)
        return stopAmbient();
      if (!previous || time - previous >= 33) {
        elapsed += previous ? Math.min(100, time - previous) : 0;
        previous = time;
        active.forEach(({ chart, graph, clock }) => {
          clock.value = (elapsed % 8000) / 8000;
          graph.dataset.chartPhase = clock.value.toFixed(3);
          graph.dataset.chartAmbient = "playing";
          chart.draw(); // Only the signal moves; the schematic datasets never change.
        });
      }
      frame = requestAnimationFrame(tick);
    }
    function syncAmbient() {
      if (
        disposed ||
        !motionAllowed() ||
        document.hidden ||
        !charts.some((record) => record.done && record.visible && record.moving)
      )
        return stopAmbient();
      charts.forEach(
        ({ graph, visible, done, moving }) =>
          (graph.dataset.chartAmbient = !moving
            ? "static"
            : visible && done
              ? "playing"
              : "paused"),
      );
      if (!frame) frame = requestAnimationFrame(tick);
    }
    async function load() {
      if (loading || charts.length || disposed) return;
      loading = true;
      try {
        await loadCharts();
        if (disposed || !Chart) return;
        const ChartConstructor = Chart;
        root
          .querySelectorAll<HTMLCanvasElement>("[data-study-chart]")
          .forEach((canvas) => {
            const graph = canvas.closest<HTMLElement>(".study-graph")!;
            graph.dataset.chartReady = "true";
            const clock = { value: 0 };
            const signal: Plugin<"line"> = {
              id: "kairum-schematic-signal",
              afterDatasetsDraw(chart) {
                if (!motionAllowed()) return;
                const meta = chart.getDatasetMeta(0);
                if (meta.data.length < 2) return;
                const first = meta.data[0],
                  last = meta.data[meta.data.length - 1];
                const point = (meta.dataset as LineElement).interpolate(
                  { x: first.x + (last.x - first.x) * clock.value, y: 0 },
                  "x",
                );
                const position = Array.isArray(point) ? point[0] : point;
                if (
                  !position ||
                  typeof position.x !== "number" ||
                  typeof position.y !== "number"
                )
                  return;
                const ctx = chart.ctx;
                ctx.save();
                ctx.beginPath();
                ctx.arc(position.x, position.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = "#ffc400";
                ctx.strokeStyle = "#705600";
                ctx.lineWidth = 2;
                ctx.shadowColor = "#ffc400";
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.stroke();
                ctx.restore();
              },
            };
            const chart =
              canvas.dataset.studyChart === "trend"
                ? new ChartConstructor<"line", number[], string>(canvas, {
                    type: "line",
                    plugins: [signal],
                    data: {
                      labels: Array.from({ length: 10 }, (_, i) => String(i)),
                      datasets: homeIllustration.actors.map((actor, index) => ({
                        label: actor.name,
                        data: [...actor.positions],
                        borderColor: actor.color,
                        borderWidth: index ? 2 : 3,
                        pointRadius: 0,
                        tension: 0.38,
                        borderDash: index === 2 ? [5, 5] : [],
                        fill: index === 0,
                        backgroundColor: "#ffc4000c",
                      })),
                    },
                    options: {
                      ...common,
                      scales: {
                        x: {
                          ticks: { display: false },
                          grid: { display: false },
                          border: { display: false },
                        },
                        y: {
                          min: 0,
                          max: 1,
                          ticks: { display: false, stepSize: 0.25 },
                          grid: { color: "#e5e5df" },
                          border: { display: false },
                        },
                      },
                    },
                  })
                : new ChartConstructor<"bar", number[], string>(canvas, {
                    type: "bar",
                    data: {
                      labels: homeIllustration.actors.map(
                        (actor) => actor.name,
                      ),
                      datasets: [
                        {
                          data: homeIllustration.actors.map(
                            (actor) => actor.length,
                          ),
                          backgroundColor: ["#ffc400", "#707070", "#a4a4a0"],
                          borderColor: ["#705600", "#575757", "#777777"],
                          borderWidth: 2,
                          borderSkipped: false,
                          borderRadius: 4,
                          barThickness: 29,
                        },
                      ],
                    },
                    options: {
                      ...common,
                      indexAxis: "y",
                      scales: {
                        x: {
                          min: 0,
                          max: 1,
                          ticks: { display: false, stepSize: 0.25 },
                          grid: { color: "#e5e5df" },
                          border: { display: false },
                        },
                        y: { display: false, offset: true },
                      },
                    },
                  });
            charts.push({
              chart,
              graph,
              clock,
              visible: visibility.get(graph) ?? false,
              started: seen.has(graph),
              done: seen.has(graph),
              moving: canvas.dataset.studyChart === "trend",
            });
          });
        root.dataset.charts = "ready";
        sync();
      } catch (error) {
        console.warn("KAIRUM schematic charts could not initialize", error);
        charts.forEach(({ chart }) => chart.destroy());
        charts.length = 0;
        graphs.forEach((graph) => delete graph.dataset.chartReady);
        root.dataset.charts = "fallback";
      } finally {
        loading = false;
      }
    }
    function reflect() {
      charts.forEach(
        (record) =>
          (record.graph.dataset.chartAnimation = record.done
            ? "complete"
            : record.started
              ? "playing"
              : "paused"),
      );
      root.dataset.chartAnimation = charts.some(
        (record) => record.started && !record.done,
      )
        ? "playing"
        : charts.length && charts.every((record) => record.done)
          ? "complete"
          : "paused";
      syncAmbient();
    }
    function sync() {
      charts.forEach((record) => {
        const { chart, graph } = record;
        if (!motionAllowed() || document.hidden || !record.visible) {
          chart.stop();
          chart.update("none");
          if (record.started || !motionAllowed()) {
            record.started = record.done = true;
            seen.add(graph);
          }
          return;
        }
        if (record.started) return;
        record.started = true;
        seen.add(graph);
        chart.options.animation = {
          duration: 1800,
          easing: "easeOutQuart",
          onComplete: () => {
            record.done = true;
            reflect();
          },
        };
        chart.reset();
        chart.update();
      });
      reflect();
    }
    let prepare: IntersectionObserver | undefined,
      visible: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      prepare = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            void load();
            prepare?.disconnect();
          }
        },
        { rootMargin: "500px" },
      );
      visible = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const graph = entry.target as HTMLElement,
              inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
            graph.dataset.chartVisible = String(inView);
            graph.dataset.chartRatio = entry.intersectionRatio.toFixed(3);
            visibility.set(graph, inView);
            const record = charts.find((record) => record.graph === graph);
            if (record) record.visible = inView;
          });
          sync();
        },
        { threshold: 0.35 },
      );
      prepare.observe(root);
      graphs.forEach((graph) => visible!.observe(graph));
    } else {
      graphs.forEach((graph) => visibility.set(graph, true));
      void load();
    }
    listeners.push(sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pagehide", () => {
      disposed = true;
      stopAmbient();
      prepare?.disconnect();
      visible?.disconnect();
      charts.forEach(({ chart }) => chart.destroy());
      charts.length = 0;
      graphs.forEach((graph) => delete graph.dataset.chartReady);
      root.dataset.charts = "fallback";
    });
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        disposed = false;
        graphs.forEach((graph) => visible?.observe(graph));
        void load();
      }
    });
  });
}
