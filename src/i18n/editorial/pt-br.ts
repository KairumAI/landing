import type { EditorialCopy } from "./schema";
import { adobeShopping } from "./adobe-shopping";
import { geoComparison } from "./geo-comparison";

export const ptBr: EditorialCopy = {
  ui: {
    resources: "Recursos",
    blog: "Blog",
    glossary: "Glossário",
    methodology: "Metodologia",
    resourcesDescription: "Guias e evidências para fazer perguntas melhores.",
    blogDescription: "Leituras práticas sobre visibilidade de marca em IA.",
    glossaryDescription: "Conceitos claros, com exemplos e limites.",
    explore: "Explorar",
    featured: "Para começar",
    guide: "Guia prático",
    articles: "Últimas leituras",
    onThisPage: "Nesta leitura",
    sources: "Fontes e referências",
    related: "Continue explorando",
    author: "Por KAIRUM",
    reviewed: "Revisado em",
    date: "16 de outubro de 2026",
    minutes: "min de leitura",
    read: "Ler artigo",
    editorialNote: "Critério editorial",
    editorialPolicy:
      "Textos e ilustrações preparados com assistência de IA e revisão de fontes públicas. Os exercícios são construções educativas identificadas, sem dados de clientes. A metodologia e as propostas de trabalho são da KAIRUM; as referências documentam o funcionamento de cada plataforma. Não garantimos posicionamento.",
    reports: "Relatórios exploratórios",
    reportsNote:
      "Estudos prospectivos mantêm suas datas, perguntas e limites originais. As organizações incluídas não se tornam clientes por aparecer na biblioteca.",
    reportsAction: "Explorar a biblioteca",
    back: "Todos os recursos",
    nextStep: "Da leitura ao próximo passo",
    ctaTitle: "Uma boa pergunta pode iniciar seu próximo diagnóstico.",
    ctaText:
      "Com AI Report, podemos definir uma amostra, revisar respostas e fontes e documentar o que merece atenção.",
    ctaAction: "Conhecer AI Report",
    question: "Pergunta",
    answer: "Resposta",
    source: "Fonte",
    evidence: "Evidências que você pode revisar",
    homeQuestions: "Escolher as perguntas",
    homeSources: "Entender os sinais",
    homeFindings: "Interpretar os achados",
    heroTitle: "Entenda a busca com IA.\nCom evidências.",
    heroIntro:
      "Guias, ideias e um método de trabalho para entender como sua marca aparece em respostas de IA e decidir o que investigar depois.",
    blogTitle: "A busca mudou.\nVamos aprender a interpretá-la.",
    blogIntro:
      "Perguntas que importam, sinais que podem ser verificados e decisões com contexto. Um espaço para pensar a visibilidade em IA além do número.",
    guideAction: "Ler o guia",
    browseBlog: "Explorar o blog",
    synthetic: "Esquema educativo · sem medições de uma empresa",
    takeaways: "O que você leva desta leitura",
    reference: "Confira na fonte",
  },
  commercial: {
    report: {
      title: "AI Report: diagnóstico de visibilidade em IA | KAIRUM",
      description:
        "Defina um diagnóstico de visibilidade de marca em IA: perguntas, respostas, fontes, achados e prioridades com escopo e limites explícitos.",
      heading: "Um diagnóstico que sua equipe pode revisar.",
      intro:
        "AI Report parte de uma pergunta de negócio e um escopo definido. Cada observação se conecta às evidências que a sustentam.",
      items: [
        {
          title: "O que é definido",
          text: "Marca, categoria, perguntas, ambiente consultado e condições de observação antes de medir.",
        },
        {
          title: "O que sua equipe recebe",
          text: "Uma leitura de respostas, menções e fontes, com achados, limites e prioridades para conversar.",
        },
        {
          title: "Como interpretar",
          text: "Uma observação descreve sua amostra. A revisão separa evidências verificadas, questões em aberto e o próximo passo.",
        },
      ],
    },
    analytics: {
      title: "Análise de visibilidade de marca em IA | KAIRUM",
      description:
        "Entenda como analisar menções, fontes e concorrentes em respostas de IA e quais condições tornam duas medições de sua marca comparáveis.",
      heading: "Medir uma mudança começa por preservar o contexto.",
      intro:
        "A análise de visibilidade reúne sinais diferentes. Seu valor está em voltar à pergunta, à resposta e à fonte antes de concluir.",
      items: [
        {
          title: "Uma amostra explícita",
          text: "Documente perguntas, datas, idioma, ambiente e cobertura. Toda porcentagem precisa de um denominador.",
        },
        {
          title: "Sinais separados",
          text: "Leia menções e citações nas respostas. Visitas ao site precisam de uma fonte separada de análise autorizada.",
        },
        {
          title: "Comparações úteis",
          text: "Repita condições compatíveis e registre mudanças de modelos ou perguntas. Uma diferença não comprova o efeito de uma intervenção.",
        },
      ],
    },
    agencias: {
      title: "GEO e AEO para agências de marketing | KAIRUM",
      description:
        "Explore como incorporar um diagnóstico GEO e AEO ao trabalho da agência: perguntas do cliente, evidências consultáveis e prioridades com escopo definido.",
      heading: "Uma nova conversa com seus clientes. Um escopo concreto.",
      intro:
        "Uma agência pode começar com uma marca e uma pergunta de negócio. O piloto define o que observar, quais evidências entregar e quais decisões apoiar.",
      items: [
        {
          title: "Definir o caso",
          text: "Escolha uma marca, sua categoria e as decisões que seus potenciais clientes investigam. Combine as perguntas antes da execução.",
        },
        {
          title: "Entregar uma leitura",
          text: "Reúna menções, respostas e fontes em um AI Report que a equipe possa revisar e compartilhar, com data e limites.",
        },
        {
          title: "Combinar o próximo passo",
          text: "Priorize mudanças de conteúdo ou novas perguntas. Uma medição posterior mantém as condições e separa evolução de causalidade.",
        },
      ],
    },
  },
  pages: {
    "geo-comparison": geoComparison["pt-br"],
    "adobe-shopping": adobeShopping,
    resources: {
      title: "Recursos de GEO, AEO e visibilidade em IA | KAIRUM",
      description:
        "Guias, artigos, glossário e metodologia para investigar a presença de marcas em respostas de IA com perguntas, fontes e limites claros.",
      category: "Recursos",
      summary: "Uma biblioteca para conectar perguntas, evidências e decisões.",
      sections: [],
      sources: [],
      related: [],
      product: "report",
    },
    blog: {
      title: "Blog de GEO, AEO e visibilidade de marca em IA | KAIRUM",
      description:
        "Artigos práticos da KAIRUM para escolher perguntas, distinguir menções e citações e interpretar medições de visibilidade de marca em IA.",
      category: "Blog",
      summary: "Ideias para investigar a busca com IA com critério.",
      sections: [],
      sources: [],
      related: [],
      product: "report",
    },
    "visibility-guide": {
      title: "Como medir a visibilidade de sua marca em respostas de IA",
      category: "Guia prático",
      description:
        "Aprenda a definir perguntas, registrar menções e citações e interpretar uma amostra de respostas de IA com condições comparáveis e limites explícitos.",
      summary:
        "Sua marca aparece quando alguém pergunta sobre sua categoria? Investigar isso exige mais do que digitar o nome em um chat. Este guia propõe um percurso: escolher uma decisão, observar respostas e transformar evidências em uma próxima ação.",
      sections: [
        {
          id: "objetivo",
          title: "1. Defina o que quer entender",
          paragraphs: [
            "Imagine que sua equipe publica um guia e quer entender se ele ajuda a explicar sua proposta na busca com IA. Uma captura isolada pode ser interessante, mas não mostra o que acontece com outras perguntas, quais fontes participam ou como a observação se repete.",
            "Comece por uma decisão de negócio: entender quais informações uma agência encontra antes de avaliar um diagnóstico, por exemplo. Para a KAIRUM, esse recorte permite investigar uma necessidade concreta sem tentar representar todas as conversas de marketing da internet.",
          ],
          example: {
            label: "Exemplo de planejamento · ainda não é uma medição",
            text: "Objetivo: entender como a medição de visibilidade de marca em IA é explicada. Site de referência: kairum.com.ar. Público e idioma: equipes de marketing que consultam em português.",
          },
        },
        {
          id: "preguntas",
          title: "2. Escolha perguntas que representem decisões",
          paragraphs: [
            "Cubra descoberta, comparação e avaliação. Separe perguntas que mencionam a marca daquelas que não a mencionam: elas atendem a objetivos diferentes.",
            "Guarde o texto exato e uma etiqueta de intenção. Se mudar as perguntas, registre a alteração antes de comparar períodos.",
          ],
          items: [
            "Descoberta: como medir se uma marca aparece em respostas de IA?",
            "Comparação: o que comparar ao escolher uma ferramenta de visibilidade em IA?",
            "Avaliação dirigida: o que a KAIRUM publica sobre seu método de diagnóstico?",
          ],
        },
        {
          id: "condiciones",
          title: "3. Registre onde e como observa",
          paragraphs: [
            "Anote data, idioma, ambiente, modelo identificado, disponibilidade de busca e cobertura. Uma resposta de API e outra de uma interface de consumidor vêm de ambientes diferentes.",
            "Medições por OpenAI API ou OpenRouter devem ser identificadas como API ou proxy. Não são capturas da interface do ChatGPT. Nomes de modelos também não comprovam uma integração comercial.",
          ],
          items: [
            "Pergunta e objetivo do conjunto.",
            "Data, idioma e contexto geográfico realmente disponível.",
            "Ambiente e modelo identificados, sem preencher lacunas por suposição.",
            "Respostas completas, falhas e cobertura observada.",
          ],
        },
        {
          id: "senales",
          title: "4. Separe menções, citações e visitas",
          paragraphs: [
            "Uma marca pode aparecer sem que seu site seja citado. Uma página pode ser citada sem que alguém abra o link. A visita exige uma observação separada na análise web.",
            "Registre cada sinal separadamente. Quando há busca, diferencie as fontes recuperadas das citações visíveis no texto final.",
          ],
          table: {
            columns: ["Sinal", "O que permite observar", "O que não comprova"],
            rows: [
              [
                "Menção",
                "A marca aparece na resposta.",
                "Que há um link para seu site.",
              ],
              [
                "Citação",
                "A resposta atribui informação a uma fonte.",
                "Que alguém visitou essa página.",
              ],
              [
                "Visita referenciada",
                "Uma sessão chega por um link identificável.",
                "Que a visita resulta em consulta ou venda.",
              ],
            ],
          },
          figure: {
            title: "Três perguntas. Três registros.",
            caption:
              "Esquema de trabalho da KAIRUM. Os sinais são revisados separadamente e não descrevem uma conversão automática.",
            steps: [
              {
                label: "A marca aparece?",
                detail: "Ler a resposta completa e o contexto da menção.",
                value: "01",
              },
              {
                label: "Qual página é citada?",
                detail:
                  "Guardar a URL e verificar qual afirmação ela sustenta.",
                value: "02",
              },
              {
                label: "Alguém chegou ao site?",
                detail:
                  "Consultar a análise autorizada e a atribuição disponível.",
                value: "03",
              },
            ],
          },
        },
        {
          id: "interpretacion",
          title: "5. Leia o resultado dentro de sua amostra",
          paragraphs: [
            "Se calcular presença, explique quais respostas são válidas e mostre o denominador. Erros fazem parte da cobertura e continuam visíveis.",
            "Uma execução não representa todas as respostas possíveis. Para ler evolução, repita condições compatíveis e procure padrões antes de interpretar uma diferença isolada.",
            "Se alterou conteúdo e depois observou melhora, registre os dois fatos. Essa sequência não prova que o conteúdo causou a mudança.",
          ],
          example: {
            label: "Exemplo sintético · não é um resultado da KAIRUM",
            text: "Em uma amostra hipotética, a marca aparece em 6 de 20 respostas válidas: 30% de presença nessa amostra. Se havia 25 respostas previstas, a cobertura é de 20 em 25. Os dois dados precisam acompanhar a leitura.",
          },
        },
        {
          id: "accion",
          title: "6. Transforme a leitura em uma próxima pergunta",
          paragraphs: [
            "Relacione cada prioridade à sua evidência. Pode ser esclarecer uma capacidade no site, revisar uma fonte desatualizada ou investigar uma pergunta sem cobertura.",
            "Um ciclo útil preserva objetivo, medição, decisão e condições da próxima observação. O diagnóstico abre uma conversa e acompanha o critério da equipe.",
          ],
          items: [
            "O que observamos e em qual resposta.",
            "Qual fonte ou conteúdo merece revisão.",
            "Qual ação propomos e quem vai revisá-la.",
            "Quais condições preservar para observar novamente.",
          ],
        },
        {
          id: "ficha",
          title: "7. Monte uma ficha que outra pessoa possa revisar",
          paragraphs: [
            "A diferença entre uma impressão e um diagnóstico útil está em poder voltar ao material. Guarde uma linha por resposta, com um identificador que conecte o texto exato da pergunta, as condições, a resposta completa e as URLs citadas. Um resumo executivo não substitui esse arquivo de evidências.",
            "Para um primeiro exercício sobre a KAIRUM, escolha uma decisão de uma agência e escreva quatro perguntas abertas e duas direcionadas. É uma proposta inicial, não um tamanho de amostra universal. Verifique se cobrem decisões diferentes antes de investir em mais execuções. O artigo sobre escolha de perguntas desenvolve esse exemplo.",
          ],
          table: {
            columns: ["Campo", "O que guardar"],
            rows: [
              ["Pergunta", "Texto exato, intenção e versão do conjunto."],
              [
                "Observação",
                "Data, superfície, idioma, resposta e estado da execução.",
              ],
              ["Sinais", "Menção com contexto e cada citação com sua URL."],
              [
                "Interpretação",
                "O que observamos, o que falta verificar e qual decisão se abre.",
              ],
            ],
          },
        },
        {
          id: "revisar",
          title: "8. Revise antes de ampliar",
          paragraphs: [
            "Peça a outra pessoa que escolha duas linhas e tente reconstruir sua conclusão. Se ela não encontrar a resposta, não entender o denominador ou confundir um exemplo com um resultado, melhore o registro antes de aumentar a amostra.",
            "Depois escolha uma ação pequena: esclarecer uma definição em uma página, documentar melhor o escopo de um produto ou investigar uma fonte externa. Anote o que espera observar e como revisaria isso. O Google mantém os fundamentos de SEO em seus recursos de IA: conteúdo útil, acesso técnico e links internos continuam fazendo parte do trabalho.",
            "A entrega final pode caber em uma página: objetivo, amostra e cobertura; dois achados com evidências; uma limitação que mude a interpretação; e uma prioridade com responsável. Um diagnóstico serve quando ajuda a escolher o próximo passo e permite discutir o motivo.",
          ],
          references: [
            {
              title: "Google Search Central: recursos de IA e seu site",
              url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
            },
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: recursos de IA e seu site",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
        },
        {
          title: "OpenAI: rastreadores e agentes de pesquisa",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: o que a análise web mede",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
      ],
      related: [
        "mentions-citations-visits",
        "choosing-questions",
        "interpreting-results",
      ],
      product: "report",
      cover: {
        alt: "Uma fita amarela atravessa três janelas de papel, seguindo uma pergunta até sua evidência.",
        caption:
          "Ilustração editorial da KAIRUM · seguindo o fio entre uma pergunta e sua evidência.",
      },
      takeaways: [
        "Definir uma amostra antes de olhar as respostas.",
        "Registrar menções, citações e visitas separadamente.",
        "Encerrar o diagnóstico com uma decisão que possa ser revisada.",
      ],
    },
    "mentions-citations-visits": {
      title: "Menções, citações e visitas: aparecer não é o mesmo que atrair",
      category: "Conceitos",
      description:
        "Uma menção de marca, uma citação de seu site e uma visita vinda de IA descrevem fatos distintos. Entenda o que medir e os limites de cada sinal.",
      summary:
        "Sua marca aparece em uma resposta de IA. É uma observação útil, mas ainda há perguntas: o que ela diz sobre a marca, qual fonte sustenta a informação e se alguém chegou ao site. Seguir essas pistas muda a conversa com sua equipe.",
      sections: [
        {
          id: "mencion",
          title: "O que uma menção nos diz",
          paragraphs: [
            "Uma menção responde a uma pergunta limitada: o nome da marca aparece nesta resposta? Depois podemos revisar o contexto: a capacidade descrita, as alternativas comparadas ou as informações ausentes.",
            "A frequência só faz sentido em uma amostra definida. A KAIRUM aparecer em uma pergunta que já inclui seu nome é diferente de aparecer em uma consulta aberta sobre uma categoria.",
          ],
          example: {
            label: "Exemplo esquemático · não é uma resposta medida",
            text: "Uma resposta lista a KAIRUM entre alternativas para investigar visibilidade de marca, sem incluir um link para kairum.com.ar. Neste exemplo há uma menção, mas não uma citação do site.",
          },
        },
        {
          id: "cita",
          title: "O que uma citação acrescenta",
          paragraphs: [
            "A citação conecta uma afirmação a uma fonte. Pode apontar para o site da marca ou uma página externa. Registrar domínio e URL ajuda a voltar à evidência.",
            "As fontes recuperadas durante a busca e as citações visíveis na resposta são registros diferentes. Preserve ambas quando observáveis e identifique cada uma com precisão.",
            "Uma fonte citada não significa que a marca seja recomendada ou que toda afirmação próxima esteja apoiada nessa página. A relação exige revisão.",
          ],
          references: [
            {
              title: "Google Search Central: recursos de IA e seu site",
              url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
            },
          ],
        },
        {
          id: "visita",
          title: "O que uma visita exige",
          paragraphs: [
            "A visita é observada no site, não na resposta. Uma referência identificável pode indicar que alguém seguiu um link de uma ferramenta de IA. A atribuição depende dos dados que efetivamente chegam à análise.",
            "Uma solicitação de crawler não é uma visita humana. Esses acessos são analisados nos registros do servidor e não comprovam uma citação por si só.",
            "O contato comercial é outra etapa. Clicar em Agendar, confirmar uma reserva e participar de uma reunião são eventos diferentes.",
          ],
          references: [
            {
              title: "OpenAI: rastreadores e agentes de pesquisa",
              url: "https://platform.openai.com/docs/bots",
            },
          ],
          figure: {
            title: "Aparecer, sustentar, chegar",
            caption:
              "Diagrama conceitual: esses registros podem coexistir ou faltar. Nenhum comprova automaticamente o próximo.",
            steps: [
              {
                label: "Menção",
                detail: "O nome aparece em uma resposta que guardamos.",
                value: "Texto",
              },
              {
                label: "Citação",
                detail: "Uma afirmação tem uma fonte identificável.",
                value: "URL",
              },
              {
                label: "Visita",
                detail: "A análise registra uma chegada ao site.",
                value: "Sessão",
              },
            ],
          },
        },
        {
          id: "caso",
          title:
            "Um caso desenvolvido: o que aconteceu e o que segue em aberto",
          paragraphs: [
            "Vamos construir três observações educativas sobre a KAIRUM. Na primeira, uma resposta lista a marca ao falar de diagnósticos e oferece apenas um link para documentação técnica externa. Podemos registrar a menção e a citação externa. Não podemos registrar uma citação à KAIRUM só porque seu nome está perto do link.",
            "Na segunda, outra resposta aponta para o guia de medição de kairum.com.ar para explicar uma definição, sem recomendar a contratação de nada. Há uma citação ao site. A intenção comercial e o tom da recomendação exigem outra leitura: não podem ser deduzidos do domínio citado.",
            "Na terceira, a análise do site mostra uma visita com referência identificável de um assistente. Isso permite investigar uma chegada. Sem um vínculo entre essa sessão e uma resposta específica, não devemos atribuí-la à pergunta do primeiro exemplo.",
          ],
          example: {
            label: "Caso construído · três observações, sem dados medidos",
            text: "Registro A: menção + citação externa. Registro B: citação ao guia. Registro C: visita referenciada. Não somamos os três como “três conversões” nem presumimos que pertencem à mesma pessoa.",
          },
        },
        {
          id: "registro",
          title: "Conecte os registros sem misturar os sinais",
          paragraphs: [
            "Use identificadores que conectem pergunta, resposta e data. Preserve menções e citações observáveis junto da evidência e revise o tráfego em sua fonte autorizada.",
            "Ao comparar resultados, indique qual sinal mudou e em quais condições. Evite somar menções, citações e sessões em uma porcentagem única sem interpretação explícita.",
          ],
          table: {
            columns: ["Pergunta", "Evidência a revisar"],
            rows: [
              ["A marca aparece?", "Resposta completa e texto da menção."],
              ["Qual página é citada?", "Citação visível e URL de destino."],
              ["Alguém chegou ao site?", "Sessão e origem na análise web."],
              ["Houve um contato?", "Contato ou reserva realmente confirmada."],
            ],
          },
        },
        {
          id: "accion",
          title: "O que revisar conforme o sinal que falta",
          paragraphs: [
            "A separação ajuda a decidir. Se a marca aparece com uma descrição desatualizada, revise a afirmação e sua fonte antes de publicar mais conteúdo. Se uma página correta, mas difícil de ler, é citada, trabalhe sua clareza e o próximo passo que oferece. Se chegam visitas sem contatos, revise a página de destino e primeiro verifique se a medição de contatos funciona.",
            "Também pode haver uma citação útil sem menção à marca, por exemplo quando um guia sustenta uma explicação geral. Essa observação merece seu próprio registro: a visibilidade do conteúdo e o reconhecimento da marca podem evoluir de formas diferentes.",
            "Para aplicar hoje, escolha três respostas completas. Marque a frase em que a marca aparece, abra cada fonte e anote o que sustenta. Depois consulte a análise de tráfego separadamente. O resultado é um mapa de evidências e perguntas pendentes para discutir em equipe, sem transformar cada sinal em uma promessa comercial.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: recursos de IA e seu site",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
        },
        {
          title: "Cloudflare Web Analytics: o que a análise web mede",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
        {
          title: "OpenAI: rastreadores e agentes de pesquisa",
          url: "https://platform.openai.com/docs/bots",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "analytics",
      cover: {
        alt: "Um balão de conversa, um elo e uma porta de papel representam três sinais distintos.",
        caption:
          "Ilustração editorial da KAIRUM · aparecer, ser citado e receber uma visita são fatos distintos.",
      },
      takeaways: [
        "Uma menção descreve presença; seu contexto precisa ser lido.",
        "Uma citação permite revisar uma fonte, mesmo sem clique.",
        "Tráfego e contatos precisam de registros próprios.",
      ],
    },
    "choosing-questions": {
      title:
        "Antes de medir: como escolher perguntas que importam para seu negócio",
      category: "Planejamento",
      description:
        "Crie um conjunto de perguntas de descoberta, comparação e avaliação, separe consultas abertas e dirigidas e documente o escopo antes de medir.",
      summary:
        "Cinquenta versões de “melhores ferramentas” podem deixar de fora o que seu público precisa resolver. Elaborar perguntas é decidir qual parte da conversa investigar. Aqui trabalhamos uma amostra inicial para a KAIRUM e uma forma de revisá-la.",
      sections: [
        {
          id: "audiencia",
          title: "Comece por uma decisão do público",
          paragraphs: [
            "Uma palavra-chave pode orientar a pesquisa, mas uma pergunta acrescenta contexto: quem consulta, o que precisa entender e qual condição importa para escolher.",
            "Na KAIRUM, uma agência preparando um diagnóstico e uma marca investigando fontes podem fazer perguntas diferentes. Documente o público sem inventar volume de demanda.",
          ],
          figure: {
            title: "De uma necessidade a uma pergunta",
            caption:
              "Exemplo de planejamento para a KAIRUM. Não representa demanda medida nem consultas executadas.",
            steps: [
              {
                label: "Público",
                detail:
                  "Uma agência que prepara um diagnóstico para uma marca.",
                value: "Quem",
              },
              {
                label: "Decisão",
                detail: "Qual evidência pedir antes de combinar um piloto.",
                value: "Para quê",
              },
              {
                label: "Pergunta",
                detail:
                  "O que um diagnóstico de visibilidade em IA deve incluir?",
                value: "O que perguntar",
              },
            ],
          },
        },
        {
          id: "intencion",
          title: "Cubra mais de um momento de decisão",
          paragraphs: [
            "Agrupe perguntas por intenção e revise qual parte do percurso cada grupo representa. As categorias organizam a amostra, mas não estimam o mercado automaticamente.",
          ],
          table: {
            columns: ["Intenção", "Exemplo de pergunta"],
            rows: [
              [
                "Descobrir",
                "O que significa medir visibilidade de marca em IA?",
              ],
              ["Comparar", "Como comparar ferramentas de análise GEO e AEO?"],
              ["Avaliar", "O que um diagnóstico de visibilidade deve incluir?"],
              [
                "Investigar uma marca",
                "Qual metodologia a KAIRUM explica em seu site?",
              ],
            ],
          },
        },
        {
          id: "abiertas",
          title: "Separe perguntas abertas e dirigidas",
          paragraphs: [
            "Uma consulta aberta não inclui o nome da marca e permite observar quais alternativas aparecem nessa formulação. Uma dirigida menciona a marca e ajuda a revisar como sua proposta é descrita.",
            "As duas podem ser úteis. Misturar seus resultados sem identificar cada tipo pode produzir uma presença maior apenas porque o nome foi incluído em mais perguntas.",
          ],
          example: {
            label: "Exemplos de planejamento · não são consultas executadas",
            text: "Aberta: como organizar um diagnóstico de visibilidade em IA para uma agência? Dirigida: como a KAIRUM propõe um diagnóstico para agências?",
          },
        },
        {
          id: "muestra",
          title: "Uma amostra de seis perguntas, com um propósito por linha",
          paragraphs: [
            "Para uma primeira revisão editorial da KAIRUM, propomos as perguntas abaixo. As quatro primeiras exploram a categoria sem mencionar a marca; as duas últimas examinam como a KAIRUM é descrita. Mantemos os grupos separados. Não são consultas reais de clientes nem uma estimativa de sua frequência.",
            "O valor está em cada pergunta mudar a decisão investigada. Uma definição ajuda a descobrir o problema; um critério de comparação ajuda a avaliar alternativas. Repetir a mesma pergunta com dez sinônimos cobriria menos dessas decisões.",
          ],
          table: {
            columns: ["Pergunta proposta", "Por que incluir"],
            rows: [
              [
                "Como saber se uma marca aparece em respostas de IA?",
                "Descobrir o problema. Aberta.",
              ],
              [
                "Qual é a diferença entre uma menção e uma citação?",
                "Entender um sinal. Aberta.",
              ],
              [
                "Como comparar diagnósticos de visibilidade de marca em IA?",
                "Explorar critérios. Aberta.",
              ],
              [
                "Qual evidência pedir antes de contratar um diagnóstico?",
                "Avaliar uma entrega. Aberta.",
              ],
              [
                "Qual metodologia a KAIRUM publica?",
                "Revisar a explicação da marca. Direcionada.",
              ],
              [
                "Quais informações da KAIRUM faltam para avaliar um piloto?",
                "Identificar lacunas. Direcionada.",
              ],
            ],
          },
        },
        {
          id: "prioridad",
          title: "Escolha cobertura em vez de variações repetidas",
          paragraphs: [
            "Verifique se várias perguntas pedem essencialmente a mesma coisa. Uma lista extensa de reformulações não garante a cobertura de decisões ou necessidades diferentes.",
            "Priorize perguntas que a equipe possa conectar a uma decisão e uma possível revisão de conteúdo. Sem dados de consultas reais, trate o conjunto como uma hipótese editorial a melhorar.",
          ],
        },
        {
          id: "version",
          title: "Guarde uma versão antes de medir",
          paragraphs: [
            "Preserve texto exato, intenção, idioma e motivo da inclusão. Registre exclusões e o ambiente que será observado.",
            "Ao mudar o conjunto, crie uma nova versão. Compare períodos com condições compatíveis e explique as perguntas adicionadas ou retiradas.",
          ],
          items: [
            "Objetivo e público definidos.",
            "Texto, idioma e intenção por pergunta.",
            "Consultas abertas e dirigidas identificadas.",
            "Versão, escopo e data do conjunto.",
            "Ambiente, repetições previstas e critérios de cobertura.",
          ],
        },
        {
          id: "editar",
          title: "Como melhorar uma pergunta antes de executá-la",
          paragraphs: [
            "Leia cada linha em voz alta. “Por que a KAIRUM é a melhor opção?” já introduz uma conclusão. “O que a KAIRUM publica sobre seu método?” permite investigar algo verificável. Uma pergunta enviesada pode gerar uma resposta atraente e contribuir pouco para o diagnóstico.",
            "Se a formulação for ampla demais, acrescente uma condição que o público realmente usaria: idioma, tipo de equipe ou necessidade. Não inclua o nome da marca para fazê-la aparecer. Evite combinar preço, integrações, metodologia e suporte em uma só pergunta se depois não conseguir relacionar o achado a uma necessidade concreta.",
            "Antes de ampliar, peça a alguém da equipe que explique qual decisão cada resposta poderia mudar. Se duas linhas têm o mesmo propósito, escolha uma para o núcleo e guarde a outra para explorar variação. Ao incorporar evidências de conversas ou consultas reais, registre a origem e evite incluir informações privadas nos textos de teste.",
            "Para repetir a medição, preserve esse núcleo e suas condições. Perguntas novas podem entrar em um bloco exploratório. Assim é possível aprender sem apresentar uma mudança de composição como melhora de presença.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: recursos de IA e seu site",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
        },
        {
          title: "Google Search Central: como a Pesquisa funciona",
          url: "https://developers.google.com/search/docs/fundamentals/how-search-works?hl=pt-br",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "prompt-intelligence",
      cover: {
        alt: "Uma fita amarela escolhe um percurso entre cartões e caminhos de tinta.",
        caption:
          "Ilustração editorial da KAIRUM · escolher perguntas também é decidir o que deixar de fora.",
      },
      takeaways: [
        "Partir de uma decisão do público, com linguagem concreta.",
        "Separar a descoberta aberta da avaliação de uma marca.",
        "Manter um núcleo estável de perguntas para poder comparar.",
      ],
    },
    "interpreting-results": {
      title:
        "Visibilidade em IA: como ler um resultado sem se enganar com o percentual",
      category: "Medição",
      description:
        "Leia presença, cobertura e mudanças em uma amostra de respostas de IA. Diferencie uma observação, uma hipótese e uma conclusão causal.",
      summary:
        "Um resultado de 60% pode contar uma história menos sólida que um de 30%. A diferença pode estar nas respostas que faltam. Com um caso numérico construído, vamos ver o que verificar antes de celebrar uma melhora ou transformá-la em prioridade.",
      sections: [
        {
          id: "alcance",
          title: "Leia o escopo antes da porcentagem",
          paragraphs: [
            "Antes de perguntar se um número é alto ou baixo, revise quais perguntas o produziram, em qual ambiente, quando e com qual cobertura.",
            "Um diagnóstico não estima todas as conversas em uma ferramenta nem descreve sozinho o comportamento de outra interface ou modelo.",
          ],
        },
        {
          id: "denominador",
          title: "Torne o denominador visível",
          paragraphs: [
            "Uma porcentagem de presença exige uma definição de resposta válida e um número explícito de observações. Falhas e respostas incompletas acompanham o resultado como cobertura.",
            "Mudar o denominador pode alterar a porcentagem mesmo com a mesma quantidade de menções. Documente os dois valores.",
          ],
          figure: {
            title: "O dobro do percentual. As mesmas seis menções.",
            caption:
              "Exercício sintético, não resultados da KAIRUM. A cobertura cai de 20 para 10 respostas válidas entre 25 previstas; falhas não são contadas como ausência da marca.",
            steps: [
              {
                label: "Observação A",
                detail: "6 menções em 20 respostas válidas. Cobertura: 20/25.",
                value: "30%",
              },
              {
                label: "Observação B",
                detail: "6 menções em 10 respostas válidas. Cobertura: 10/25.",
                value: "60%",
              },
            ],
          },
        },
        {
          id: "caso",
          title: "O caso: 30% e 60% podem descrever a mesma contagem",
          paragraphs: [
            "No exercício da figura, são planejadas 25 observações em cada período. Em A, há 20 respostas válidas e a marca aparece em 6: 6 ÷ 20 = 30%. Em B, há apenas 10 respostas válidas e também 6 menções: 6 ÷ 10 = 60%. O percentual dobrou; a contagem de menções ficou igual.",
            "A cobertura passou de 80% para 40%. Não sabemos o que as respostas ausentes teriam dito. Contá-las como respostas sem menção esconderia a falha; descartá-las sem mostrar a cobertura esconderia outra parte do problema. Antes de interpretar a mudança, investigue os erros e o conjunto de perguntas que recebeu resposta.",
            "Volte às linhas: falharam as mesmas intenções, a superfície foi mantida e quais perguntas têm resposta nos dois períodos? Um subconjunto comum pode ajudar na comparação, desde que seu tamanho e suas exclusões estejam visíveis.",
          ],
          example: {
            label: "Cálculo educativo · não descreve uma medição real",
            text: "Presença A: 6/20 = 30%. Cobertura A: 20/25 = 80%. Presença B: 6/10 = 60%. Cobertura B: 10/25 = 40%. Cada percentual responde a uma pergunta diferente.",
          },
        },
        {
          id: "comparabilidad",
          title: "Compare condições compatíveis",
          paragraphs: [
            "Duas capturas podem usar perguntas, idiomas, modelos ou modos de busca diferentes. Sua diferença pode refletir essas condições além de mudanças de conteúdo.",
            "Mantenha uma versão comum de perguntas, identifique os ambientes e registre datas. Explique mudanças de condições antes de interpretar a comparação.",
          ],
          items: [
            "Mesmo objetivo e conjunto comparável de perguntas.",
            "Idioma e contexto preservados ou mudanças documentadas.",
            "Ambiente e modelo identificados quando possível.",
            "Cobertura, erros e regras de cálculo visíveis.",
            "Respostas e fontes consultáveis por trás do resumo.",
          ],
          references: [
            {
              title: "Google Search Central: recursos de IA e seu site",
              url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
            },
          ],
        },
        {
          id: "cambio",
          title: "Quando a comparação preserva a amostra",
          paragraphs: [
            "Agora suponha outro exercício com condições compatíveis e 20 respostas válidas nos dois períodos: a marca passa de aparecer em 6 para aparecer em 9. A presença vai de 30% para 45%. São 15 pontos percentuais de diferença, ou aumento relativo de 50%. As duas expressões estão aritmeticamente corretas, mas precisam da contagem ao lado para serem interpretadas.",
            "Nem essa diferença comprova o efeito de uma intervenção. As respostas podem variar entre execuções. Registre as repetições previstas e evite tratar reformulações parecidas como pessoas independentes. Essa amostra não mede participação de mercado nem a frequência de todas as conversas.",
          ],
        },
        {
          id: "causalidad",
          title: "Diferencie observação, hipótese e efeito",
          paragraphs: [
            "Observação: a marca apareceu em mais respostas da amostra. Hipótese: uma melhoria de conteúdo pode ter contribuído. Conclusão causal: aquela intervenção produziu a mudança. A terceira exige um desenho que avalie outras explicações.",
            "Uma comparação antes e depois ajuda a acompanhar a evolução, mas também podem mudar modelo, fontes e respostas entre execuções. Evite atribuir o movimento automaticamente a uma ação.",
          ],
        },
        {
          id: "prioridades",
          title: "Documente uma decisão revisável",
          paragraphs: [
            "Uma prioridade útil indica a resposta que a motiva, a fonte a revisar e um próximo passo. Se a evidência for insuficiente, investigue mais.",
            "Separe resultados de visibilidade, visitas e contatos comerciais. A cadeia completa exige observações distintas e não é demonstrada por uma menção.",
          ],
        },
        {
          id: "nota",
          title: "Uma nota de decisão que possa ser discutida",
          paragraphs: [
            "Tente escrever quatro linhas: o que observamos, com qual evidência, qual explicação estamos considerando e o que vamos revisar. Por exemplo: “Na amostra comparável, há três respostas adicionais com menção. Revisaremos suas fontes e a descrição da marca antes de propor mudanças”. Essa nota admite revisão e evita transformar uma associação em causa.",
            "Se a pergunta é se chegaram visitas ou contatos, abra essa análise nas fontes correspondentes. O Google explica que o tráfego de seus recursos de IA entra no desempenho geral de pesquisa Web do Search Console. Esse relatório e um registro de respostas observadas descrevem populações distintas; um não valida automaticamente o outro.",
          ],
          references: [
            {
              title: "Google Search Central: recursos de IA e seu site",
              url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
            },
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: recursos de IA e seu site",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
        },
        {
          title: "Google Search Central: como a Pesquisa funciona",
          url: "https://developers.google.com/search/docs/fundamentals/how-search-works?hl=pt-br",
        },
        {
          title: "OpenAI: rastreadores e agentes de pesquisa",
          url: "https://platform.openai.com/docs/bots",
        },
      ],
      related: ["visibility-guide", "mentions-citations-visits"],
      product: "analytics",
      cover: {
        alt: "Dois discos amarelos iguais dentro de molduras pretas de tamanhos diferentes.",
        caption:
          "Ilustração editorial da KAIRUM · a mesma observação muda de sentido quando a moldura muda.",
      },
      takeaways: [
        "Ler a contagem e a cobertura junto com o percentual.",
        "Comparar condições e perguntas compatíveis.",
        "Transformar cada achado em uma hipótese e um próximo passo.",
      ],
    },
    glossary: {
      title: "Glossário de GEO, AEO e visibilidade de marca em IA",
      category: "Referência",
      description:
        "Definições de GEO, AEO, menções, citações, presença, cobertura e ambientes API, com exemplos e limites para interpretar a busca com IA.",
      summary:
        "Um vocabulário compartilhado ajuda a perguntar e medir com precisão. Estes termos explicam como usamos os conceitos na KAIRUM; definições e métricas podem variar entre fornecedores.",
      sections: [
        {
          id: "geo-aeo",
          title: "GEO e AEO",
          paragraphs: [
            "GEO (Generative Engine Optimization) costuma descrever o trabalho sobre presença de conteúdos e marcas em respostas generativas. AEO (Answer Engine Optimization) é usado para o trabalho orientado a respostas de buscadores e assistentes. Seus usos se sobrepõem; não são duas métricas universais.",
            "Os recursos de IA do Google mantêm os fundamentos de SEO. O Google não exige um arquivo especial para IA nem um schema específico para aparecer em AI Overviews ou AI Mode.",
          ],
        },
        {
          id: "mencion-cita",
          title: "Menção e citação",
          paragraphs: [
            "Menção: o nome de uma marca aparece em uma resposta. Citação: informação atribuída a uma fonte identificável, geralmente por um link. Uma não implica a outra.",
          ],
        },
        {
          id: "presencia",
          title: "Presença em uma amostra",
          paragraphs: [
            "Proporção de respostas válidas de um conjunto em que uma marca é observada, segundo uma regra explícita de identificação. Não representa todas as conversas nem garante recomendação.",
          ],
        },
        {
          id: "cobertura",
          title: "Cobertura",
          paragraphs: [
            "Relação entre observações válidas e as previstas no escopo. Permite ver erros, omissões e limites que uma porcentagem resumida poderia esconder.",
          ],
        },
        {
          id: "superficie",
          title: "Ambiente API e interface de consumidor",
          paragraphs: [
            "Um ambiente é o contexto específico em que uma resposta é observada. OpenAI API e OpenRouter são ambientes API ou proxy. Medi-los não equivale a capturar a interface do ChatGPT.",
          ],
        },
        {
          id: "visita-rastreo",
          title: "Visita referenciada e rastreamento",
          paragraphs: [
            "Uma visita referenciada é uma sessão cuja origem pode ser identificada na análise. Um rastreamento é a solicitação de um agente ao servidor e não demonstra visita humana nem citação.",
          ],
        },
        {
          id: "prompt",
          title: "Pergunta ou prompt",
          paragraphs: [
            "Entrada concreta enviada a um ambiente. Preserve texto, idioma, intenção e versão para medir. Incluir o nome da marca define uma pergunta dirigida; omiti-lo permite uma consulta aberta.",
          ],
        },
        {
          id: "comparabilidad",
          title: "Comparabilidade",
          paragraphs: [
            "Quanto duas medições preservam condições que permitem interpretar diferenças. Mudar perguntas, modelos, idioma ou cobertura exige registrar essas variações antes da comparação.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: recursos de IA e seu site",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
        },
        {
          title: "OpenAI: rastreadores e agentes de pesquisa",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: o que a análise web mede",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
      ],
      related: ["visibility-guide", "mentions-citations-visits"],
      product: "report",
    },
    methodology: {
      title: "Metodologia e critério editorial da KAIRUM",
      category: "Método",
      description:
        "Como a KAIRUM propõe uma observação de visibilidade em IA: escopo, perguntas, evidências, cobertura, revisão e limites das conclusões.",
      summary:
        "Nosso ponto de partida é uma pergunta concreta. Definimos o que observar, preservamos evidências e diferenciamos o que a amostra permite concluir do que ainda exige investigação.",
      sections: [
        {
          id: "alcance",
          title: "Escopo antes da execução",
          paragraphs: [
            "Cada diagnóstico define marca, categoria, conjunto de perguntas e condições de observação. Consultas abertas e dirigidas são identificadas para separar seus objetivos.",
            "Planejamento não é medição. Um exemplo de interface ou gráfico esquemático também não comprova resultados reais.",
          ],
        },
        {
          id: "evidencia",
          title: "Da resposta ao achado",
          paragraphs: [
            "A revisão deve permitir voltar à pergunta, à resposta, à data e ao ambiente. Menções, citações visíveis e fontes recuperadas são distinguidas quando disponíveis.",
            "A cobertura é registrada com falhas e exclusões. Um resumo quantitativo inclui a regra e o denominador que o produzem.",
          ],
        },
        {
          id: "superficies",
          title: "Identifique o ambiente observado",
          paragraphs: [
            "OpenAI API e OpenRouter são identificados como ambientes API ou proxy. Não são apresentados como a interface do ChatGPT. Uma observação de um ambiente não se generaliza automaticamente aos demais.",
          ],
        },
        {
          id: "limites",
          title: "O que um estudo exploratório permite concluir",
          paragraphs: [
            "Um estudo prospectivo descreve perguntas e respostas observadas em uma data e sob condições explícitas. Não transforma as organizações incluídas em clientes nem implica sua aprovação.",
            "Amostras com perguntas, datas ou ambientes diferentes não constituem um ranking homogêneo de empresas. Uma variação temporal também não demonstra impacto comercial ou causalidade.",
          ],
        },
        {
          id: "editorial",
          title: "Como preparamos estas leituras",
          paragraphs: [
            "Guias e artigos são preparados com assistência de IA e conferência de fontes públicas. A autoria corporativa é KAIRUM; cada leitura mostra referências e data de revisão.",
            "Exemplos inventados são identificados como sintéticos ou esquemáticos. Explicam cálculos ou decisões e não são métricas do produto ou de clientes.",
            "Fontes oficiais são vinculadas onde sustentam uma afirmação. Propostas metodológicas próprias são explicadas como critérios de trabalho, sem alegar validação não realizada.",
          ],
        },
        {
          id: "actualizacion",
          title: "Um critério aberto à revisão",
          paragraphs: [
            "Ambientes e funções mudam. Quando uma fonte ou condição deixa de ser atual, revise o conteúdo e registre a data da atualização.",
            "Use a página de contato da KAIRUM para sugerir uma correção ou conversar sobre o escopo de um diagnóstico.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: recursos de IA e seu site",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br",
        },
        {
          title: "OpenAI: rastreadores e agentes de pesquisa",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: o que a análise web mede",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "report",
    },
  },
};
