/**
 * Termos de Uso e Política de Privacidade da Agência WeCare Digital.
 *
 * O texto é o documento oficial enviado pelo Leudair em 22 de setembro de
 * 2026, transcrito palavra por palavra. É um contrato: nada aqui pode ser
 * reescrito, resumido nem traduzido sem que ele mande a nova versão. Por isso
 * o texto fica em português nos três idiomas do site, e a tradução das duas
 * páginas depende de uma versão oficial traduzida.
 */

/** Um bloco do documento: um parágrafo ou uma lista de itens. */
export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] };

/** Uma cláusula numerada do documento. */
export type LegalSection = {
  number: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  /** Parágrafos antes da primeira cláusula. */
  intro: LegalBlock[];
  sections: LegalSection[];
};

/** Data da versão do documento, mostrada no alto das duas páginas. */
export const legalUpdatedAt = "2026-09-22";

export const termsDocument: LegalDocument = {
  intro: [
    {
      kind: "p",
      text: "Os presentes Termos de Uso regulamentam a contratação dos serviços disponibilizados pela Agência WeCare Digital LTDA, inscrita no CNPJ sob o nº 26.356.036/0001-04, com sede na Rua Francisco Barreto, nº 17, sala 10, Centro, Camboriú/SC, CEP 88340-401, doravante denominada simplesmente WeCare.",
    },
  ],
  sections: [
    {
      number: "1",
      title: "Aceitação dos Termos",
      blocks: [
        {
          kind: "p",
          text: "Ao acessar o site, selecionar um plano, aceitar eletronicamente estes Termos ou concluir um pagamento, o cliente declara que:",
        },
        {
          kind: "list",
          items: [
            "Leu e compreendeu todas as condições apresentadas;",
            "Teve acesso prévio às características, aos valores e às limitações do serviço;",
            "Forneceu informações verdadeiras e atualizadas;",
            "Possui capacidade legal para realizar a contratação;",
            "Concorda com estes Termos de Uso e com a Política de Privacidade da WeCare.",
          ],
        },
        {
          kind: "p",
          text: "A confirmação eletrônica da contratação, juntamente com os registros do pedido, do pagamento e das comunicações realizadas, poderá ser utilizada como comprovação da relação contratual.",
        },
      ],
    },
    {
      number: "2",
      title: "Objeto dos Serviços",
      blocks: [
        {
          kind: "p",
          text: "A WeCare presta serviços digitais de crescimento, posicionamento e incremento de métricas em redes sociais, de acordo com o plano ou a estratégia selecionada pelo cliente.",
        },
        {
          kind: "p",
          text: "Os serviços poderão incluir, conforme descrito na oferta contratada:",
        },
        {
          kind: "list",
          items: [
            "Visualizações;",
            "Curtidas para Reels ou outras publicações;",
            "Compartilhamentos;",
            "Repostagens para Reels;",
            "Salvamentos;",
            "Comentários customizados;",
            "Seguidores, exclusivamente quando expressamente incluídos na oferta;",
            "Outras métricas ou ações digitais apresentadas no momento da contratação.",
          ],
        },
        {
          kind: "p",
          text: "Os planos de Engajamento Mensal não incluem seguidores, salvo quando essa entrega estiver expressamente indicada na oferta. A plataforma, quantidade, distribuição, período de aplicação e demais características do serviço serão aquelas apresentadas na oferta vigente no momento da compra.",
        },
      ],
    },
    {
      number: "3",
      title: "Natureza dos Serviços",
      blocks: [
        {
          kind: "p",
          text: "Os serviços são digitais, executados sob demanda e vinculados ao perfil, publicação, vídeo ou conteúdo informado pelo cliente.",
        },
        {
          kind: "p",
          text: "A contratação tem como finalidade incrementar as métricas previstas na oferta, mas não representa promessa ou garantia de:",
        },
        {
          kind: "list",
          items: [
            "Crescimento orgânico permanente;",
            "Vendas ou aumento de faturamento;",
            "Retorno financeiro;",
            "Conquista de clientes;",
            "Monetização da conta;",
            "Verificação do perfil;",
            "Posicionamento específico no algoritmo;",
            "Alcance orgânico futuro;",
            "Participação espontânea do público;",
            "Manutenção permanente das métricas pelas plataformas.",
          ],
        },
        {
          kind: "p",
          text: "Resultados comerciais e orgânicos dependem de fatores externos, como qualidade do conteúdo, nicho de atuação, frequência de publicação, comportamento do público, estratégias próprias do cliente e regras das plataformas.",
        },
      ],
    },
    {
      number: "4",
      title: "Condições para Execução",
      blocks: [
        {
          kind: "p",
          text: "Para permitir a execução correta dos serviços, o cliente deverá:",
        },
        {
          kind: "list",
          items: [
            "Informar corretamente o nome de usuário, perfil ou link da publicação;",
            "Manter o perfil e as publicações em modo público;",
            "Não alterar o nome de usuário durante o processamento;",
            "Não excluir, arquivar ou restringir o conteúdo relacionado ao pedido;",
            "Não aplicar restrições de país, idade ou acesso;",
            "Manter o perfil ativo e acessível;",
            "Possuir autorização para utilizar e promover o perfil informado;",
            "Comunicar qualquer alteração que possa interferir na execução.",
          ],
        },
        {
          kind: "p",
          text: "A WeCare não solicitará a senha da rede social para executar os serviços descritos nestes Termos.",
        },
        {
          kind: "p",
          text: "Erros, omissões, alterações, exclusões, bloqueios ou restrições provocados pelo cliente poderão interromper a execução. Nesses casos, o prazo ficará suspenso até que a situação seja regularizada.",
        },
        {
          kind: "p",
          text: "Caso o cliente informe um perfil, nome de usuário ou link incorreto e a execução já tenha começado, a transferência do serviço para outro endereço dependerá de viabilidade técnica e poderá gerar nova cobrança.",
        },
      ],
    },
    {
      number: "5",
      title: "Funcionamento dos Planos Mensais",
      blocks: [
        {
          kind: "p",
          text: "Os planos mensais permanecem ativos durante o ciclo informado no momento da contratação.",
        },
        {
          kind: "p",
          text: "Salvo condição diferente apresentada na oferta, cada ciclo poderá contemplar até 30 publicações, com referência operacional de até um Reels por dia.",
        },
        {
          kind: "p",
          text: "Se o cliente realizar as 30 publicações em um período menor, inclusive em poucos dias, os serviços poderão ser aplicados nessas 30 publicações. Após o limite de 30 publicações, novos conteúdos somente serão atendidos no ciclo seguinte ou mediante contratação adicional.",
        },
        {
          kind: "p",
          text: "Publicações não realizadas durante o ciclo não geram acúmulo, crédito, reembolso ou transferência automática para o período seguinte, salvo acordo expresso entre as partes.",
        },
        {
          kind: "p",
          text: "Quando a oferta apresentar uma faixa de entrega, a quantidade aplicada poderá variar entre os limites mínimo e máximo informados no plano.",
        },
      ],
    },
    {
      number: "6",
      title: "Renovação e Recorrência",
      blocks: [
        {
          kind: "p",
          text: "A contratação somente terá renovação automática quando essa condição estiver informada de maneira clara antes do pagamento.",
        },
        {
          kind: "p",
          text: "Quando houver cobrança recorrente, o cliente poderá solicitar o cancelamento das próximas renovações pelos canais oficiais da WeCare.",
        },
        {
          kind: "p",
          text: "O cancelamento da recorrência impede cobranças futuras, mas não interrompe automaticamente um ciclo já pago e em execução, preservados os direitos previstos na legislação.",
        },
        {
          kind: "p",
          text: "Quando a oferta não indicar renovação automática, a contratação será válida somente para o ciclo adquirido.",
        },
      ],
    },
    {
      number: "7",
      title: "Distribuição dos Serviços",
      blocks: [
        {
          kind: "p",
          text: "A distribuição das métricas poderá ser realizada gradualmente, de acordo com:",
        },
        {
          kind: "list",
          items: [
            "O plano contratado;",
            "O volume do pedido;",
            "A quantidade de publicações;",
            "A capacidade operacional;",
            "A disponibilidade técnica;",
            "As condições da plataforma;",
            "A estratégia definida para o serviço.",
          ],
        },
        {
          kind: "p",
          text: "Nos serviços aplicados a várias publicações, a WeCare poderá distribuir as quantidades entre os conteúdos elegíveis, respeitando as características do plano contratado.",
        },
        {
          kind: "p",
          text: "Nas Estratégias Virais, a distribuição poderá ocorrer em uma ou mais publicações específicas, inclusive em vídeos fixados ou indicados pelo cliente, conforme o pacote adquirido.",
        },
      ],
    },
    {
      number: "8",
      title: "Início e Prazo de Execução",
      blocks: [
        {
          kind: "p",
          text: "O início do processamento poderá ocorrer em até 24 horas após o cumprimento conjunto das seguintes condições:",
        },
        {
          kind: "list",
          items: [
            "Confirmação do pagamento;",
            "Identificação do pedido;",
            "Envio correto do perfil ou conteúdo;",
            "Manutenção do perfil em modo público;",
            "Atendimento das condições técnicas necessárias.",
          ],
        },
        {
          kind: "p",
          text: "O prazo de conclusão poderá variar de acordo com o tipo de serviço, o volume contratado, a demanda operacional e as condições da plataforma.",
        },
        {
          kind: "p",
          text: "Instabilidades, manutenções, atualizações, limitações ou indisponibilidades das redes sociais poderão afetar temporariamente a execução. Sempre que tecnicamente possível, o serviço será retomado após a normalização.",
        },
      ],
    },
    {
      number: "9",
      title: "Comentários Customizados",
      blocks: [
        {
          kind: "p",
          text: "Quando o plano incluir comentários customizados, o cliente poderá enviar frases, temas, idiomas ou orientações dentro do prazo solicitado pela WeCare.",
        },
        {
          kind: "p",
          text: "O cliente é responsável por garantir que os textos enviados:",
        },
        {
          kind: "list",
          items: [
            "Não contenham conteúdo ilícito;",
            "Não violem direitos de terceiros;",
            "Não contenham ameaças, difamação, discriminação ou discurso de ódio;",
            "Não promovam fraude ou atividade proibida;",
            "Estejam relacionados ao conteúdo publicado.",
          ],
        },
        {
          kind: "p",
          text: "Caso o cliente não envie as orientações dentro do prazo solicitado, a WeCare poderá utilizar comentários genéricos e compatíveis com o conteúdo, quando isso fizer parte da modalidade contratada.",
        },
        {
          kind: "p",
          text: "A WeCare poderá recusar comentários que apresentem conteúdo ilegal, ofensivo ou incompatível com estes Termos.",
        },
      ],
    },
    {
      number: "10",
      title: "Pagamento",
      blocks: [
        {
          kind: "p",
          text: "Os pagamentos poderão ser realizados pelos meios disponibilizados no momento da contratação, incluindo Pix, cartão ou outros provedores autorizados.",
        },
        {
          kind: "p",
          text: "Eventuais taxas relacionadas ao meio de pagamento deverão ser informadas antes da conclusão da compra. A contratação somente será confirmada após a aprovação do pagamento.",
        },
        {
          kind: "p",
          text: "Pagamentos não aprovados, cancelados, contestados ou identificados como suspeitos poderão impedir ou suspender a execução. A emissão de nota fiscal seguirá os dados fornecidos pelo cliente e as regras tributárias aplicáveis.",
        },
      ],
    },
    {
      number: "11",
      title: "Direito de Arrependimento e Cancelamento",
      blocks: [
        {
          kind: "p",
          text: "Nas contratações realizadas pela internet, serão respeitados os direitos assegurados ao consumidor pela legislação brasileira, inclusive o direito de arrependimento quando legalmente aplicável.",
        },
        {
          kind: "p",
          text: "A solicitação deverá ser encaminhada pelos canais oficiais da WeCare, acompanhada da identificação do titular e dos dados da compra.",
        },
        {
          kind: "p",
          text: "A análise considerará:",
        },
        {
          kind: "list",
          items: [
            "A data da contratação;",
            "A natureza do serviço;",
            "O estágio de execução;",
            "A existência de entregas já realizadas;",
            "As particularidades do pedido;",
            "A legislação aplicável.",
          ],
        },
        {
          kind: "p",
          text: "Fora das hipóteses garantidas pela legislação ou por estes Termos, serviços que já estiverem em processamento não poderão ser cancelados unilateralmente apenas por mudança de interesse do cliente.",
        },
        {
          kind: "p",
          text: "Nenhuma disposição destes Termos tem como objetivo afastar direitos obrigatórios assegurados ao consumidor.",
        },
      ],
    },
    {
      number: "12",
      title: "Reembolso e Correção de Falhas",
      blocks: [
        {
          kind: "p",
          text: "Caso exista falha comprovadamente atribuível à WeCare, o cliente deverá entrar em contato com o suporte para que seja realizada a verificação técnica.",
        },
        {
          kind: "p",
          text: "Conforme as características do caso, a WeCare poderá:",
        },
        {
          kind: "list",
          items: [
            "Corrigir o serviço;",
            "Retomar o processamento;",
            "Complementar a quantidade não entregue;",
            "Oferecer crédito, mediante concordância do cliente;",
            "Realizar reembolso total ou proporcional ao serviço que não puder ser executado.",
          ],
        },
        {
          kind: "p",
          text: "Não haverá reembolso quando a impossibilidade de execução decorrer de:",
        },
        {
          kind: "list",
          items: [
            "Perfil privado ou inacessível;",
            "Link ou nome de usuário informado incorretamente;",
            "Alteração do nome de usuário durante o processamento;",
            "Exclusão, arquivamento ou restrição da publicação;",
            "Bloqueio, suspensão ou desativação da conta;",
            "Restrições aplicadas pelo cliente;",
            "Descumprimento destes Termos;",
            "Ação ou omissão do cliente que impeça a entrega.",
          ],
        },
        {
          kind: "p",
          text: "Cada situação será analisada individualmente, conforme as evidências disponíveis e os direitos previstos na legislação.",
        },
      ],
    },
    {
      number: "13",
      title: "Oscilação das Métricas e Reposição",
      blocks: [
        {
          kind: "p",
          text: "As redes sociais realizam auditorias, atualizações e remoções periódicas que podem ocasionar oscilações nas métricas. Pequenas variações ou quedas naturais não representam, isoladamente, falha na prestação do serviço.",
        },
        {
          kind: "p",
          text: "Curtidas, visualizações, comentários, compartilhamentos, repostagens e salvamentos não possuem reposição automática, salvo quando a oferta contratada estabelecer expressamente essa garantia.",
        },
        {
          kind: "p",
          text: "Quando houver contratação separada de seguidores com garantia de reposição, serão aplicadas as condições apresentadas na respectiva oferta, incluindo prazo, modalidade e requisitos.",
        },
        {
          kind: "p",
          text: "Se a oferta indicar reposição por 30 dias, o prazo será contado a partir da conclusão da entrega. A garantia dependerá de o perfil permanecer público, ativo e sem alteração de nome de usuário.",
        },
        {
          kind: "p",
          text: "A reposição não cobrirá quedas causadas por:",
        },
        {
          kind: "list",
          items: [
            "Exclusão ou desativação da conta;",
            "Alteração do nome de usuário sem comunicação;",
            "Mudança do perfil para o modo privado;",
            "Remoção voluntária de seguidores;",
            "Contratação simultânea de serviços incompatíveis;",
            "Penalidades ou intervenções da plataforma;",
            "Descumprimento das condições da oferta.",
          ],
        },
      ],
    },
    {
      number: "14",
      title: "Responsabilidades do Cliente",
      blocks: [
        {
          kind: "p",
          text: "O cliente é responsável:",
        },
        {
          kind: "list",
          items: [
            "Pelo conteúdo publicado;",
            "Pela legitimidade da conta indicada;",
            "Pela veracidade dos dados fornecidos;",
            "Pela observância das regras das plataformas;",
            "Pelas autorizações necessárias para utilização de imagens, marcas, textos e perfis;",
            "Pela avaliação da compatibilidade do serviço com seus objetivos.",
          ],
        },
        {
          kind: "p",
          text: "É proibida a utilização dos serviços para fraude, falsidade ideológica, desinformação, assédio, discriminação, violação de direitos ou qualquer atividade ilícita.",
        },
        {
          kind: "p",
          text: "A WeCare poderá recusar, suspender ou interromper pedidos que apresentem indícios de utilização ilegal ou abusiva.",
        },
      ],
    },
    {
      number: "15",
      title: "Plataformas de Terceiros",
      blocks: [
        {
          kind: "p",
          text: "Instagram, TikTok, YouTube, Facebook, Kwai e outras redes sociais são plataformas independentes e possuem regras próprias.",
        },
        {
          kind: "p",
          text: "A WeCare não controla:",
        },
        {
          kind: "list",
          items: [
            "Atualizações de algoritmo;",
            "Auditorias das plataformas;",
            "Alterações nas políticas;",
            "Indisponibilidades técnicas;",
            "Remoções de métricas;",
            "Bloqueios, restrições ou decisões tomadas pelas plataformas.",
          ],
        },
        {
          kind: "p",
          text: "A contratação não cria vínculo entre a WeCare e as redes sociais mencionadas. A WeCare não se apresenta como representante, parceira oficial ou afiliada dessas plataformas, salvo quando houver autorização formal e expressa.",
        },
        {
          kind: "p",
          text: "O cliente reconhece que serviços de incremento de métricas podem estar sujeitos às políticas e medidas adotadas por cada plataforma e deverá avaliar essas condições antes da contratação.",
        },
      ],
    },
    {
      number: "16",
      title: "Limites de Responsabilidade",
      blocks: [
        {
          kind: "p",
          text: "A WeCare responderá pelas falhas que lhe forem legalmente atribuíveis, considerando o serviço contratado, as evidências disponíveis e a legislação aplicável.",
        },
        {
          kind: "p",
          text: "Não serão atribuídos à WeCare prejuízos causados exclusivamente por:",
        },
        {
          kind: "list",
          items: [
            "Ações ou omissões do cliente;",
            "Informações incorretas;",
            "Intervenções das plataformas;",
            "Falhas, ataques ou ações de terceiros;",
            "Eventos imprevisíveis ou tecnicamente inevitáveis;",
            "Utilização do serviço de maneira contrária a estes Termos.",
          ],
        },
        {
          kind: "p",
          text: "A WeCare não garante resultados comerciais, financeiros, orgânicos ou de monetização decorrentes da utilização dos serviços.",
        },
        {
          kind: "p",
          text: "Estes Termos não excluem responsabilidades que não possam ser afastadas pela legislação brasileira.",
        },
      ],
    },
    {
      number: "17",
      title: "Contestação de Pagamento e Chargeback",
      blocks: [
        {
          kind: "p",
          text: "Antes de abrir uma contestação ou chargeback, o cliente deverá, sempre que possível, entrar em contato com o suporte da WeCare para tentativa de solução.",
        },
        {
          kind: "p",
          text: "Em caso de contestação, a WeCare poderá encaminhar à instituição financeira ou ao provedor de pagamento os registros necessários para demonstrar:",
        },
        {
          kind: "list",
          items: [
            "A contratação;",
            "A aceitação destes Termos;",
            "A confirmação do pagamento;",
            "O início ou conclusão do serviço;",
            "As métricas entregues;",
            "As comunicações realizadas com o cliente.",
          ],
        },
        {
          kind: "p",
          text: "Contestações comprovadamente fraudulentas poderão resultar na suspensão do atendimento e na adoção das medidas cabíveis, preservado o direito do cliente de contestar cobranças efetivamente indevidas.",
        },
      ],
    },
    {
      number: "18",
      title: "Suporte e Reclamações",
      blocks: [
        {
          kind: "p",
          text: "Solicitações relacionadas a pedidos deverão ser encaminhadas por um canal oficial da WeCare, preferencialmente assim que o cliente identificar o problema.",
        },
        {
          kind: "p",
          text: "A solicitação deverá conter:",
        },
        {
          kind: "list",
          items: [
            "Nome do contratante;",
            "Identificação ou comprovante do pedido;",
            "Perfil ou publicação vinculada;",
            "Descrição do problema;",
            "Evidências disponíveis.",
          ],
        },
        {
          kind: "p",
          text: "A recomendação de contato rápido não reduz nem elimina prazos ou direitos previstos na legislação.",
        },
        {
          kind: "p",
          text: "O atendimento é realizado de segunda a sábado, das 9h às 19h, exceto feriados ou situações previamente comunicadas.",
        },
      ],
    },
    {
      number: "19",
      title: "Propriedade Intelectual",
      blocks: [
        {
          kind: "p",
          text: "A marca WeCare, sua identidade visual, seus textos, métodos, páginas, materiais, sistemas, layouts e demais conteúdos próprios são protegidos pela legislação aplicável.",
        },
        {
          kind: "p",
          text: "A contratação de um serviço não transfere ao cliente direitos sobre as marcas, os sistemas, os métodos ou os materiais pertencentes à WeCare. É proibida a reprodução ou utilização não autorizada desses elementos.",
        },
      ],
    },
    {
      number: "20",
      title: "Alterações destes Termos",
      blocks: [
        {
          kind: "p",
          text: "Estes Termos poderão ser atualizados para refletir alterações legais, técnicas, operacionais ou nos serviços oferecidos.",
        },
        {
          kind: "p",
          text: "As alterações não serão aplicadas retroativamente para prejudicar direitos já adquiridos. Quando forem relevantes para contratos recorrentes, as mudanças poderão ser comunicadas pelos canais cadastrados ou apresentadas antes do ciclo seguinte.",
        },
        {
          kind: "p",
          text: "A versão aplicável ao pedido será, em regra, aquela vigente no momento da contratação ou da renovação.",
        },
      ],
    },
    {
      number: "21",
      title: "Legislação e Foro",
      blocks: [
        {
          kind: "p",
          text: "Estes Termos são regidos pela legislação brasileira. Nos contratos de consumo, fica preservado o direito do consumidor de recorrer ao foro de seu domicílio, quando previsto na legislação.",
        },
      ],
    },
    {
      number: "22",
      title: "Identificação e Contato",
      blocks: [
        {
          kind: "p",
          text: "Agência WeCare Digital LTDA",
        },
        {
          kind: "p",
          text: "CNPJ: 26.356.036/0001-04",
        },
        {
          kind: "p",
          text: "Endereço: Rua Francisco Barreto, nº 17, sala 10, Centro, Camboriú/SC, CEP 88340-401",
        },
        {
          kind: "p",
          text: "E-mail: contato@agenciawecare.com.br",
        },
        {
          kind: "p",
          text: "WhatsApp: +55 (47) 99262-6235",
        },
        {
          kind: "p",
          text: "Atendimento: de segunda a sábado, das 9h às 19h",
        },
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  intro: [
    {
      kind: "p",
      text: "Esta Política de Privacidade explica como a Agência WeCare Digital LTDA, inscrita no CNPJ sob o nº 26.356.036/0001-04, coleta, utiliza, compartilha, armazena e protege os dados pessoais de clientes e usuários.",
    },
    {
      kind: "p",
      text: "Ao utilizar o site ou contratar os serviços da WeCare, o usuário declara estar ciente das práticas descritas nesta Política.",
    },
  ],
  sections: [
    {
      number: "1",
      title: "Identificação do Controlador",
      blocks: [
        {
          kind: "p",
          text: "A Agência WeCare Digital LTDA atua como controladora dos dados pessoais tratados no contexto de suas atividades.",
        },
        {
          kind: "p",
          text: "Razão social: Agência WeCare Digital LTDA",
        },
        {
          kind: "p",
          text: "CNPJ: 26.356.036/0001-04",
        },
        {
          kind: "p",
          text: "Endereço: Rua Francisco Barreto, nº 17, sala 10, Centro, Camboriú/SC, CEP 88340-401",
        },
        {
          kind: "p",
          text: "E-mail de privacidade: contato@agenciawecare.com.br",
        },
        {
          kind: "p",
          text: "WhatsApp: +55 (47) 99262-6235",
        },
      ],
    },
    {
      number: "2",
      title: "Dados que Podemos Coletar",
      blocks: [
        {
          kind: "p",
          text: "Dependendo da utilização do site e da contratação realizada, poderemos coletar:",
        },
        {
          kind: "list",
          items: [
            "Nome;",
            "E-mail;",
            "Telefone e WhatsApp;",
            "CPF ou CNPJ, quando necessário;",
            "Endereço e dados de faturamento;",
            "Nome de usuário das redes sociais;",
            "Links de perfis e publicações;",
            "Informações sobre o plano contratado;",
            "Histórico de pedidos e atendimento;",
            "Comprovantes e situação do pagamento;",
            "Endereço IP, data e horário de acesso;",
            "Informações sobre dispositivo e navegador;",
            "Cookies e dados de navegação;",
            "Comunicações realizadas com o suporte.",
          ],
        },
        {
          kind: "p",
          text: "Dados de cartão poderão ser processados diretamente por instituições financeiras e provedores de pagamento. A WeCare poderá não ter acesso ao número completo do cartão.",
        },
      ],
    },
    {
      number: "3",
      title: "Finalidades do Tratamento",
      blocks: [
        {
          kind: "p",
          text: "Os dados pessoais poderão ser utilizados para:",
        },
        {
          kind: "list",
          items: [
            "Identificar o cliente;",
            "Registrar e processar pedidos;",
            "Executar os serviços contratados;",
            "Processar e confirmar pagamentos;",
            "Prestar atendimento e suporte;",
            "Emitir documentos fiscais;",
            "Enviar informações sobre a execução do serviço;",
            "Prevenir fraude e uso indevido;",
            "Cumprir obrigações legais e regulatórias;",
            "Exercer direitos em processos administrativos ou judiciais;",
            "Aprimorar o site e os serviços;",
            "Produzir registros de segurança;",
            "Enviar comunicações comerciais, quando permitido.",
          ],
        },
      ],
    },
    {
      number: "4",
      title: "Bases Legais",
      blocks: [
        {
          kind: "p",
          text: "O tratamento dos dados poderá ocorrer, conforme a situação, para:",
        },
        {
          kind: "list",
          items: [
            "Execução de contrato ou procedimentos relacionados à contratação;",
            "Cumprimento de obrigação legal ou regulatória;",
            "Exercício regular de direitos;",
            "Proteção do crédito e prevenção de fraude;",
            "Atendimento a interesses legítimos da WeCare ou de terceiros;",
            "Cumprimento de consentimento fornecido pelo titular;",
            "Atendimento de outras hipóteses autorizadas pela legislação.",
          ],
        },
        {
          kind: "p",
          text: "Quando o tratamento depender de consentimento, o titular poderá solicitar sua revogação, sem afetar os tratamentos anteriormente realizados de maneira válida.",
        },
      ],
    },
    {
      number: "5",
      title: "Compartilhamento dos Dados",
      blocks: [
        {
          kind: "p",
          text: "Os dados poderão ser compartilhados, na medida necessária, com:",
        },
        {
          kind: "list",
          items: [
            "Provedores de pagamento e instituições financeiras;",
            "Empresas de hospedagem e infraestrutura;",
            "Sistemas de atendimento e comunicação;",
            "Prestadores envolvidos na execução operacional;",
            "Serviços de análise, segurança e prevenção de fraude;",
            "Contadores, advogados e consultores;",
            "Autoridades públicas, quando houver obrigação legal ou ordem válida.",
          ],
        },
        {
          kind: "p",
          text: "Os fornecedores deverão receber somente os dados necessários para suas respectivas atividades. A WeCare não comercializa dados pessoais como produto independente.",
        },
      ],
    },
    {
      number: "6",
      title: "Perfis e Conteúdos Públicos",
      blocks: [
        {
          kind: "p",
          text: "Para executar os serviços contratados, poderá ser necessário acessar informações publicamente disponíveis no perfil indicado pelo cliente, como nome de usuário, biografia, fotografias públicas, vídeos, publicações, métricas visíveis e links fornecidos.",
        },
        {
          kind: "p",
          text: "O cliente deverá garantir que possui autorização para indicar o perfil ou conteúdo apresentado no pedido. A WeCare não solicitará a senha da rede social para realizar os serviços descritos nos Termos de Uso.",
        },
      ],
    },
    {
      number: "7",
      title: "Cookies",
      blocks: [
        {
          kind: "p",
          text: "O site poderá utilizar cookies e tecnologias semelhantes para garantir o funcionamento das páginas, manter preferências, analisar acessos, medir desempenho, prevenir fraude, melhorar a experiência do usuário e personalizar comunicações, quando permitido.",
        },
        {
          kind: "p",
          text: "Cookies não essenciais poderão depender da escolha do usuário, conforme as opções apresentadas no site. O usuário poderá administrá-los nas configurações do navegador. O bloqueio de determinados cookies poderá limitar algumas funcionalidades.",
        },
      ],
    },
    {
      number: "8",
      title: "Armazenamento e Retenção",
      blocks: [
        {
          kind: "p",
          text: "Os dados serão armazenados durante o período necessário para executar o contrato, prestar atendimento, manter registros de pedidos, cumprir obrigações fiscais, legais e regulatórias, prevenir fraude, exercer direitos e atender às finalidades informadas nesta Política.",
        },
        {
          kind: "p",
          text: "Após o encerramento da finalidade, os dados poderão ser eliminados ou anonimizados, salvo quando sua conservação for permitida ou exigida pela legislação.",
        },
      ],
    },
    {
      number: "9",
      title: "Segurança dos Dados",
      blocks: [
        {
          kind: "p",
          text: "A WeCare adotará medidas técnicas e administrativas razoáveis para proteger os dados contra acessos não autorizados, destruição, perda, alteração, divulgação indevida ou utilização irregular.",
        },
        {
          kind: "p",
          text: "Nenhum ambiente digital é totalmente imune a incidentes. Caso ocorra uma situação relevante envolvendo dados pessoais, a WeCare adotará as providências exigidas pela legislação.",
        },
      ],
    },
    {
      number: "10",
      title: "Transferência Internacional",
      blocks: [
        {
          kind: "p",
          text: "Alguns fornecedores de hospedagem, atendimento, análise, comunicação, segurança ou pagamento poderão armazenar ou processar dados fora do Brasil.",
        },
        {
          kind: "p",
          text: "Quando houver transferência internacional de dados, serão adotadas as medidas e salvaguardas aplicáveis para sua proteção.",
        },
      ],
    },
    {
      number: "11",
      title: "Direitos do Titular",
      blocks: [
        {
          kind: "p",
          text: "Nos termos da legislação aplicável, o titular poderá solicitar:",
        },
        {
          kind: "list",
          items: [
            "Confirmação da existência de tratamento;",
            "Acesso aos dados;",
            "Correção de dados incompletos, incorretos ou desatualizados;",
            "Anonimização, bloqueio ou eliminação, quando cabível;",
            "Portabilidade, conforme regulamentação;",
            "Informações sobre compartilhamentos;",
            "Revogação do consentimento;",
            "Revisão de decisões automatizadas, quando aplicável;",
            "Oposição ao tratamento realizado em desconformidade com a legislação.",
          ],
        },
        {
          kind: "p",
          text: "A WeCare poderá solicitar a confirmação da identidade do requerente para proteger os dados do próprio titular. Algumas informações poderão ser mantidas após uma solicitação de eliminação quando sua conservação for necessária ou autorizada por lei.",
        },
      ],
    },
    {
      number: "12",
      title: "Comunicações Comerciais",
      blocks: [
        {
          kind: "p",
          text: "A WeCare poderá enviar comunicações sobre serviços, novidades, conteúdos e ofertas dentro dos limites permitidos pela legislação.",
        },
        {
          kind: "p",
          text: "O titular poderá solicitar o cancelamento dessas comunicações pelos canais disponibilizados. Mensagens necessárias para execução de pedidos, segurança, cobrança, suporte ou cumprimento de obrigações poderão continuar sendo enviadas.",
        },
      ],
    },
    {
      number: "13",
      title: "Dados de Crianças e Adolescentes",
      blocks: [
        {
          kind: "p",
          text: "Os serviços não são destinados à contratação direta por crianças.",
        },
        {
          kind: "p",
          text: "Caso a contratação envolva dados de criança ou adolescente, o responsável deverá possuir autoridade legal e observar as exigências aplicáveis. Ao identificar tratamento irregular, a WeCare poderá solicitar informações adicionais, suspender a execução ou eliminar os dados, quando cabível.",
        },
      ],
    },
    {
      number: "14",
      title: "Links e Plataformas de Terceiros",
      blocks: [
        {
          kind: "p",
          text: "O site poderá conter links para redes sociais, sistemas de pagamento ou páginas administradas por terceiros.",
        },
        {
          kind: "p",
          text: "Esses ambientes possuem políticas próprias. A WeCare não controla o tratamento realizado diretamente por terceiros fora de seus serviços. O usuário deverá consultar as políticas de privacidade dos respectivos serviços antes de fornecer seus dados.",
        },
      ],
    },
    {
      number: "15",
      title: "Alterações desta Política",
      blocks: [
        {
          kind: "p",
          text: "Esta Política poderá ser atualizada para refletir alterações legais, técnicas ou operacionais. A data da versão mais recente será indicada no início do documento.",
        },
        {
          kind: "p",
          text: "Quando as alterações forem relevantes, a WeCare poderá comunicá-las pelos canais disponíveis ou apresentar a nova versão no site.",
        },
      ],
    },
    {
      number: "16",
      title: "Canal de Privacidade",
      blocks: [
        {
          kind: "p",
          text: "Para exercer seus direitos ou esclarecer dúvidas relacionadas ao tratamento de dados pessoais, o titular poderá entrar em contato:",
        },
        {
          kind: "p",
          text: "Agência WeCare Digital LTDA",
        },
        {
          kind: "p",
          text: "CNPJ: 26.356.036/0001-04",
        },
        {
          kind: "p",
          text: "Endereço: Rua Francisco Barreto, nº 17, sala 10, Centro, Camboriú/SC, CEP 88340-401",
        },
        {
          kind: "p",
          text: "E-mail: contato@agenciawecare.com.br",
        },
        {
          kind: "p",
          text: "WhatsApp: +55 (47) 99262-6235",
        },
        {
          kind: "p",
          text: "Atendimento: de segunda a sábado, das 9h às 19h",
        },
      ],
    },
  ],
};
