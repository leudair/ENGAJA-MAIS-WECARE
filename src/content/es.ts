import type { Content } from "./types";

export const es: Content = {
  meta: {
    title: "Engaja Mais WeCare — Planes mensuales de engagement",
    description:
      "Planes mensuales de engagement para hasta 30 publicaciones por ciclo. Start, Intermedio y Premium, desde R$ 197.",
  },
  nav: {
    howItWorks: "Cómo funciona",
    plans: "Planes",
    limit: "Límite del ciclo",
    faq: "Preguntas frecuentes",
    viralGrowth: "Crecimiento Viral",
    skipToContent: "Ir al contenido",
    languageLabel: "Idioma",
  },
  hero: {
    logoAlt: "Agência WeCare Mídias Sociais",
    method: "Metodología We Care",
    frameTitle: "Estrategia Engaja Mais Mensual",
    methodNote:
      "La forma de WeCare de mantener un perfil vivo: engagement en cada publicación del ciclo, y no en una publicación suelta de vez en cuando.",
    title: "Un perfil quieto no vende.",
    highlight: "El tuyo no se va a quedar quieto.",
    subtitle:
      "Planes mensuales que reparten el engagement entre tus publicaciones a lo largo del ciclo, con hasta 30 publicaciones atendidas. Tú publicas, nosotros nos ocupamos del resto.",
    primaryCta: "Ver planes",
    secondaryCta: "Conocer Crecimiento Viral",
    note: "Planes desde R$ 197 por ciclo mensual.",
    proofs: [
      {
        title: "Hasta 30 publicaciones",
        description: "atendidas dentro de cada ciclo mensual",
      },
      {
        title: "Sin contraseña",
        description: "nunca pedimos acceso a tu cuenta",
      },
      {
        title: "Identidad preservada",
        description: "no divulgamos quién contrata",
      },
      {
        title: "Desde R$ 197",
        description: "por ciclo mensual, en el plan Start",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Cómo funciona",
    title: "Simple de principio a fin",
    subtitle:
      "Desde la contratación hasta la entrega, el proceso está pensado para que no tengas que ocuparte de nada en el día a día.",
    steps: [
      {
        title: "Elige el plan",
        description:
          "Selecciona la familia que encaja con tu ritmo de publicación: Start, Intermedio o Premium.",
      },
      {
        title: "Indica el perfil",
        description:
          "Nos envías el perfil que será atendido. No pedimos contraseña ni accedemos a tu cuenta.",
      },
      {
        title: "Publica con normalidad",
        description:
          "Sigue tu calendario de contenido. Cada nueva publicación del ciclo entra en la fila de atención.",
      },
      {
        title: "Acompaña el ciclo",
        description:
          "El engagement se reparte a lo largo del ciclo mensual, respetando el límite de hasta 30 publicaciones.",
      },
    ],
  },
  included: {
    eyebrow: "Qué incluye",
    title: "Pensado para quien publica de verdad",
    subtitle:
      "El mismo cuidado en todas las familias de plan. Lo que cambia entre ellas es el volumen de entrega.",
    items: [
      {
        title: "Atención por publicación",
        description:
          "El engagement acompaña las publicaciones del ciclo, no una sola publicación aislada.",
      },
      {
        title: "Distribución a lo largo del ciclo",
        description:
          "La entrega se reparte durante el período contratado, para que el perfil mantenga movimiento constante.",
      },
      {
        title: "Sin acceso a tu cuenta",
        description:
          "Nunca necesitas dar tu contraseña. Trabajamos solo con el perfil público.",
      },
      {
        title: "Identidad preservada",
        description:
          "No divulgamos quiénes son los clientes atendidos. Tu contratación queda entre tú y WeCare.",
      },
      {
        title: "Renovación mensual",
        description:
          "Cada ciclo es mensual. Continuar depende únicamente de ti.",
      },
      {
        title: "Soporte directo con WeCare",
        description:
          "Hablas directamente con el equipo responsable de la entrega, sin intermediarios.",
      },
    ],
  },
  limit: {
    eyebrow: "Límite del ciclo",
    title: "Hasta 30 publicaciones por ciclo. Sin letra pequeña.",
    lead:
      "Todos los planes atienden hasta 30 publicaciones dentro de un ciclo mensual. Ese es el tope y vale para todas las familias de plan.",
    bullets: [
      "El ciclo es mensual y el contador de publicaciones se reinicia en cada renovación.",
      "Si publicas menos de 30 veces en el ciclo, lo que sobra no se acumula para el ciclo siguiente.",
      "Si publicas más de 30 veces en el ciclo, las publicaciones que superan el límite no entran en la atención de ese ciclo.",
      "El límite es de publicaciones atendidas: lo que cambia entre las familias de plan es el volumen de engagement en cada una.",
    ],
    footnote:
      "¿Quieres saber cómo encaja este límite en tu calendario de contenido? Habla con nosotros antes de contratar.",
  },
  plans: {
    eyebrow: "Planes",
    title: "Tres familias, el mismo cuidado",
    subtitle:
      "Todas atienden hasta 30 publicaciones por ciclo mensual. Elige según la intensidad de entrega que tenga sentido para tu perfil.",
    priceUndefined: "A consultar",
    priceUndefinedNote: "valor informado durante la atención",
    detailsLabel: "Ver qué incluye",
    items: [
      {
        id: "start",
        name: "Start",
        price: "R$ 197",
        priceNote: "por ciclo mensual",
        summary:
          "La puerta de entrada para quien empieza a darle ritmo al perfil.",
        features: [
          "Hasta 30 publicaciones atendidas por ciclo",
          "Entrega repartida a lo largo del ciclo mensual",
          "Sin acceso a tu cuenta",
          "Identidad del cliente preservada",
        ],
        cta: "Quiero el Start",
        highlighted: false,
      },
      {
        id: "intermediate",
        name: "Intermedio",
        price: null,
        priceNote: "por ciclo mensual",
        summary:
          "Para perfiles que ya publican con frecuencia y quieren una presencia más firme.",
        features: [
          "Hasta 30 publicaciones atendidas por ciclo",
          "Volumen de engagement superior al Start",
          "Entrega repartida a lo largo del ciclo mensual",
          "Identidad del cliente preservada",
        ],
        cta: "Quiero el Intermedio",
        highlighted: true,
        badge: "El más solicitado",
      },
      {
        id: "premium",
        name: "Premium",
        price: null,
        priceNote: "por ciclo mensual",
        summary:
          "El nivel más alto de entrega para quien trata el perfil como su escaparate principal.",
        features: [
          "Hasta 30 publicaciones atendidas por ciclo",
          "El mayor volumen de engagement entre las familias",
          "Entrega repartida a lo largo del ciclo mensual",
          "Identidad del cliente preservada",
        ],
        cta: "Quiero el Premium",
        highlighted: false,
      },
    ],
    disclaimer:
      "Los valores y condiciones de cada plan se confirman durante la atención, antes de contratar.",
  },
  demo: {
    eyebrow: "Demostración",
    title: "El perfil de WeCare es el escaparate",
    lead:
      "En lugar de exponer clientes, mostramos nuestro propio perfil aplicando la misma estrategia que entregamos.",
    paragraphs: [
      "Quien contrata quiere ver el servicio funcionando antes de decidir. Pero mostrar el perfil de un cliente significaría entregar la identidad de quien confió en nosotros, y eso no lo hacemos.",
      "Por eso la demostración es el propio perfil de WeCare. Ahí puedes observar el ritmo de publicación y el comportamiento del engagement a lo largo del ciclo, con la misma estrategia de los planes.",
    ],
    cta: "Ver el perfil de WeCare",
  },
  privacy: {
    eyebrow: "Discreción",
    title: "La identidad de quien contrata queda preservada",
    lead:
      "La discreción no es un extra del plan. Es parte de cómo trabaja WeCare.",
    bullets: [
      "No divulgamos nombres, perfiles ni capturas de los clientes atendidos.",
      "No pedimos contraseña ni acceso a tu cuenta en ningún momento.",
      "La demostración pública siempre es el perfil de la propia WeCare.",
    ],
  },
  viral: {
    eyebrow: "Otro frente",
    title: "Estrategia Viral",
    lead:
      "Crecimiento Viral es nuestro frente enfocado en expandir el alcance. Funciona por separado de los planes mensuales de engagement.",
    cta: "Ir a Crecimiento Viral",
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Antes de contratar",
    items: [
      {
        question: "¿Qué cuenta como una publicación del ciclo?",
        answer:
          "Cada publicación nueva que haces en el perfil indicado durante el ciclo mensual, hasta el límite de 30.",
      },
      {
        question: "¿Y si publico más de 30 veces al mes?",
        answer:
          "Las publicaciones que superen las 30 no entran en la atención de ese ciclo. El contador se reinicia en la renovación.",
      },
      {
        question: "¿Las publicaciones que no usé se acumulan?",
        answer:
          "No. El límite de 30 vale dentro del ciclo y no se transfiere al ciclo siguiente.",
      },
      {
        question: "¿Necesitan la contraseña de mi perfil?",
        answer:
          "No. En ningún momento pedimos contraseña ni acceso a tu cuenta. Trabajamos con el perfil público.",
      },
      {
        question: "¿Muestran que soy cliente?",
        answer:
          "No. La identidad de quien contrata queda preservada. La demostración pública siempre es el perfil de WeCare.",
      },
      {
        question: "¿Cuál es la diferencia entre los planes?",
        answer:
          "Todas las familias atienden hasta 30 publicaciones por ciclo. Lo que cambia es el volumen de engagement entregado en cada una.",
      },
      {
        question: "¿Engagement mensual es lo mismo que Crecimiento Viral?",
        answer:
          "No. Son frentes distintos. Los planes de esta página cuidan el engagement de las publicaciones del ciclo; Crecimiento Viral se enfoca en expandir el alcance y tiene su propia página.",
      },
    ],
  },
  finalCta: {
    title: "¿Listo para darle ritmo a tu perfil?",
    subtitle:
      "Habla con WeCare, cuéntanos cómo es tu calendario de publicaciones y te indicamos la familia de plan que tiene sentido.",
    primaryCta: "Hablar con WeCare",
    secondaryCta: "Conocer Crecimiento Viral",
  },
  viralPage: {
    eyebrow: "En construcción",
    title: "Crecimiento Viral",
    lead:
      "Esta página se está preparando. Mientras tanto, los planes mensuales de engagement ya están disponibles.",
    backCta: "Volver a Engagement",
  },
  footer: {
    tagline: "Engagement mensual para perfiles que publican de verdad.",
    rights: "Todos los derechos reservados.",
    engagement: "Engagement",
    viralGrowth: "Crecimiento Viral",
  },
};
