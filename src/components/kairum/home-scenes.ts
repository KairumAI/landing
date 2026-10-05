import type { Translate } from "../../i18n/marketing/index";
import { escapeHtml } from "../../lib/escape";
import { homeIllustration } from "../../scripts/cinematic/home-data";
export function createHomeScenes(t: Translate) {
  const h = (key: Parameters<Translate>[0]) => escapeHtml(t(key));
  const icon = (name: string) =>
    `<i data-icon="${name}" aria-hidden="true" style="--icon:url('/kairum/assets/icons/${encodeURIComponent(name)}.svg')"></i>`;
  const scene = (kind: string, label: string, content: string) =>
    `<div class="cinematic-scene scene-${kind}" data-home-scene="${kind}" role="group" aria-label="${label}">${content}</div>`;
  function homeAnswerScene() {
    return scene(
      "answer",
      t("de_la_pregunta_a_la_respuesta_y_su_fuente"),
      `<div class="answer-glass" data-home-object data-home-drift>
      <div class="glass-question" data-home-enter>${icon("MagnifyingGlass")}<span>${h("que_software_sirve_para_coordinar")}<br> ${h("un_equipo_de_diseno")}</span></div>
      <article class="glass-answer" data-home-enter><span class="scene-kicker">${h("respuesta")}</span><p>${h("tu_marca_reune_briefs_y_comentarios")}<br> ${h("para_coordinar_el_trabajo_de_diseno")}</p><div><mark>${h("tu_marca")}</mark><span>${h("tu_marca_example_equipo")}</span></div></article>
    </div>
    <article class="glass-source" data-home-object data-home-enter data-home-drift style="--float-delay:-2s"><div>${icon("Link")}<h2>${h("fuente")}</h2></div><p>${h("briefs_comentarios_y_revisiones")}<br> ${h("por_proyecto_en_un_solo_lugar")}</p><small>${h("tu_marca_example_equipo")}</small></article>
    <span class="scene-annotation" aria-hidden="true">${h("pregunta_respuesta_fuente")}</span>`,
    );
  }
  function homePromptScene() {
    return scene(
      "prompts",
      t(
        "prompt_intelligence_preguntas_del_equipo_intencion_y_temas_para_investigar",
      ),
      `<div class="prompt-intelligence-board" data-home-object>
      <div class="prompt-discovery-stage" data-home-drift>
        <img src="/kairum/assets/home-prompt-discovery.png" width="1536" height="1024" alt="${h("una_lente_dorada_examina_fichas_de_preguntas_sobre_una_base")}" loading="lazy">
        <article class="prompt-featured-query" data-home-enter><div>${icon("MagnifyingGlass")}<span>${h("pregunta_de_tu_equipo")}</span></div><h3>${h("que_herramienta_se_adapta")}<br> ${h("mejor_a_mi_equipo")}</h3><span class="prompt-query-intent">${h("intencion_elegir")}</span></article>
      </div>
      <div class="prompt-research-plan" data-home-enter><div class="prompt-plan-title">${icon("Stack")}<h4>${h("tu_mapa_de_preguntas")}</h4><span>${h("por_investigar")}</span></div><ol>${[
        [t("descubrir"), t("como_mejorar_el_proceso_de_diseno")],
        [t("comparar"), t("alternativas_para_coordinar_el_equipo")],
        [t("elegir"), t("que_herramienta_encaja_con_tu_equipo")],
      ]
        .map(
          ([intent, topic]) => `<li><span>${intent}</span><p>${topic}</p></li>`,
        )
        .join("")}</ol></div>
    </div>`,
    );
  }
  function homeAnalyticsScene(prefix = "home") {
    const actors = homeIllustration.actors.map((actor) => ({
      ...actor,
      name: t(actor.name),
    }));
    const legend = actors
      .map(
        (actor, index) =>
          `<span class="analytics-legend-item legend-${index}">${icon("Circle")}${actor.name}</span>`,
      )
      .join("");
    const fallback = `<div class="chart-fallback"><p>${h("esquema_de_la_lectura_de_menciones_sin_cifras_de_una")}</p><ul>${actors.map((actor) => `<li>${actor.name}</li>`).join("")}</ul></div>`;
    return scene(
      "analytics",
      t(
        "vista_de_analytics_para_tu_marca_y_competidores_graficos_esquematicos",
      ),
      `<div class="analytics-workspace" data-home-object>
      <aside class="analytics-sidebar"><span class="scene-brand brand-lockup"><img src="/kairum/assets/logos/convergencia-lockup.webp" width="1536" height="1024" alt="KAIRUM"></span><a href="#${prefix}-mentions">${icon("Stack")}${h("tu_marca")}</a><a href="#${prefix}-mentions" class="workspace-current">${icon("Eye")}${h("visibilidad")}</a><a href="/productos/prompt-intelligence/">${icon("MagnifyingGlass")}${h("preguntas")}</a><a href="/productos/analytics/#capacidades">${icon("FileText")}${h("fuentes")}</a></aside>
      <div class="analytics-main"><nav class="analytics-nav" aria-label="${h("vistas_de_analytics")}"><a href="#${prefix}-mentions" class="workspace-current">${h("evolucion")}</a><a href="#${prefix}-compare">${h("comparativa")}</a><a href="/productos/analytics/#capacidades">${h("fuentes")}</a></nav>
        <header class="analytics-report-head"><div><h3>${h("tu_marca")}</h3><p>${h("tu_presencia_en_las_respuestas_de_ia")}</p></div><span class="analytics-schematic">${h("esquema")}</span></header>
        <div class="analytics-graphs">
          <figure id="${prefix}-mentions" class="study-graph graph-trend"><figcaption><h4>${h("evolucion_de_menciones")}</h4><p>${h("tu_marca_y_tus_competidores_en_perspectiva")}</p></figcaption><div class="chart-body"><div class="chart-plot"><canvas data-study-chart="trend" role="img" aria-label="${h("esquema_de_una_linea_de_menciones_de_tu_marca_y")}"></canvas></div></div><div class="analytics-legend">${legend}</div>${fallback}</figure>
          <figure id="${prefix}-compare" class="study-graph graph-mentions"><figcaption><h4>${h("menciones_por_marca")}</h4><p>${h("una_lectura_comparativa_de_las_respuestas")}</p></figcaption><div class="chart-body"><div class="chart-labels" aria-hidden="true">${actors.map((actor) => `<span>${actor.name}</span>`).join("")}</div><div class="chart-plot"><canvas data-study-chart="mentions" role="img" aria-label="${h("barras_esquematicas_de_tu_marca_competidor_a_y_competidor_b")}"></canvas></div></div><p class="chart-unit">${h("marcas_que_aparecen_en_las_respuestas")}</p>${fallback}</figure>
        </div>
      </div>
    </div><div class="analytics-plinth" aria-hidden="true"><img src="/kairum/assets/home-analytics-plinth.png" width="2172" height="724" alt="" loading="lazy"></div>`,
    );
  }
  function homeAgentsScene() {
    return scene(
      "agents",
      t("brief_y_fuente_borrador_y_revision"),
      `<div class="agent-workflow" data-home-object><div class="agent-inputs"><article class="agent-paper" data-home-enter data-home-drift>${icon("NotePencil")}<h3>${h("brief")}</h3><p>${h("una_pregunta")}<br> ${h("un_objetivo_claro")}</p></article><article class="agent-paper" data-home-enter data-home-drift>${icon("FileText")}<h3>${h("fuente")}</h3><p>${h("hechos_y_contexto")}<br> ${h("de_tu_marca")}</p></article></div><span class="workflow-arrow" aria-hidden="true">${icon("ArrowRight")}</span><article class="agent-paper agent-draft" data-home-enter data-home-drift style="--float-delay:-2s">${icon("NotePencil")}<h3>${h("borrador")}</h3><p>${h("una_propuesta")}<br> ${h("con_evidencia")}</p><mark>${h("contenido_preparado")}</mark><small>${h("version_para_revisar")}</small></article><span class="workflow-arrow" aria-hidden="true">${icon("ArrowRight")}</span><article class="agent-paper agent-review" data-home-enter data-home-drift style="--float-delay:-4s">${icon("CheckCircle")}<h3>${h("revision")}</h3><p>${h("criterio_y_control")}<br> ${h("de_tu_equipo")}</p><span>${icon("FileText")}${h("fuentes_vinculadas")}</span><span>${icon("CheckCircle")}${h("revision_humana")}</span></article></div>`,
    );
  }
  function homeTrafficScene() {
    return scene(
      "traffic",
      t("traffic_una_persona_visita_tu_web_desde_un_enlace_un"),
      `<div class="traffic-observation" data-home-object>
      <div class="traffic-observation-head"><article class="traffic-observation-label" data-home-enter><span>${icon("CursorClick")}${h("personas")}</span><h3>${h("visitas_desde_ia")}</h3></article><article class="traffic-observation-label" data-home-enter><span>${icon("Globe")}${h("rastreadores")}</span><h3>${h("solicitudes_de_contenido")}</h3></article></div>
      <div class="traffic-observation-art" data-home-drift><img src="/kairum/assets/home-traffic-visits-requests.png" width="1536" height="1024" alt="${h("a_la_izquierda_una_pagina_y_un_cursor_a_la")}" loading="lazy"></div>
      <div class="traffic-observation-details"><article data-home-enter><p>${h("una_persona_abre_tu_pagina")}<br> ${h("desde_una_respuesta_de_ia")}</p><span>${icon("CursorClick")}${h("visita_analitica_web")}</span></article><article data-home-enter><p>${h("un_crawler_solicita_una_pagina")}<br> ${h("a_tu_servidor")}</p><span>${icon("FileText")}${h("solicitud_logs_del_servidor")}</span></article></div>
      <p class="traffic-observation-note">${h("una_solicitud_no_demuestra_una_cita_ni_una_visita_humana")}</p>
    </div>`,
    );
  }
  function homeBrandScene() {
    return scene(
      "archive",
      t("brand_hub_hechos_voz_fuentes_documentos_y_revision_compartidos"),
      `<div class="archive-stage" data-home-object data-home-drift><img src="/kairum/assets/home-brand-archive.png" width="1536" height="1024" alt="${h("archivo_de_cinco_capas_de_vidrio_y_documentos")}" loading="lazy"><div class="archive-labels">${[t("hechos"), t("voz"), t("fuentes"), t("documentos"), t("revision")].map((t) => `<span data-home-enter>${t}</span>`).join("")}</div></div><div class="archive-destinations">${[
        ["MagnifyingGlass", "Prompt Intelligence", "prompt-intelligence"],
        ["Eye", "Analytics", "analytics"],
        ["NotePencil", "Agents", "agents"],
        ["CursorClick", "Traffic", "traffic"],
      ]
        .map(
          ([g, title, id]) =>
            `<a href="/productos/${id}/" data-home-enter>${icon(g)}${title}${icon("ArrowUpRight")}</a>`,
        )
        .join("")}</div>`,
    );
  }

  return {
    homeAnswerScene,
    homePromptScene,
    homeAnalyticsScene,
    homeAgentsScene,
    homeTrafficScene,
    homeBrandScene,
  };
}
