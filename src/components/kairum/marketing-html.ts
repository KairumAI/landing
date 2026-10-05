import type { Translate } from "../../i18n/marketing/index";
import { escapeHtml } from "../../lib/escape";
import { createProducts, type Product, type ProductId } from "./products";
import { createHomeScenes } from "./home-scenes";
export function createMarketingRenderer(t: Translate) {
  const { products, productPath, findProduct } = createProducts(t);
  const {
    homeAnswerScene,
    homePromptScene,
    homeAnalyticsScene,
    homeAgentsScene,
    homeTrafficScene,
    homeBrandScene,
  } = createHomeScenes(t);
  const h = (key: Parameters<Translate>[0]) => escapeHtml(t(key));
  const e = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char]!,
    );
  const icon = (name: string) =>
    `<i data-icon="${e(name)}" aria-hidden="true" style="--icon:url('/kairum/assets/icons/${encodeURIComponent(name)}.svg')"></i>`;
  const bookUrl = "https://calendly.com/brunodecruz/30min";
  const button = (text: string, href: string, tone = "primary") =>
    `<a class="button ${tone}" href="${e(href)}"${href === bookUrl ? ' data-book target="_blank" rel="noopener noreferrer"' : ""}>${e(text)}${icon("ArrowUpRight")}</a>`;
  const link = (text: string, href: string) =>
    `<a class="text-link" href="${e(href)}">${e(text)}${icon("ArrowRight")}</a>`;
  const brand = (href = "/") =>
    `<a href="${href}" class="brand brand-lockup" aria-label="${h("kairum_inicio")}"><img src="/kairum/assets/logos/convergencia-lockup.webp" alt="" width="1536" height="1024"></a>`;
  const badge = (text: string) => `<span class="status">${e(text)}</span>`;
  const art = (asset: string, className = "") =>
    `<img class="${className}" src="/kairum/assets/${asset}.webp" alt="" loading="lazy" width="1200" height="900">`;
  const label = (text: string) => `<span class="eyebrow">${e(text)}</span>`;
  const platformIds: ProductId[] = [
    "analytics",
    "agents",
    "prompt-intelligence",
    "traffic",
  ];
  const menuCopy: Record<ProductId, string> = {
    analytics: t("entender_como_aparece_tu_marca"),
    agents: t("preparar_contenido_para_revisar"),
    "prompt-intelligence": t("organizar_las_preguntas_que_importan"),
    traffic: t("visitas_y_crawlers_por_separado"),
    report: t("un_diagnostico_puntual"),
    consulting: t("acompanamiento_a_medida"),
  };
  const menuProduct = (id: ProductId, active: string) => {
    const p = findProduct(id);
    return `<a href="${productPath(id)}"${active === id ? ' aria-current="page"' : ""}>${icon(p.icon)}<span><strong>${e(p.name)}</strong><small>${menuCopy[id]}</small></span>${icon("ArrowUpRight")}</a>`;
  };
  const compactMenu = (
    id: string,
    title: string,
    items: readonly [string, string, string, string][],
  ) =>
    `<details class="nav-menu nav-compact"><summary aria-controls="menu-${id}">${e(title)} ${icon("CaretRight")}</summary><div class="nav-popover compact-menu" id="menu-${id}">${items.map(([name, detail, href, glyph]) => `<a class="menu-item" href="${e(href)}">${icon(glyph)}<span><strong>${e(name)}</strong><small>${e(detail)}</small></span>${icon("ArrowUpRight")}</a>`).join("")}</div></details>`;
  function marketingHeader(active = "") {
    return `<a class="skip" href="#contenido">${h("ir_al_contenido")}</a><header class="site-header"><div class="nav wrap">${brand()}
    <nav class="site-nav" id="site-nav" aria-label="${h("principal")}">
      <details class="nav-menu"><summary aria-controls="menu-products">${h("productos")} ${icon("CaretRight")}</summary><div class="nav-popover product-menu" id="menu-products"><div class="menu-intro">${label(t("la_plataforma"))}<h2>${h("una_vista_completa_de_tu_marca_en_la_ia")}</h2><p>${h("contexto_evidencia")}<br>${h("y_decisiones_conectadas")}</p>${link(t("ver_la_plataforma"), "/productos/")}</div><div class="menu-products"><div class="mobile-platform-link">${link(t("ver_la_plataforma"), "/productos/")}</div>${label(t("productos"))}<div class="menu-grid">${platformIds.map((id) => menuProduct(id, active)).join("")}</div><div class="menu-start">${label(t("otras_formas_de_empezar"))}<div class="menu-grid">${(["report", "consulting"] as ProductId[]).map((id) => menuProduct(id, active)).join("")}</div></div></div></div></details>
      ${compactMenu("solutions", t("soluciones"), [
        [
          t("para_marcas"),
          t("entende_la_presencia_de_tu_marca_en_ia"),
          "/soluciones/marcas/",
          "Stack",
        ],
        [
          t("para_agencias"),
          t("evidencia_para_trabajar_con_cada_equipo"),
          "/soluciones/agencias/",
          "FileText",
        ],
      ])}
      ${compactMenu("resources", t("recursos"), [
        [
          t("biblioteca_de_informes"),
          t("explora_preguntas_fuentes_y_hallazgos"),
          "/informes/",
          "FileText",
        ],
        [
          t("recursos_seleccionados"),
          t("una_primera_lectura_del_ecosistema"),
          "/#recursos",
          "MagnifyingGlass",
        ],
      ])}
      ${compactMenu("company", t("empresa"), [
        [
          t("nosotros"),
          t("la_mirada_y_el_criterio_de_kairum"),
          "/nosotros/",
          "Eye",
        ],
        [
          t("contacto"),
          t("conversemos_sobre_tu_proxima_pregunta"),
          "/contacto/",
          "NotePencil",
        ],
      ])}
      <div class="mobile-nav-actions"><a class="text-link" href="/acceso/">${h("entrar_a_la_app")} ${icon("ArrowUpRight")}</a>${button(t("conversemos"), bookUrl)}</div>
    </nav><div class="nav-actions"><a class="nav-login" href="/acceso/">${h("entrar")}</a>${button(t("conversemos"), bookUrl, t("primary_nav_cta"))}<button class="icon-button menu-toggle js-control" aria-label="${h("abrir_menu")}" aria-expanded="false" aria-controls="site-nav">${icon("List")}</button></div></div></header>`;
  }
  function marketingFooter() {
    return `<footer class="site-footer"><div class="wrap"><div class="footer-top"><div>${brand()}<p>${h("inteligencia_para_la")}<br>${h("busqueda_con_ia")}</p></div><div class="footer-column"><h2>${h("productos")}</h2>${products.map((p) => `<a href="${productPath(p.id)}">${e(p.name)}</a>`).join("")}<a href="/productos/">${h("vista_de_plataforma")}</a></div><div class="footer-column"><h2>${h("explorar")}</h2><a href="/soluciones/marcas/">${h("para_marcas")}</a><a href="/soluciones/agencias/">${h("para_agencias")}</a><a href="/informes/">${h("biblioteca_de_recursos")}</a><a href="/nosotros/">${h("nosotros")}</a><a href="/acceso/">${h("entrar_a_la_app")}</a></div><div class="footer-column"><h2>${h("contacto")}</h2><a href="/contacto/">${h("hablemos_de_tu_marca")}</a><a href="${bookUrl}" target="_blank" rel="noopener noreferrer">${h("agendar_conversacion")} ${icon("ArrowUpRight")}</a><span>${h("kairum")}<br>${h("answer_intelligence")}</span></div></div><div class="footer-bottom"><span>${h("kairum_preguntas_evidencia_decisiones")}</span><a href="#contenido">${h("volver_arriba")} ${icon("ArrowUpRight")}</a></div></div></footer>`;
  }
  function tabs(
    id: string,
    name: string,
    items: readonly {
      label: string;
      content: string;
      icon?: string;
      status?: string;
    }[],
    className = "",
  ) {
    return `<div class="tabs ${className}" data-tabs><div class="tab-list" data-tab-list aria-label="${e(name)}">${items.map((item, i) => `<a id="${id}-tab-${i}" href="#${id}-${i}" data-tab="${id}-${i}">${item.icon ? icon(item.icon) : ""}${item.status ? `<span class="tab-label">${e(item.label)}<small>${e(item.status)}</small></span>` : e(item.label)}</a>`).join("")}</div>${items.map((item, i) => `<div id="${id}-${i}" data-tab-panel>${item.content}</div>`).join("")}</div>`;
  }
  function windowFrame(title: string, content: string, className = "") {
    return `<div class="product-window ${className}"><div class="window-bar"><span>${icon("Stack")} ${h("kairum")} <span class="window-path">/ ${e(title)}</span></span><span class="window-caption">${title === "Consulting" ? t("vista_del_servicio") : t("vista_de_producto")}</span></div>${content}</div>`;
  }
  function marketingWorkflow(
    id: string,
    kind: "platform" | "agents" = "platform",
  ) {
    const steps =
      kind === "agents"
        ? [
            {
              name: t("contexto"),
              icon: "Stack",
              title: t("el_punto_de_partida_esta_en_tu_marca"),
              detail: t(
                "hechos_y_documentos_aprobados_acompanan_cada_propuesta",
              ),
              item: t("brief_fuentes"),
              note: t("contexto_de_marca"),
            },
            {
              name: t("borrador"),
              icon: "NotePencil",
              title: t("un_cambio_que_podes_leer"),
              detail: t(
                "revisa_la_propuesta_y_comparala_con_el_contenido_original",
              ),
              item: t("propuesta_diff"),
              note: t("pendiente_de_revision"),
            },
            {
              name: t("revision"),
              icon: "CheckCircle",
              title: t("la_ultima_palabra_es_de_tu_equipo"),
              detail: t(
                "aprobacion_sobre_una_version_exacta_publicacion_condicionada_al_destino",
              ),
              item: t("version_revisable"),
              note: t("control_humano"),
            },
          ]
        : [
            {
              name: t("pregunta"),
              icon: "MagnifyingGlass",
              title: t("que_deberia_saber_alguien_antes_de_elegir"),
              detail: t("parti_de_las_preguntas_que_importan_a_tu_categoria_y"),
              item: t("preguntas_e_intencion"),
              note: t("definir_el_alcance"),
            },
            {
              name: t("evidencia"),
              icon: "FileText",
              title: t("cada_respuesta_tiene_un_contexto"),
              detail: t("lee_que_se_dice_que_fuentes_aparecen_y_que_necesita"),
              item: t("respuesta_fuentes"),
              note: t("leer_y_contrastar"),
            },
            {
              name: t("decision"),
              icon: "CheckCircle",
              title: t("la_evidencia_se_convierte_en_trabajo"),
              detail: t(
                "acorda_prioridades_prepara_un_brief_y_revisa_el_siguiente_paso",
              ),
              item: t("prioridades_del_equipo"),
              note: t("decidir_con_criterio"),
            },
          ];
    return `<div class="workflow auto-workflow" data-choreo="workflow" data-workflow="${id}"><div class="workflow-rail" aria-label="${h("etapas_del_recorrido")}">${steps.map((step, i) => `<span><span class="step-number">0${i + 1}</span>${icon(step.icon)}${step.name}</span>`).join("")}</div><div class="story-cards">${steps.map((step) => `<article class="story-card">${icon(step.icon)}<div><strong>${step.item}</strong><span>${step.note}</span><p>${step.detail}</p></div></article>`).join("")}</div><p class="home-note">${h("contexto_propuesta_y_revision_humana")}</p></div>`;
  }
  function marketingScene(id: ProductId, prefix: string) {
    if (id === "report") {
      return windowFrame(
        "Report",
        `<div class="report-scene"><div class="scene-sidebar"><span class="mini-label">${h("diagnostico_de_marca")}</span><strong>${h("una_lectura_completa")}</strong><div class="file-row">${icon("FileText")} ${h("preguntas_del_pack")}</div><div class="file-row">${icon("Link")} ${h("fuentes_y_citas")}</div><div class="file-row">${icon("NotePencil")} ${h("revision_del_equipo")}</div><span class="scene-format">${h("report")}<span>100</span><small>${h("formato_de_diagnostico")}</small></span></div><div class="scene-main">${tabs(
          prefix,
          t("lectura_del_diagnostico"),
          [
            {
              label: t("pregunta"),
              content: `${label(t("descubrimiento"))}<h3>${h("que_opciones_deberia_evaluar")}</h3><p>${h("una_pregunta_abre_la_lectura_de_la_categoria_las_alternativas")}</p><div class="question-chips"><span>${h("intencion")}</span><span>${h("categoria")}</span><span>${h("contexto_de_marca")}</span></div>`,
            },
            {
              label: t("evidencia"),
              content: `${label(t("respuesta_y_fuente"))}<h3>${h("volve_al_origen_de_cada_observacion")}</h3><div class="source-row">${icon("Quotes")}<div><strong>${h("fragmento_de_respuesta")}</strong><span>${h("leer_las_condiciones_de_una_recomendacion")}</span></div></div><div class="source-row">${icon("FileText")}<div><strong>${h("fuente_citada")}</strong><span>${h("contrastar_con_el_contenido_de_referencia")}</span></div></div><p class="mini-label">${h("mediciones_mediante_api_superficies_proxy")}</p>`,
            },
            {
              label: t("revision"),
              content: `${label(t("lectura_del_equipo"))}<h3>${h("de_una_observacion_a_una_prioridad")}</h3><div class="review-line">${icon("CheckCircle")} ${h("fuente_identificada")}</div><div class="review-line">${icon("Eye")} ${h("contexto_por_contrastar")}</div><div class="review-line">${icon("NotePencil")} ${h("proximo_paso_documentado")}</div>`,
            },
          ],
        )}</div></div>`,
      );
    }
    if (id === "analytics") {
      return windowFrame(
        "Analytics",
        `<div class="analytics-scene"><div class="scene-title"><div>${label(t("comparacion_de_mediciones"))}<h3>${h("una_diferencia_necesita_contexto")}</h3></div></div>${tabs(
          prefix,
          t("vistas_de_analytics"),
          [
            {
              label: t("presencia"),
              content: `<div class="comparison-grid"><div class="measurement"><span class="mini-label">${h("medicion_inicial")}</span><h4>${h("el_punto_de_partida")}</h4><div class="comparison-row"><span>${h("pack")}</span><strong>${h("preguntas_seleccionadas")}</strong></div><div class="comparison-row"><span>${h("lectura")}</span><strong>${h("menciones_y_contexto")}</strong></div><div class="comparison-row"><span>${h("fuentes")}</span><strong>${h("citas_observadas")}</strong></div></div><div class="comparison-connector">${icon("ArrowRight")}</div><div class="measurement measurement-next"><span class="mini-label">${h("siguiente_medicion")}</span><h4>${h("una_nueva_lectura")}</h4><div class="comparison-row"><span>${h("pack")}</span><strong>${h("verificar_compatibilidad")}</strong></div><div class="comparison-row"><span>${h("lectura")}</span><strong>${h("revisar_diferencias")}</strong></div><div class="comparison-row"><span>${h("fuentes")}</span><strong>${h("volver_a_la_evidencia")}</strong></div></div></div>`,
            },
            {
              label: t("competencia"),
              content: `<div class="comparison-table"><div><span>${h("tu_marca")}</span><strong>${h("menciones_en_contexto")}</strong><span>${h("respuesta_original")} ${icon("Quotes")}</span></div><div><span>${h("alternativas_configuradas")}</span><strong>${h("mismo_conjunto_de_preguntas")}</strong><span>${h("cobertura_explicita")} ${icon("Eye")}</span></div><div><span>${h("categoria")}</span><strong>${h("lectura_de_la_muestra")}</strong><span>${h("sin_ranking_global")} ${icon("CheckCircle")}</span></div></div>`,
            },
            {
              label: t("fuentes"),
              content: `<div class="source-mosaic"><article>${icon("FileText")}<h4>${h("tu_contenido")}</h4><p>${h("paginas_propias_citadas")}</p></article><article>${icon("Globe")}<h4>${h("otras_fuentes")}</h4><p>${h("referencias_que_aparecen_en_las_respuestas")}</p></article><article>${icon("Quotes")}<h4>${h("el_fragmento")}</h4><p>${h("la_cita_y_su_relacion_con_la_respuesta")}</p></article></div>`,
            },
          ],
        )}</div>`,
      );
    }
    if (id === "agents") {
      return windowFrame(
        "Agents",
        `<div class="agent-scene">${marketingWorkflow(prefix, "agents")}<details class="diff-details"><summary>${h("explorar_una_propuesta_de_cambio")} ${icon("Plus")}</summary><div class="diff-grid"><div><span class="mini-label">${h("texto_original")}</span><p><del>${h("la_mejor_solucion_para_todos")}</del></p></div><div><span class="mini-label">${h("propuesta_para_revisar")}</span><p><ins>${h("elegi_segun_tus_requisitos_y_contrasta_las_capacidades_documentadas")}</ins></p></div></div><p class="mini-label">${h("una_propuesta_para_respaldar_cada_afirmacion_con_evidencia")}</p></details></div>`,
      );
    }
    if (id === "prompt-intelligence") {
      const sets = [
        {
          label: t("descubrir"),
          questions: [
            t("que_alternativas_existen_en_esta_categoria"),
            t("que_problema_resuelve_cada_opcion"),
            t("que_deberia_saber_antes_de_empezar"),
          ],
        },
        {
          label: t("comparar"),
          questions: [
            t("que_diferencias_importan_entre_las_alternativas"),
            t("que_requisitos_deberia_comparar"),
            t("donde_encuentro_informacion_verificable"),
          ],
        },
        {
          label: t("decidir"),
          questions: [
            t("que_necesito_para_implementar_una_solucion"),
            t("como_evaluo_si_encaja_con_mi_equipo"),
            t("que_tendria_que_confirmar_antes_de_elegir"),
          ],
        },
      ];
      return windowFrame(
        "Prompt Intelligence",
        `<div class="prompt-scene"><div class="scene-title"><div>${label(t("biblioteca_de_preguntas"))}<h3>${h("una_intencion_distintos_caminos")}</h3></div>${badge(t("cobertura_propia"))}</div>${tabs(
          prefix,
          t("intencion_de_las_preguntas"),
          sets.map((set) => ({
            label: set.label,
            content: `<ul class="prompt-list">${set.questions.map((q, i) => `<li><span class="prompt-id">${h("p_0")}${i + 1}</span><strong>${e(q)}</strong><span class="question-origin">${h("equipo")}</span></li>`).join("")}</ul><div class="coverage-note">${icon("MagnifyingGlass")} ${h("preguntas_organizadas_por_intencion")}</div>`,
          })),
        )}</div>`,
      );
    }
    if (id === "traffic") {
      return windowFrame(
        "Traffic",
        `<div class="traffic-scene">${tabs(prefix, t("senales_de_traffic"), [
          {
            label: t("referidos_de_ia"),
            icon: "CursorClick",
            content: `<div class="traffic-route"><div>${icon("Quotes")}<strong>${h("respuesta_de_ia")}</strong><span>${h("enlace_a_una_pagina")}</span></div>${icon("ArrowRight")}<div class="route-focus">${icon("CursorClick")}<strong>${h("visita_a_tu_web")}</strong><span>${h("referencia_identificable")}</span></div>${icon("ArrowRight")}<div>${icon("Eye")}<strong>${h("analitica")}</strong><span>${h("fuente_y_cobertura")}</span></div></div><p class="route-note">${h("una_visita_observable_la_atribucion_depende_del_referrer_disponible")}</p>`,
          },
          {
            label: t("rastreadores"),
            icon: "Globe",
            content: `<div class="traffic-route"><div>${icon("Globe")}<strong>${h("crawler_o_agente")}</strong><span>${h("solicitud_a_tu_sitio")}</span></div>${icon("ArrowRight")}<div class="route-focus">${icon("FileText")}<strong>${h("request_en_logs")}</strong><span>${h("pagina_solicitada")}</span></div>${icon("ArrowRight")}<div>${icon("MagnifyingGlass")}<strong>${h("clasificacion")}</strong><span>${h("criterio_y_confianza")}</span></div></div><p class="route-note">${h("un_request_no_demuestra_una_cita_ni_una_visita_humana")}</p>`,
          },
        ])}</div>`,
      );
    }
    return windowFrame(
      "Consulting",
      `<div class="consulting-scene"><div class="consulting-note">${label(t("un_plan_compartido"))}<h3>${h("tu_desafio")}<br>${h("un_alcance_concreto")}</h3><p>${h("trabajo_humano_documentado_y_acordado_con_tu_equipo")}</p></div><div class="consulting-board">${[
        [t("diagnostico"), t("contexto_y_preguntas"), "MagnifyingGlass"],
        [t("plan_de_trabajo"), t("prioridades_y_responsables"), "Stack"],
        [t("implementacion"), t("entregables_y_revision"), "NotePencil"],
      ]
        .map(
          ([title, detail, glyph], i) =>
            `<div class="consulting-ticket"><span class="step-number">0${i + 1}</span>${icon(glyph)}<div><strong>${title}</strong><span>${detail}</span></div></div>`,
        )
        .join("")}</div></div>`,
    );
  }
  function faq(items: Product["faqs"], id = "preguntas") {
    return `<section class="faq-section wrap section" id="${id}"><div>${label(t("preguntas_frecuentes"))}<h2>${h("un_poco_mas")}<br>${h("de_contexto")}</h2></div><div class="faq-list">${items.map((item) => `<details><summary>${e(item.question)}${icon("Plus")}</summary><div class="faq-answer"><p>${e(item.answer)}</p></div></details>`).join("")}</div></section>`;
  }
  function cta(title = t("el_proximo_paso_empieza_con_una_conversacion")) {
    return `<section class="closing-section"><div class="wrap closing-inner"><div>${label(t("hablemos_de_tu_marca"))}<h2>${e(title)}</h2></div>${button(t("agendar_conversacion"), bookUrl, "ink")}</div></section>`;
  }
  function card(p: Product, index = 0) {
    return `<a class="product-card" href="${productPath(p.id)}"><div class="product-card-top">${icon(p.icon)}<span class="mini-label">0${index + 1} / ${e(p.category)}</span>${icon("ArrowUpRight")}</div><div><h3>${e(p.name)}</h3><p>${e(p.short)}</p></div></a>`;
  }
  function chapterVisual(p: Product) {
    if (p.id === "analytics") {
      return `<div class="chapter-sheet comparison-sheet"><div class="sheet-heading">${icon("Eye")}<span>${h("una_pregunta_dos_lecturas")}</span></div><div class="sheet-context">${h("mismo_pack_misma_superficie_cobertura_comparable")}</div><div class="reading-pair"><article><span class="mini-label">${h("medicion_a")}</span><h3>${h("la_marca_aparece")}</h3><p>${h("entre_las_opciones_se_menciona")} <mark>${h("tu_marca_2")}</mark>.»</p><span class="reading-tag">${h("mencion_identificada")}</span></article><article><span class="mini-label">${h("medicion_b")}</span><h3>${h("la_respuesta_cambia")}</h3><p>${h("la_respuesta_describe")} <mark>${h("otras_alternativas")}</mark>.»</p><span class="reading-tag">${h("revisar_la_diferencia")}</span></article></div><div class="sheet-insight">${icon("MagnifyingGlass")}<span>${h("el_cambio_abre_una_pregunta")}<br><strong>${h("la_respuesta_y_sus_fuentes_permiten_interpretarlo")}</strong></span></div></div>`;
    }
    if (p.id === "traffic") {
      return `<div class="chapter-sheet traffic-sheet"><div class="sheet-heading">${icon("Globe")}<span>${h("dos_senales_dos_fuentes")}</span></div><div class="signal-lane"><div class="signal-name">${icon("CursorClick")}<h3>${h("referido_de_ia")}</h3></div><div class="signal-path"><span>${h("una_persona_sigue_un_enlace")}</span>${icon("ArrowRight")}<strong>${h("visita_identificable")}</strong></div><div class="signal-source">${h("fuente_analitica_autorizada")}</div></div><div class="signal-lane crawler-lane"><div class="signal-name">${icon("Globe")}<h3>${h("rastreo")}</h3></div><div class="signal-path"><span>${h("un_agente_solicita_una_pagina")}</span>${icon("ArrowRight")}<strong>${h("acceso_clasificado")}</strong></div><div class="signal-source">${h("fuente_logs_autorizados")}</div></div><p class="sheet-note">${h("dos_lecturas_separadas_un_rastreo_no_demuestra_una_visita_humana")}</p></div>`;
    }
    if (p.id === "consulting") {
      return `<div class="chapter-sheet consulting-sheet"><div class="sheet-heading">${icon("FileText")}<span>${h("plan_de_trabajo")}</span></div><div class="plan-objective"><span class="mini-label">${h("objetivo_compartido")}</span><h3>${h("entender_la_presencia")}<br>${h("priorizar_el_proximo_paso")}</h3></div><div class="plan-deliverables">${[
        [
          t("informe_de_diagnostico"),
          t("una_lectura_de_la_situacion"),
          "FileText",
        ],
        [t("mapa_de_prioridades"), t("acciones_y_responsables"), "Stack"],
        [t("sesion_de_revision"), t("decisiones_con_tu_equipo"), "NotePencil"],
      ]
        .map(
          ([title, text, glyph]) =>
            `<div>${icon(glyph)}<span><strong>${title}</strong><small>${text}</small></span></div>`,
        )
        .join(
          "",
        )}</div><div class="plan-footer">${h("alcance_y_entregables_acordados_por_proyecto")}</div></div>`;
    }
    if (p.id === "agents") {
      return `<div class="editor-document">${label(t("borrador_propuesta_revision"))}<h3>${h("escribi_con_contexto")}<br>${h("revisa_con_claridad")}</h3><p class="edit-line">${h("una_recomendacion_necesita_una_fuente")}</p><p class="edit-line inserted">${h("una_afirmacion_necesita_evidencia")}</p><p class="edit-line">${h("una_publicacion_necesita_tu_aprobacion")}</p><div class="document-review">${icon("NotePencil")} ${h("lista_para_revisar")}</div></div>`;
    }
    return `<div class="chapter-art">${art(p.id === "prompt-intelligence" ? "home-questions" : "home-reports", "editorial-art")}<div class="chapter-art-caption">${icon(p.icon)}<span>${e(p.name)}<small>${e(p.steps[1].title)}</small></span></div></div>`;
  }
  function marketingProductPage(p: Product) {
    const centered = p.id === "agents" || p.id === "prompt-intelligence";
    const opener =
      p.id === "analytics"
        ? homeAnalyticsScene("analytics-product")
        : p.id === "prompt-intelligence"
          ? homePromptScene()
          : p.id === "agents"
            ? homeAgentsScene()
            : p.id === "traffic"
              ? homeTrafficScene()
              : marketingScene(p.id, `${p.id}-hero`);
    return `${marketingHeader(p.id)}<main id="contenido" tabindex="-1"><nav class="product-subnav" aria-label="${h("en_esta_pagina")}"><div class="wrap"><a href="${productPath(p.id)}" aria-current="page">${icon(p.icon)} ${e(p.name)}</a><div><a href="#explorar">${h("explorar")}</a><a href="#como-funciona">${h("como_funciona")}</a><a href="#capacidades">${h("capacidades")}</a><a href="#preguntas">${h("faq")}</a></div></div></nav>
    <section class="product-hero ${centered ? "centered" : ""} ${p.id === "agents" || p.id === "analytics" ? "dark" : ""} ${platformIds.includes(p.id) ? "cinematic-product" : ""}"><div class="wrap"><div class="product-hero-copy" data-reveal><div class="eyebrow-row">${label(`KAIRUM ${p.name}`)}</div><h1>${e(p.title)}</h1><p>${e(p.description)}</p><div class="hero-actions">${button(t("agendar_conversacion"), bookUrl)}${button(p.id === "consulting" ? t("conocer_el_servicio") : t("explorar_el_producto"), "#explorar", "secondary")}</div></div><div class="product-hero-scene" id="explorar" data-reveal>${opener}</div></div></section>
    <section class="section story-section" id="como-funciona"><div class="wrap"><div class="section-heading" data-reveal>${label(t("como_funciona"))}<h2>${e(p.promise)}</h2><p>${e(p.id === "report" ? t("el_valor_esta_en_conectar_lo_que_observas_con_lo") : p.id === "consulting" ? t("cada_proyecto_combina_contexto_entregables_y_criterios_de_revision_acordados") : t("preguntas_contexto_y_revision_para_dar_forma_al_proximo_paso"))}</p></div><div class="chapter-layout"><div class="chapter-list">${p.steps.map((step, i) => `<article data-reveal><span class="chapter-number">0${i + 1}</span><div><h3>${e(step.title)}</h3><p>${e(step.text)}</p></div></article>`).join("")}</div><div class="chapter-visual" data-reveal>${chapterVisual(p)}</div></div></div></section>
    <section class="section wrap" id="capacidades"><div class="section-heading" data-reveal>${label(t("dentro_de") + p.name)}<h2>${e(p.featuresHeading)}</h2></div><div class="capability-grid">${p.features.map((feature, i) => `<article class="capability" data-reveal><div class="capability-head">${icon(feature.icon)}<span>0${i + 1}</span></div><h3>${e(feature.title)}</h3><p>${e(feature.text)}</p></article>`).join("")}</div></section>
    <section class="section related-section"><div class="wrap"><div class="section-heading" data-reveal>${label(t("conectado_al_ecosistema"))}<h2>${h("el_recorrido_continua")}</h2><p>${h("pasa_de_una_pregunta_a_una_lectura_de_una_lectura")}</p></div><div class="related-grid">${p.next.map((id, i) => card(findProduct(id), i)).join("")}</div>${p.id === "report" ? `<div class="library-callout">${icon("FileText")}<span>${h("conoce_el_formato_en_la_biblioteca_de_informes_exploratorios")}</span>${link(t("ver_informes"), "/informes/")}</div>` : ""}</div></section>
    ${faq(p.faqs)}${cta()}</main>${marketingFooter()}`;
  }
  function marketingCatalogPage() {
    return `${marketingHeader("catalog")}<main id="contenido" tabindex="-1"><section class="catalog-hero wrap"><div class="section-heading" data-reveal>${label(t("el_ecosistema_kairum"))}<h1>${h("preguntas_evidencia")}<br>${h("proximos_pasos")}</h1><p>${h("un_recorrido_para_entender_como_aparece_tu_marca_en_ia")}</p></div><div class="catalog-grid">${products.map(card).join("")}</div></section><section class="section shared-section" id="contexto"><div class="wrap"><div class="section-heading">${label(t("el_contexto_conecta_todo"))}<h2>${h("una_marca")}<br>${h("un_equipo_alineado")}</h2></div><div class="shared-grid"><article>${icon("Stack")}<h3>${h("brand_hub")}</h3><p>${h("hechos_documentos_y_contexto_aprobados_para_sostener_cada_lectura")}</p></article><article>${icon("CheckCircle")}<h3>${h("action_center")}</h3><p>${h("prioridades_responsables_y_seguimiento_del_trabajo_que_surge_de_la")}</p></article></div></div></section><section class="section wrap"><div class="section-heading">${label(t("elegi_tu_punto_de_partida"))}<h2>${h("que_queres_resolver")}</h2></div><div class="catalog-chooser">${products.map((p) => `<a href="${productPath(p.id)}"><span>${e(p.category)}</span><strong>${e(p.decision)}</strong><span>${e(p.name)} ${icon("ArrowUpRight")}</span></a>`).join("")}</div></section>${cta()}</main>${marketingFooter()}`;
  }
  function marketingHomePage() {
    const models = [
      ["chatgpt", "ChatGPT / GPT"],
      ["gemini", "Gemini"],
      ["claude", "Claude"],
      ["grok", "Grok"],
      ["perplexity", "Perplexity"],
    ];
    return `${marketingHeader()}<main id="contenido" tabindex="-1" class="home-cinematic">
    <section class="home-cinema-hero" id="inicio"><img class="cinema-stage" src="/kairum/assets/home-hero-stage.png" width="1536" height="1024" alt="" fetchpriority="high"><div class="wrap"><div class="cinema-hero-copy">${label(t("inteligencia_para_la_busqueda_con_ia"))}<h1 aria-label="${h("tu_marca_visible_en_la_busqueda_con_ia")}"><span aria-hidden="true">${h("tu_marca_visible")}</span><span class="hero-brand-line" aria-hidden="true"><span>${h("en")}</span><span class="hero-brand-rotator" data-brand-rotator>${models.map(([file], index) => `<span class="hero-brand-frame${index === 0 ? " is-first" : ""}" data-brand-frame="${file}"><img src="/kairum/assets/models/${file}.svg" alt="" width="256" height="64"></span>`).join("")}</span></span></h1><p>${h("preguntas_visibilidad_contenido_y_trafico_con_contexto")}</p><div class="model-ecosystem" aria-label="${h("ecosistema_de_busqueda_con_ia")}"><div>${models.map(([file, name]) => `<img src="/kairum/assets/models/${file}.svg" alt="${name}" width="128" height="28">`).join("")}</div></div><div class="hero-actions">${button(t("explorar_plataforma"), "#plataforma")}${button(t("conversemos"), bookUrl, "secondary")}</div></div>${homeAnswerScene()}</div></section>
    <section class="home-product home-prompts" id="product-prompt-intelligence"><div class="wrap product-story-grid"><div id="plataforma" class="story-visual">${homePromptScene()}</div><div class="product-story-copy" data-reveal>${label(t("01_prompt_intelligence"))}<h2>${h("todo_empieza")} <br>${h("con_una_pregunta")}</h2><p>${h("entende_la_intencion_prioriza_que_investigar")}</p>${link(t("explorar_prompt_intelligence"), productPath("prompt-intelligence"))}<span class="chapter-footnote">${h("un_mapa_para_el_proximo_diagnostico")}</span></div></div></section>
    <section class="home-analytics" id="product-analytics"><div class="wrap"><div class="analytics-heading" data-reveal>${label(t("02_analytics"))}<h2>${h("tu_visibilidad")}<br class="mobile-only"> ${h("en_perspectiva")}</h2><p>${h("preguntas_menciones_y_fuentes_una_mirada_completa")}</p></div>${homeAnalyticsScene()}<div class="analytics-actions">${button(t("explorar_analytics"), productPath("analytics"))}<span>${h("un_diagnostico_puntual_2")} ${link(t("conocer_report"), productPath("report"))}</span></div></div></section>
    <section class="home-product home-agents" id="product-agents"><div class="wrap product-story-grid"><div class="product-story-copy" data-reveal>${label(t("03_agents"))}<h2>${h("del_hallazgo")} <br>${h("al_contenido")}</h2><p>${h("prepara_borradores_con_contexto_y_revision")}</p>${link(t("explorar_agents"), productPath("agents"))}<span class="chapter-footnote">${h("un_objetivo_una_propuesta_tu_criterio")}</span></div><div class="story-visual">${homeAgentsScene()}</div></div></section>
    <section class="home-product home-traffic" id="product-traffic"><div class="wrap product-story-grid"><div class="story-visual">${homeTrafficScene()}</div><div class="product-story-copy" data-reveal>${label(t("04_traffic"))}<h2>${h("observa_que_llega")} <br>${h("a_tu_sitio")}</h2><p>${h("visitas_referidas_y_rastreadores_por_separado")}</p>${link(t("explorar_traffic"), productPath("traffic"))}</div></div></section>
    <section class="home-brand-hub" id="evidencia"><div class="wrap product-story-grid"><div class="product-story-copy" data-reveal>${label(t("05_brand_hub"))}<h2>${h("una_marca")} <br>${h("un_contexto_compartido")}</h2><p>${h("hechos_voz_y_fuentes_para_trabajar_con_criterio")}</p>${link(t("explorar_el_contexto"), "/productos/#contexto")}</div>${homeBrandScene()}</div></section>
    <section class="home-start wrap" id="como-empezar" data-home-showcase><div class="home-section-heading" data-reveal>${label(t("06_como_empezar"))}<h2>${h("un_punto_de_partida_para_tu_equipo")}</h2></div><div class="cinema-start-options">${(["report", "consulting"] as ProductId[]).map((id) => `<a class="cinema-start-option" href="${productPath(id)}" data-reveal><div class="service-card-copy">${label(id === "report" ? t("un_diagnostico") : t("un_camino_compartido"))}<h3>${id === "report" ? "Report" : "Consulting"}</h3><p>${id === "report" ? t("entende_donde_esta_tu_marca") : t("converti_la_lectura_en_estrategia")}</p><span class="text-link">${h("conocer")} ${id === "report" ? "Report" : "Consulting"}${icon("ArrowUpRight")}</span></div><img class="service-card-art" src="/kairum/assets/home-service-${id}.png" width="1536" height="1024" alt="" loading="lazy" data-home-drift style="--float-delay:${id === "report" ? "0s" : "-3s"}"></a>`).join("")}</div></section>
    <section class="home-resources wrap" id="recursos" data-home-showcase><div class="home-section-heading" data-reveal>${label(t("07_recursos"))}<h2>${h("explora_la_evidencia")}</h2><p>${h("preguntas_fuentes_y_hallazgos_para_entender_la_busqueda_con_ia")}</p>${link(t("ver_todos_los_recursos"), "/informes/")}</div><div class="home-resource-grid">${[
      [
        "questions",
        t("preguntas"),
        t("que_preguntan_y_por_que_importa"),
        "/productos/prompt-intelligence/#capacidades",
      ],
      [
        "sources",
        t("fuentes"),
        t("como_se_construye_la_respuesta"),
        "/productos/analytics/#capacidades",
      ],
      [
        "findings",
        t("hallazgos"),
        t("oportunidades_para_tu_marca"),
        "/productos/report/#como-funciona",
      ],
    ]
      .map(
        ([asset, title, subtitle, destination], index) =>
          `<a class="resource-book" href="${destination}" data-reveal><div class="resource-book-cover" data-home-drift style="--float-delay:-${index * 2}s"><img src="/kairum/assets/home-resource-${asset}.png" width="1122" height="1402" alt="" loading="lazy"><div class="resource-book-title"><h3>${title}</h3><p>${subtitle}</p></div></div><span class="book-link">${h("explorar")} ${title.toLowerCase()}${icon("ArrowUpRight")}</span></a>`,
      )
      .join("")}</div></section>
    <section class="home-contact" id="contacto" data-home-showcase><div class="wrap"><div>${label(t("hablemos_de_tu_marca"))}<h2>${h("la_proxima_conversacion")}<br>${h("puede_empezar_aca")}</h2></div>${button(t("agendar_una_conversacion"), bookUrl)}</div></section>
    </main>${marketingFooter()}`;
  }
  function evidenceScene() {
    return `<div class="evidence-scene" data-choreo="evidence"><canvas class="context-depth" data-context-depth aria-hidden="true"></canvas><article class="context-source" data-context-source>${badge("Brand Hub")}<h3>${h("trabajo_en_equipo")}</h3><p>${h("briefs_comentarios_y_revisiones_por_proyecto_en_un_solo_lugar")}</p></article><div class="context-connection" aria-hidden="true"></div><article class="context-finding" data-context-finding>${badge("Action Center")}<h3>${h("la_respuesta_no_menciona_revisiones")}</h3><p>${h("revisar_como_se_explica_esta_capacidad_en_la_fuente")}</p><small>${h("fuente_vinculada_revision_del_equipo")}</small></article></div>`;
  }
  function marketingInfoPage(
    id: "marcas" | "agencias" | "nosotros" | "contacto" | "acceso",
  ) {
    const content = {
      acceso: {
        tag: t("acceso_a_kairum"),
        title: t("tu_proxima_lectura_empieza_aca"),
        text: t("conversemos_sobre_tu_equipo_tus_preguntas_y_el_espacio_de"),
        ids: ["report", "consulting"] as ProductId[],
      },
      marcas: {
        tag: t("para_marcas"),
        title: t("tu_marca_cambia_las_respuestas_tambien"),
        text: t("un_punto_de_partida_para_entender_como_aparece_tu_marca"),
        ids: ["report", "analytics", "agents"] as ProductId[],
      },
      agencias: {
        tag: t("para_agencias"),
        title: t("una_mejor_conversacion_con_cada_marca"),
        text: t("preguntas_claras_evidencia_a_mano_y_un_alcance_de_trabajo"),
        ids: ["consulting", "report", "prompt-intelligence"] as ProductId[],
      },
      nosotros: {
        tag: t("sobre_kairum"),
        title: t("preguntar_mejor_decidir_con_evidencia"),
        text: t("construimos_una_forma_de_entender_la_presencia_de_las_marcas"),
        ids: ["report", "consulting"] as ProductId[],
      },
      contacto: {
        tag: t("conversemos"),
        title: t("empecemos_por_tu_proxima_pregunta"),
        text: t("contanos_que_esta_buscando_entender_tu_equipo_el_primer_paso"),
        ids: ["report", "consulting"] as ProductId[],
      },
    }[id];
    return `${marketingHeader()}<main id="contenido" tabindex="-1" class="info-page"><section class="wrap info-hero">${label(content.tag)}<h1>${content.title.split("\n").map(e).join("<br>")}</h1><p>${content.text}</p>${button(t("agendar_una_conversacion"), bookUrl)}<div class="info-context">${evidenceScene()}</div></section><section class="wrap section"><div class="section-heading">${label(id === "contacto" ? t("antes_de_conversar") : t("donde_empezar"))}<h2>${id === "nosotros" ? t("una_direccion_clara_un_paso_concreto") : t("elegi_tu_punto_de_partida_2")}</h2></div><div class="related-grid">${content.ids.map((pid, i) => card(findProduct(pid), i)).join("")}</div></section></main>${marketingFooter()}`;
  }

  return {
    marketingHomePage,
    marketingCatalogPage,
    marketingProductPage,
    marketingInfoPage,
    marketingHeader,
    marketingFooter,
  };
}
