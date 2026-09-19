import type { Content } from "./types";

export const pt: Content = {
  meta: {
    title: "Engaja Mais WeCare — Planos mensais de engajamento",
    description:
      "Planos mensais de engajamento para até 30 publicações por ciclo. Start, Intermediário e Premium, a partir de R$ 197.",
  },
  nav: {
    howItWorks: "Como funciona",
    plans: "Planos",
    limit: "Limite do ciclo",
    faq: "Perguntas frequentes",
    viralGrowth: "Crescimento Viral",
    skipToContent: "Ir para o conteúdo",
    languageLabel: "Idioma",
  },
  hero: {
    logoAlt: "Engaja Mais WeCare",
    method: "Metodologia WeCare",
    methodNote:
      "O jeito da WeCare de manter um perfil vivo: engajamento em cada publicação do ciclo, e não em um post solto de vez em quando.",
    title: "Perfil parado não vende.",
    highlight: "O seu não vai ficar parado.",
    subtitle:
      "Planos mensais que distribuem engajamento nas suas publicações ao longo do ciclo, com até 30 publicações atendidas. Você posta, a gente cuida do resto.",
    primaryCta: "Ver planos",
    secondaryCta: "Conhecer Crescimento Viral",
    note: "Planos a partir de R$ 197 por ciclo mensal.",
    proofs: [
      {
        title: "Até 30 publicações",
        description: "atendidas dentro de cada ciclo mensal",
      },
      {
        title: "Sem senha",
        description: "nunca pedimos acesso à sua conta",
      },
      {
        title: "Identidade preservada",
        description: "não divulgamos quem contrata",
      },
      {
        title: "A partir de R$ 197",
        description: "por ciclo mensal, no plano Start",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Como funciona",
    title: "Simples do começo ao fim",
    subtitle:
      "Do contrato à entrega, o processo foi desenhado para você não precisar acompanhar nada no dia a dia.",
    steps: [
      {
        title: "Escolha o plano",
        description:
          "Selecione a família que combina com o seu ritmo de publicação: Start, Intermediário ou Premium.",
      },
      {
        title: "Informe o perfil",
        description:
          "Você envia o perfil que será atendido. Não pedimos senha e não acessamos sua conta.",
      },
      {
        title: "Publique normalmente",
        description:
          "Siga o seu calendário de conteúdo. Cada nova publicação do ciclo entra na fila de atendimento.",
      },
      {
        title: "Acompanhe o ciclo",
        description:
          "O engajamento é distribuído ao longo do ciclo mensal, respeitando o limite de até 30 publicações.",
      },
    ],
  },
  included: {
    eyebrow: "O que está incluso",
    title: "Tudo pensado para o dia a dia de quem publica",
    subtitle:
      "O mesmo cuidado em todas as famílias de plano. O que muda entre elas é o volume de entrega.",
    items: [
      {
        title: "Atendimento por publicação",
        description:
          "O engajamento acompanha as publicações do ciclo, e não um único post isolado.",
      },
      {
        title: "Distribuição ao longo do ciclo",
        description:
          "A entrega é espalhada no período contratado, para o perfil manter movimento constante.",
      },
      {
        title: "Sem acesso à sua conta",
        description:
          "Você nunca precisa informar senha. Trabalhamos apenas com o perfil público.",
      },
      {
        title: "Identidade preservada",
        description:
          "Não divulgamos quem são os clientes atendidos. Sua contratação fica entre você e a WeCare.",
      },
      {
        title: "Renovação mensal",
        description:
          "Cada ciclo é mensal. A continuidade depende só de você seguir com o plano.",
      },
      {
        title: "Suporte direto com a WeCare",
        description:
          "Fala direto com a equipe responsável pelo atendimento, sem intermediário.",
      },
    ],
  },
  limit: {
    eyebrow: "Limite do ciclo",
    title: "Até 30 publicações por ciclo. Sem letra miúda.",
    lead:
      "Todo plano atende até 30 publicações dentro de um ciclo mensal. Esse é o teto, e ele vale para todas as famílias de plano.",
    bullets: [
      "O ciclo é mensal e o contador de publicações recomeça a cada renovação.",
      "Se você publicar menos de 30 vezes no ciclo, o que sobra não acumula para o ciclo seguinte.",
      "Se você publicar mais de 30 vezes no ciclo, as publicações além do limite não entram no atendimento daquele ciclo.",
      "O limite é de publicações atendidas: o que muda entre as famílias de plano é o volume de engajamento em cada uma.",
    ],
    footnote:
      "Quer entender como esse limite se encaixa no seu calendário de conteúdo? Fale com a gente antes de contratar.",
  },
  plans: {
    eyebrow: "Planos",
    title: "Três famílias, o mesmo cuidado",
    subtitle:
      "Todas atendem até 30 publicações por ciclo mensal. Escolha pela intensidade de entrega que faz sentido para o seu perfil.",
    priceUndefined: "Sob consulta",
    priceUndefinedNote: "valor informado no atendimento",
    items: [
      {
        id: "start",
        name: "Start",
        price: "R$ 197",
        priceNote: "por ciclo mensal",
        summary:
          "A porta de entrada para quem está começando a dar ritmo ao perfil.",
        features: [
          "Até 30 publicações atendidas por ciclo",
          "Entrega distribuída ao longo do ciclo mensal",
          "Sem acesso à sua conta",
          "Identidade do cliente preservada",
        ],
        cta: "Quero o Start",
        highlighted: false,
      },
      {
        id: "intermediate",
        name: "Intermediário",
        price: null,
        priceNote: "por ciclo mensal",
        summary:
          "Para perfis que já publicam com frequência e querem presença mais firme.",
        features: [
          "Até 30 publicações atendidas por ciclo",
          "Volume de engajamento acima do Start",
          "Entrega distribuída ao longo do ciclo mensal",
          "Identidade do cliente preservada",
        ],
        cta: "Quero o Intermediário",
        highlighted: true,
        badge: "Mais procurado",
      },
      {
        id: "premium",
        name: "Premium",
        price: null,
        priceNote: "por ciclo mensal",
        summary:
          "O nível mais alto de entrega para quem trata o perfil como vitrine principal.",
        features: [
          "Até 30 publicações atendidas por ciclo",
          "Maior volume de engajamento entre as famílias",
          "Entrega distribuída ao longo do ciclo mensal",
          "Identidade do cliente preservada",
        ],
        cta: "Quero o Premium",
        highlighted: false,
      },
    ],
    disclaimer:
      "Valores e condições de cada plano são confirmados no atendimento antes da contratação.",
  },
  demo: {
    eyebrow: "Demonstração",
    title: "O perfil da WeCare é a vitrine",
    lead:
      "Em vez de expor clientes, mostramos o nosso próprio perfil aplicando a mesma estratégia que entregamos.",
    paragraphs: [
      "Quem contrata quer ver o serviço funcionando antes de decidir. Só que mostrar perfil de cliente significaria entregar a identidade de quem confiou na gente — e isso nós não fazemos.",
      "Por isso a demonstração é o próprio perfil da WeCare. É lá que você observa o ritmo de publicação e o comportamento do engajamento ao longo do ciclo, com a mesma estratégia dos planos.",
    ],
    cta: "Ver o perfil da WeCare",
  },
  privacy: {
    eyebrow: "Discrição",
    title: "A identidade de quem contrata fica preservada",
    lead:
      "Discrição não é um extra do plano. É parte de como a WeCare trabalha.",
    bullets: [
      "Não divulgamos nomes, perfis ou prints de clientes atendidos.",
      "Não pedimos senha nem acesso à sua conta em nenhum momento.",
      "A demonstração pública é sempre o perfil da própria WeCare.",
    ],
  },
  viral: {
    eyebrow: "Outra frente",
    title: "Procurando alcance além do engajamento mensal?",
    lead:
      "O Crescimento Viral é a nossa frente voltada para expansão de alcance. Ela funciona separada dos planos mensais de engajamento.",
    cta: "Ir para Crescimento Viral",
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "Antes de contratar",
    items: [
      {
        question: "O que conta como uma publicação do ciclo?",
        answer:
          "Cada publicação nova que você faz no perfil informado durante o ciclo mensal, até o limite de 30.",
      },
      {
        question: "E se eu publicar mais de 30 vezes no mês?",
        answer:
          "As publicações que passarem de 30 não entram no atendimento daquele ciclo. O contador recomeça na renovação.",
      },
      {
        question: "As publicações que eu não usei acumulam?",
        answer:
          "Não. O limite de 30 vale dentro do ciclo e não é transferido para o ciclo seguinte.",
      },
      {
        question: "Vocês precisam da senha do meu perfil?",
        answer:
          "Não. Em nenhum momento pedimos senha ou acesso à sua conta. Trabalhamos com o perfil público.",
      },
      {
        question: "Vocês mostram que eu sou cliente?",
        answer:
          "Não. A identidade de quem contrata fica preservada. A demonstração pública é sempre o perfil da WeCare.",
      },
      {
        question: "Qual a diferença entre os planos?",
        answer:
          "Todas as famílias atendem até 30 publicações por ciclo. O que muda é o volume de engajamento entregue em cada uma.",
      },
      {
        question: "Engajamento mensal é a mesma coisa que Crescimento Viral?",
        answer:
          "Não. São frentes diferentes. Os planos desta página cuidam do engajamento nas publicações do ciclo; o Crescimento Viral é voltado para expansão de alcance e tem página própria.",
      },
    ],
  },
  finalCta: {
    title: "Pronto para dar ritmo ao seu perfil?",
    subtitle:
      "Fale com a WeCare, conte como é o seu calendário de publicações e a gente indica a família de plano que faz sentido.",
    primaryCta: "Falar com a WeCare",
    secondaryCta: "Conhecer Crescimento Viral",
  },
  viralPage: {
    eyebrow: "Em construção",
    title: "Crescimento Viral",
    lead:
      "Esta página está sendo preparada. Enquanto isso, os planos mensais de engajamento já estão disponíveis.",
    backCta: "Voltar para Engajamento",
  },
  footer: {
    tagline: "Engajamento mensal para perfis que publicam de verdade.",
    rights: "Todos os direitos reservados.",
    engagement: "Engajamento",
    viralGrowth: "Crescimento Viral",
  },
};
