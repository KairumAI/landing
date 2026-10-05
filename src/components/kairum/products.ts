import type { Translate } from "../../i18n/marketing/index";
export type ProductId =
  | "report"
  | "analytics"
  | "agents"
  | "prompt-intelligence"
  | "traffic"
  | "consulting";
export type Product = {
  id: ProductId;
  name: string;
  icon: string;
  category: string;
  status: string;
  title: string;
  description: string;
  short: string;
  decision: string;
  promise: string;
  steps: readonly {
    title: string;
    text: string;
  }[];
  featuresHeading: string;
  features: readonly {
    title: string;
    text: string;
    icon: string;
  }[];
  faqs: readonly {
    question: string;
    answer: string;
  }[];
  next: readonly ProductId[];
};
export function createProducts(t: Translate) {
  const products: readonly Product[] = [
    {
      id: "report",
      name: "Report",
      icon: "FileText",
      category: t("entender"),
      status: t("diagnostico_puntual"),
      title: t("entende_donde_esta_tu_marca_y_que_sigue"),
      description: t(
        "un_diagnostico_de_100_preguntas_para_leer_respuestas_seguir_fuentes",
      ),
      short: t("tu_punto_de_partida_en_la_busqueda_con_ia"),
      decision: t("como_aparece_mi_marca_en_ia"),
      promise: t("un_informe_que_abre_una_conversacion_y_un_camino"),
      steps: [
        {
          title: t("elegi_las_preguntas"),
          text: t("partimos_de_tu_marca_tu_categoria_y_las_decisiones_que"),
        },
        {
          title: t("lee_la_evidencia"),
          text: t(
            "cada_observacion_conserva_su_respuesta_fuente_contexto_y_revision",
          ),
        },
        {
          title: t("acorda_las_prioridades"),
          text: t("un_entregable_para_compartir_que_merece_atencion_y_por_que"),
        },
      ],
      featuresHeading: t("todo_lo_que_hace_a_una_primera_lectura"),
      features: [
        {
          title: t("preguntas_con_intencion"),
          text: t(
            "descubrimiento_comparacion_y_decision_dentro_de_un_pack_explicito",
          ),
          icon: "MagnifyingGlass",
        },
        {
          title: t("respuestas_en_contexto"),
          text: t("lee_como_aparece_la_marca_y_que_condiciones_acompanan_cada"),
          icon: "Quotes",
        },
        {
          title: t("fuentes_a_un_clic"),
          text: t("separa_las_citas_visibles_de_las_fuentes_de_busqueda_y"),
          icon: "Link",
        },
        {
          title: t("una_lectura_compartida"),
          text: t(
            "hallazgos_revisados_competencia_configurada_y_limites_en_el_mismo_informe",
          ),
          icon: "FileText",
        },
      ],
      faqs: [
        {
          question: t("que_significa_report100"),
          answer: t("es_el_formato_de_diagnostico_de_100_preguntas_el_informe"),
        },
        {
          question: t("puedo_ver_un_informe"),
          answer: t(
            "si_la_biblioteca_reune_informes_exploratorios_curados_son_casos_prospectivos",
          ),
        },
        {
          question: t("las_respuestas_son_de_chatgpt"),
          answer: t(
            "las_mediciones_actuales_usan_superficies_api_como_openai_api_u",
          ),
        },
        {
          question: t("como_empiezo"),
          answer: t(
            "agenda_una_conversacion_para_definir_el_alcance_las_preguntas_y",
          ),
        },
      ],
      next: ["analytics", "consulting"],
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: "Eye",
      category: t("medir"),
      status: t("planificado"),
      title: t("la_foto_de_hoy_el_contexto_de_lo_que_cambia"),
      description: t(
        "una_vista_para_comparar_mediciones_seguir_las_fuentes_y_entender",
      ),
      short: t("visibilidad_competencia_y_fuentes_en_contexto"),
      decision: t("que_cambio_entre_una_medicion_y_otra"),
      promise: t("detecta_diferencias_entende_que_hay_detras"),
      steps: [
        {
          title: t("conserva_el_contexto"),
          text: t("el_pack_la_superficie_y_la_cobertura_acompanan_a_cada"),
        },
        {
          title: t("compara_lo_comparable"),
          text: t(
            "las_diferencias_solo_se_leen_juntas_cuando_las_condiciones_lo",
          ),
        },
        {
          title: t("volve_a_la_respuesta"),
          text: t("del_resumen_a_la_pregunta_la_cita_y_el_fragmento"),
        },
      ],
      featuresHeading: t("presencia_competencia_y_fuentes_en_contexto"),
      features: [
        {
          title: t("presencia_por_pregunta"),
          text: t("una_lectura_de_menciones_dentro_de_la_muestra_que_elegiste"),
          icon: "Eye",
        },
        {
          title: t("competencia_configurada"),
          text: t(
            "compara_las_marcas_relevantes_para_tu_categoria_sin_rankings_globales",
          ),
          icon: "Stack",
        },
        {
          title: t("fuentes_que_importan"),
          text: t("paginas_y_dominios_citados_para_interpretar_cada_respuesta"),
          icon: "Link",
        },
        {
          title: t("historial_con_contexto"),
          text: t(
            "comparaciones_sobre_mediciones_compatibles_y_cobertura_explicita",
          ),
          icon: "ArrowClockwise",
        },
      ],
      faqs: [
        {
          question: t("que_informacion_importa_al_analizar_la_visibilidad"),
          answer: t(
            "las_menciones_las_alternativas_las_fuentes_y_el_contexto_de",
          ),
        },
        {
          question: t("que_hace_comparables_dos_mediciones"),
          answer: t(
            "el_contexto_del_pack_las_preguntas_la_superficie_consultada_y",
          ),
        },
        {
          question: t("un_cambio_de_visibilidad_prueba_impacto"),
          answer: t("no_por_si_solo_una_variacion_observada_no_demuestra_que"),
        },
        {
          question: t("puedo_conversar_sobre_un_piloto"),
          answer: t(
            "si_podemos_definir_que_queres_observar_y_que_evidencia_haria",
          ),
        },
      ],
      next: ["report", "traffic"],
    },
    {
      id: "agents",
      name: "Agents",
      icon: "Sparkle",
      category: t("actuar"),
      status: t("planificado"),
      title: t("mas_capacidad_para_crear_el_criterio_sigue_siendo_tuyo"),
      description: t(
        "de_una_oportunidad_a_un_borrador_con_contexto_cambios_visibles",
      ),
      short: t("creacion_y_optimizacion_con_revision_humana"),
      decision: t("que_contenido_puedo_crear_o_mejorar"),
      promise: t("el_trabajo_avanza_tu_equipo_decide"),
      steps: [
        {
          title: t("dale_el_contexto"),
          text: t("una_pregunta_evidencia_y_los_hechos_aprobados_de_tu_marca"),
        },
        {
          title: t("revisa_la_propuesta"),
          text: t(
            "un_borrador_y_sus_diferencias_para_entender_exactamente_que_cambio",
          ),
        },
        {
          title: t("aproba_una_version"),
          text: t("publicacion_solo_con_un_destino_seguro_si_no_entrega_del"),
        },
      ],
      featuresHeading: t("crear_y_mejorar_con_control_sobre_cada_cambio"),
      features: [
        {
          title: t("creacion"),
          text: t(
            "preparar_briefs_preguntas_frecuentes_y_contenido_desde_una_oportunidad_concreta",
          ),
          icon: "NotePencil",
        },
        {
          title: t("optimizacion"),
          text: t(
            "proponer_mejoras_sobre_contenido_existente_y_conservar_el_diff_para",
          ),
          icon: "Sparkle",
        },
        {
          title: t("contexto_de_marca"),
          text: t(
            "usar_hechos_y_documentos_aprobados_en_brand_hub_como_referencia",
          ),
          icon: "Stack",
        },
        {
          title: t("control_de_publicacion"),
          text: t("la_version_aprobada_y_el_destino_determinan_si_se_publica"),
          icon: "CheckCircle",
        },
      ],
      faqs: [
        {
          question: t("los_agentes_publican_solos"),
          answer: t(
            "la_propuesta_incluye_revision_humana_de_una_version_exacta_la",
          ),
        },
        {
          question: t("como_se_define_el_destino_del_contenido"),
          answer: t("el_canal_los_permisos_y_los_criterios_de_publicacion_se"),
        },
        {
          question: t("agents_reemplaza_action_center"),
          answer: t(
            "action_center_organiza_prioridades_y_responsables_agents_se_enfoca_en",
          ),
        },
        {
          question: t("como_se_organiza_una_propuesta"),
          answer: t("primero_el_contexto_de_marca_y_sus_fuentes_despues_el"),
        },
      ],
      next: ["prompt-intelligence", "consulting"],
    },
    {
      id: "prompt-intelligence",
      name: "Prompt Intelligence",
      icon: "MagnifyingGlass",
      category: t("investigar"),
      status: t("planificado"),
      title: t("las_preguntas_correctas_cambian_el_punto_de_partida"),
      description: t(
        "organiza_preguntas_por_intencion_encontra_huecos_de_cobertura_y_decidi",
      ),
      short: t("preguntas_intencion_y_oportunidades_de_cobertura"),
      decision: t("que_preguntas_deberia_investigar"),
      promise: t("menos_preguntas_sueltas_mas_direccion"),
      steps: [
        {
          title: t("reuni_tus_preguntas"),
          text: t(
            "packs_preguntas_del_equipo_y_fuentes_propias_autorizadas_con_origen",
          ),
        },
        {
          title: t("ordena_la_intencion"),
          text: t(
            "descubrir_una_categoria_comparar_opciones_o_tomar_una_decision",
          ),
        },
        {
          title: t("encontra_los_huecos"),
          text: t("que_temas_cubris_que_falta_explorar_y_que_llevar_al"),
        },
      ],
      featuresHeading: t("preguntas_que_ordenan_el_trabajo"),
      features: [
        {
          title: t("taxonomia_util"),
          text: t(
            "temas_intencion_y_etiquetas_para_organizar_preguntas_con_un_lenguaje",
          ),
          icon: "Stack",
        },
        {
          title: t("origen_visible"),
          text: t(
            "diferencia_preguntas_disenadas_por_el_equipo_de_observaciones_externas",
          ),
          icon: "Eye",
        },
        {
          title: t("cobertura_del_pack"),
          text: t(
            "busca_temas_sin_explorar_dentro_de_tu_conjunto_de_preguntas",
          ),
          icon: "MagnifyingGlass",
        },
        {
          title: t("versiones_para_aprender"),
          text: t(
            "conserva_que_cambio_entre_packs_antes_de_interpretar_una_nueva",
          ),
          icon: "ArrowClockwise",
        },
      ],
      faqs: [
        {
          question: t("estas_preguntas_representan_busquedas_reales"),
          answer: t(
            "la_primera_etapa_organiza_packs_y_preguntas_propias_no_representan",
          ),
        },
        {
          question: t("como_se_interpreta_la_demanda_de_mercado"),
          answer: t(
            "el_volumen_y_la_frecuencia_requieren_fuentes_autorizadas_y_una",
          ),
        },
        {
          question: t("como_se_conecta_con_report"),
          answer: t(
            "el_pack_ordenado_define_que_preguntas_observar_en_un_diagnostico",
          ),
        },
        {
          question: t("de_donde_salen_las_preguntas"),
          answer: t(
            "del_conocimiento_de_tu_categoria_las_decisiones_que_queres_entender",
          ),
        },
      ],
      next: ["report", "agents"],
    },
    {
      id: "traffic",
      name: "Traffic",
      icon: "CursorClick",
      category: t("observar"),
      status: t("planificado"),
      title: t("de_una_respuesta_a_tu_web_segui_las_senales"),
      description: t(
        "visitas_referidas_por_ia_y_actividad_de_rastreadores_en_dos",
      ),
      short: t("referidos_de_ia_y_rastreadores_por_separado"),
      decision: t("que_senales_llegan_a_mi_sitio"),
      promise: t("cada_senal_tiene_una_fuente_y_un_limite"),
      steps: [
        {
          title: t("identifica_la_fuente"),
          text: t(
            "analitica_para_visitas_logs_para_requests_cada_dato_conserva_su",
          ),
        },
        {
          title: t("separa_las_senales"),
          text: t("una_persona_que_llega_a_una_pagina_y_un_bot"),
        },
        {
          title: t("lee_con_cobertura"),
          text: t("revisa_que_se_puede_clasificar_y_que_queda_fuera_de"),
        },
      ],
      featuresHeading: t("senales_distintas_una_lectura_clara_de_tu_web"),
      features: [
        {
          title: t("referidos_identificables"),
          text: t(
            "sesiones_con_una_referencia_de_ia_observable_en_la_analitica",
          ),
          icon: "CursorClick",
        },
        {
          title: t("rastreadores_y_agentes"),
          text: t(
            "requests_de_logs_clasificados_por_agente_y_criterio_conocido",
          ),
          icon: "Globe",
        },
        {
          title: t("paginas_de_destino"),
          text: t(
            "que_contenido_recibe_visitas_o_solicitudes_sin_mezclar_los_dos",
          ),
          icon: "FileText",
        },
        {
          title: t("cobertura_explicita"),
          text: t("fuentes_ventanas_de_tiempo_y_senales_que_no_se_pueden"),
          icon: "Eye",
        },
      ],
      faqs: [
        {
          question: t("una_visita_de_un_crawler_significa_que_me_cito"),
          answer: t("no_un_request_prueba_una_solicitud_al_servidor_no_una"),
        },
        {
          question: t("se_puede_atribuir_todo_el_trafico_de_ia"),
          answer: t(
            "no_algunas_visitas_no_conservan_un_referrer_identificable_traffic_debe",
          ),
        },
        {
          question: t("que_datos_necesita_este_analisis"),
          answer: t(
            "analitica_para_estudiar_las_visitas_y_logs_para_clasificar_solicitudes",
          ),
        },
        {
          question: t("que_relacion_tiene_con_analytics"),
          answer: t(
            "analytics_mira_respuestas_de_ia_traffic_propone_observar_actividad_en",
          ),
        },
      ],
      next: ["analytics", "consulting"],
    },
    {
      id: "consulting",
      name: "Consulting",
      icon: "NotePencil",
      category: t("acompanar"),
      status: t("servicio_a_medida"),
      title: t("tu_proximo_paso_en_ia_con_un_equipo_al_lado"),
      description: t(
        "estrategia_diagnostico_e_implementacion_a_medida_para_convertir_preguntas_de",
      ),
      short: t("estrategia_e_implementacion_con_acompanamiento"),
      decision: t("con_quien_puedo_armar_un_plan_y_avanzar"),
      promise: t("del_diagnostico_al_trabajo_que_hace_falta"),
      steps: [
        {
          title: t("entendamos_el_desafio"),
          text: t("objetivos_contexto_de_marca_y_preguntas_que_hoy_no_tienen"),
        },
        {
          title: t("acordemos_un_alcance"),
          text: t(
            "un_plan_de_entregables_responsables_y_criterios_de_revision",
          ),
        },
        {
          title: t("trabajemos_sobre_evidencia"),
          text: t(
            "implementacion_y_aprendizaje_con_documentacion_de_lo_que_se_hizo",
          ),
        },
      ],
      featuresHeading: t("un_trabajo_a_medida_entregables_concretos"),
      features: [
        {
          title: t("diagnostico"),
          text: t(
            "una_lectura_de_categoria_preguntas_y_contenido_para_definir_el",
          ),
          icon: "MagnifyingGlass",
        },
        {
          title: t("estrategia_geo_y_aeo"),
          text: t(
            "priorizacion_de_oportunidades_segun_tu_contexto_y_capacidad_de_ejecucion",
          ),
          icon: "Stack",
        },
        {
          title: t("implementacion_a_medida"),
          text: t(
            "contenido_procesos_e_integraciones_acordados_para_cada_proyecto",
          ),
          icon: "NotePencil",
        },
        {
          title: t("transferencia_al_equipo"),
          text: t(
            "documentacion_y_criterios_para_continuar_el_trabajo_con_autonomia",
          ),
          icon: "FileText",
        },
      ],
      faqs: [
        {
          question: t("necesito_contratar_el_software"),
          answer: t(
            "no_consulting_es_un_servicio_humano_independiente_de_una_suscripcion",
          ),
        },
        {
          question: t("como_se_define_el_precio"),
          answer: t(
            "el_alcance_y_los_honorarios_se_acuerdan_por_proyecto_esta",
          ),
        },
        {
          question: t("garantizan_aparecer_primero_en_ia"),
          answer: t(
            "no_el_trabajo_se_apoya_en_observaciones_hipotesis_y_revisiones",
          ),
        },
        {
          question: t("cual_es_el_primer_paso"),
          answer: t(
            "agenda_una_conversacion_para_compartir_el_desafio_y_evaluar_si",
          ),
        },
      ],
      next: ["report", "agents"],
    },
  ];
  const productPath = (id: ProductId) => `/productos/${id}/`;
  const findProduct = (id: ProductId) =>
    products.find((product) => product.id === id)!;

  return { products, productPath, findProduct };
}
