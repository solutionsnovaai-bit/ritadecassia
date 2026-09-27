/**
 * Todo o texto do site mora aqui. Trocou um dado da Rita? Troca só neste arquivo.
 *
 * Campos vazios ('') não aparecem no site. Assim nada fica com cara de "a preencher".
 * Pendentes para publicar: cidade/atendimento, instagram e horário.
 */
export const RITA = {
  nome: 'Rita',
  marca: 'Rita de Cássia',
  descritor: 'Massoterapia e Estética',
  assinatura: 'Onde os nós do dia se desfazem.',
  slogan: 'Cuidado que renova, beleza que floresce.',

  /** WhatsApp só com números, com 55 + DDD. Ex.: '5511999998888'. */
  whatsapp: '5511959424884',
  /** Como o número aparece escrito no site. Ex.: '(11) 99999-8888'. */
  whatsappExibicao: '(11) 95942-4884',

  /** Link completo do perfil. Ex.: 'https://www.instagram.com/usuario/' */
  instagram: '',
  /** Ex.: '@usuario' */
  instagramHandle: '',

  /** Onde a Rita atende. Ex.: 'Vila Mariana, São Paulo/SP' ou 'Atendimento a domicílio em Santo André' */
  atendimento: '',
  /** Link do Google Maps, se houver endereço fixo. */
  mapa: '',
  /** Ex.: 'Segunda a sábado, das 9h às 20h' */
  horario: '',

  /** Anos de experiência. Deixe null para não mostrar o selo. */
  anosExperiencia: null as number | null,
}

export const MENSAGENS = {
  padrao: `Olá, ${RITA.nome}! Vim pelo site e quero agendar uma sessão.`,
  terapia: (terapia: string) => `Olá, ${RITA.nome}! Vim pelo site e quero agendar: ${terapia}. Quais horários você tem?`,
  pedras: `Olá, ${RITA.nome}! Vim pelo site e quero sentir a massagem com pedras quentes. Quais horários você tem?`,
  tratamento: (t: string) => `Olá, ${RITA.nome}! Vim pelo site e quero saber mais sobre: ${t}. Pode me passar os detalhes?`,
  duvida: `Olá, ${RITA.nome}! Vim pelo site e tenho uma dúvida antes de agendar.`,
  escolher: `Olá, ${RITA.nome}! Vim pelo site e queria ajuda para escolher a melhor terapia para mim.`,
  primeira: `Olá, ${RITA.nome}! Vim pelo site e quero marcar a minha primeira sessão.`,
  conhecer: `Olá, ${RITA.nome}! Vim pelo site e quero conhecer as terapias e os tratamentos. Pode me contar?`,
}

export const NAV = [
  { id: 'terapias', nome: 'Terapias' },
  { id: 'pedras-quentes', nome: 'Pedras quentes' },
  { id: 'estetica', nome: 'Estética' },
  { id: 'a-sessao', nome: 'A sessão' },
  { id: 'sobre', nome: 'Sobre' },
  { id: 'duvidas', nome: 'Dúvidas' },
] as const

export const HERO = {
  sobretitulo: 'Massoterapia especializada',
  linha: 'Deixe o corpo',
  palavras: ['soltar.', 'respirar.', 'aquecer.', 'desacelerar.'],
  texto: 'Massagem relaxante, pedras quentes, drenagem e reflexologia com o toque de quem é especialista em desfazer os nós que o dia deixa no corpo.',
  cta: 'Agendar minha sessão',
  secundario: 'Tirar uma dúvida',
  legenda: 'O toque que desacelera.',
  rolar: 'Role devagar',
}

export const COMPROMISSOS = [
  { titulo: 'Atendimento individual', texto: 'uma pessoa, uma sessão, toda a atenção.' },
  { titulo: 'Técnica sob medida', texto: 'para o que o seu corpo pede hoje.' },
  { titulo: 'Agendamento direto', texto: 'pelo WhatsApp, sem complicação.' },
]

export const INTRO = {
  sobretitulo: 'O que o corpo guarda',
  titulo: ['Há cansaços que', 'uma noite de sono'],
  destaque: 'não resolve.',
  nos: ['O ombro que sobe sem você perceber.', 'A mandíbula travada no trânsito.', 'As costas que carregam a semana inteira.'],
  texto: 'A massoterapia é o tempo que o corpo precisa para soltar o que a mente segurou. Um intervalo em que ninguém te pede nada e as mãos certas fazem o resto.',
  link: 'Encontre a sua terapia',
}

export const FAIXA = [
  ['Soltar', 'os ombros.'],
  ['Respirar', 'fundo.'],
  ['Aquecer', 'o corpo.'],
  ['Desacelerar', 'a mente.'],
  ['Sentir', 'de novo.'],
] as const

export type Terapia = {
  id: 'relaxante' | 'pedras' | 'drenagem' | 'reflexologia' | 'escalda'
  nome: string
  resumo: string
  texto: string
  ideal: string[]
  destaque?: string
  tema: 'areia' | 'basalto' | 'linho' | 'argila' | 'folha'
}

export const TERAPIAS_INTRO = {
  sobretitulo: 'Terapias',
  titulo: 'Cada corpo pede',
  destaque: 'um tipo de cuidado.',
  texto: 'Nem todo resultado se mede em antes e depois. Alguns se sentem: no corpo mais leve, na mente mais quieta, no dia que termina melhor do que começou.',
}

export const TERAPIAS: Terapia[] = [
  {
    id: 'relaxante',
    nome: 'Massagem relaxante',
    resumo: 'Uma pausa para o corpo desacelerar e a mente respirar.',
    texto: 'Manobras lentas, contínuas e envolventes que baixam o volume do corpo inteiro. Para dias corridos, noites mal dormidas e aquela tensão que ninguém vê, mas você sente.',
    ideal: ['Estresse do dia a dia', 'Sono agitado', 'Tensão nos ombros'],
    tema: 'areia',
  },
  {
    id: 'pedras',
    nome: 'Pedras quentes',
    resumo: 'O calor que dissolve tensões profundas e devolve o conforto ao corpo.',
    texto: 'Pedras de basalto aquecidas deslizam com óleo sobre a musculatura. O calor chega onde a mão sozinha não alcança, e o corpo cede sem esforço.',
    ideal: ['Contraturas profundas', 'Corpo frio e travado', 'Relaxamento intenso'],
    destaque: 'Em destaque',
    tema: 'basalto',
  },
  {
    id: 'drenagem',
    nome: 'Drenagem linfática',
    resumo: 'Leveza para quem sente o corpo inchado e as pernas pesadas.',
    texto: 'Movimentos suaves e ritmados que acompanham o caminho natural da linfa. Ajuda a aliviar a sensação de inchaço e a retenção de líquido.',
    ideal: ['Sensação de inchaço', 'Pernas pesadas', 'Rotina muito parada'],
    tema: 'linho',
  },
  {
    id: 'reflexologia',
    nome: 'Reflexologia',
    resumo: 'Estímulos nos pés que convidam o corpo inteiro a relaxar.',
    texto: 'Pressões precisas em pontos dos pés, num ritmo que acalma de dentro para fora. Silenciosa, profunda e surpreendentemente tranquilizante.',
    ideal: ['Mente acelerada', 'Cansaço acumulado', 'Quem prefere toque suave'],
    tema: 'argila',
  },
  {
    id: 'escalda',
    nome: 'Escalda-pés',
    resumo: 'Ritual de calor e aromas para encerrar o dia mais leve.',
    texto: 'Água morna, sais e aromas para os pés que sustentam você o dia inteiro. Um ritual simples, e justamente por isso tão profundo.',
    ideal: ['Fim de dia', 'Pés cansados', 'Momento de autocuidado'],
    tema: 'folha',
  },
]

export const PALAVRAS_TRATAMENTOS = ['Criolipólise', 'Jato de plasma', 'Drenagem linfática', 'Microcorrente', 'Microagulhamento', 'Massagem modeladora', 'Limpeza de pele', 'Depilação a laser', 'Vácuo terapia', 'Alta frequência', 'LED azul capilar', 'Nanotecnologia capilar']

export const ESTETICA = {
  sobretitulo: 'Estética feminina · Nosso espaço',
  titulo: 'Cuidado que renova,',
  destaque: 'beleza que floresce.',
  texto: `No espaço da ${RITA.marca}, a massoterapia divide lugar com tratamentos de estética feminina para pele, corpo e cabelos.`,
  cta: 'Quero saber mais',
  itens: [
    { nome: 'Criolipólise', detalhe: '' },
    { nome: 'Jato de plasma', detalhe: '' },
    { nome: 'Drenagem linfática', detalhe: '' },
    { nome: 'Microcorrente', detalhe: '' },
    { nome: 'Nanotecnologia capilar', detalhe: '' },
    { nome: 'Alta frequência', detalhe: 'Facial e corporal' },
    { nome: 'Microagulhamento', detalhe: '' },
    { nome: 'Massagem modeladora', detalhe: '' },
    { nome: 'Limpeza de pele', detalhe: '' },
    { nome: 'Depilação a laser', detalhe: '' },
    { nome: 'Vácuo terapia', detalhe: '' },
    { nome: 'Tratamento capilar com LED azul', detalhe: 'Nutrição, reconstrução, fortalecimento e desenborrachamento' },
  ],
}

export const PEDRAS = {
  sobretitulo: 'Em destaque · Pedras quentes',
  titulo: ['O calor chega', 'onde a mão'],
  destaque: 'não alcança.',
  lead: 'Basalto vulcânico, óleo morno e mãos que conhecem o caminho. A massagem com pedras quentes é o jeito mais profundo de convencer um músculo a soltar.',
  etapas: [
    { nome: 'Aquecer', texto: 'As pedras de basalto aquecem em água, na temperatura certa para o conforto da pele. Antes de tocar você, cada uma é testada.' },
    { nome: 'Deslizar', texto: 'Com óleo, as pedras deslizam pela musculatura. O calor amolece as fibras e prepara o corpo para receber pressão sem resistência.' },
    { nome: 'Repousar', texto: 'Algumas pedras descansam em pontos-chave enquanto as mãos seguem o trabalho. É aqui que o corpo, finalmente, se entrega.' },
  ],
  nota: 'Calor acolhedor, nunca desconfortável. Se estiver quente demais, é só falar.',
  cta: 'Quero sentir esse calor',
}

export const SESSAO = {
  sobretitulo: 'A sessão, do começo ao fim',
  titulo: 'Cuidado começa',
  destaque: 'antes da maca.',
  apoio: 'Você participa de cada escolha. A técnica se ajusta a você, não o contrário.',
  etapas: [
    {
      titulo: 'Você conta',
      rotulo: 'Primeiro, a escuta.',
      texto: 'Onde dói, como você tem dormido, o que o seu dia anda cobrando. É essa conversa que dá direção à sessão.',
      pontos: ['Escuta sem pressa', 'Atenção a dores e limitações', 'Escolha da terapia ideal'],
    },
    {
      titulo: 'O corpo desliga',
      rotulo: 'Um momento só seu.',
      texto: 'Respiração mais lenta, óleo morno, o celular longe. O corpo entende rápido quando pode baixar a guarda.',
      pontos: ['Óleo morno e toalhas limpas', 'Pressão combinada com você', 'Seu conforto em primeiro lugar'],
    },
    {
      titulo: 'As mãos trabalham',
      rotulo: 'Técnica que se adapta.',
      texto: 'Ritmo, pressão e manobras ajustados ao seu corpo, naquele dia. Mais leve ou mais firme, é só pedir.',
      pontos: ['Manobras sob medida', 'Pressão ajustada na hora', 'Foco nos pontos de tensão'],
    },
    {
      titulo: 'A leveza fica',
      rotulo: 'O efeito continua.',
      texto: 'No fim, orientações simples para prolongar o bem-estar: água, movimento leve e descanso. E a próxima pausa já pode ficar marcada.',
      pontos: ['Orientações pós-sessão', 'Cuidados para o dia a dia', 'Próxima sessão, se você quiser'],
    },
  ],
}

export const SENSACOES = {
  sobretitulo: 'O que muda',
  titulo: 'Você chega de um jeito.',
  destaque: 'Sai de outro.',
  instrucao: 'Arraste a linha e sinta a diferença.',
  chega: ['Ombros colados nas orelhas', 'Mandíbula travada', 'Respiração curta', 'Cabeça a mil', 'Pernas pesadas', 'Corpo em alerta'],
  sai: ['Ombros no lugar', 'Rosto solto', 'Respiração longa', 'Mente quieta', 'Pernas leves', 'Corpo em paz'],
  nota: 'Cada corpo responde no seu tempo. Estas são as sensações mais comuns depois de uma boa sessão.',
}

export const SOBRE = {
  sobretitulo: 'Quem cuida de você',
  titulo: 'Mãos treinadas.',
  destaque: 'Escuta atenta.',
  lead: `${RITA.nome} é massoterapeuta especialista e trata cada sessão como única, porque cada corpo chega carregando uma história diferente.`,
  texto: 'Relaxante, pedras quentes, drenagem, reflexologia: a técnica muda, o cuidado não. Antes de tocar, ela escuta. Durante, observa. No fim, orienta, para que a leveza dure mais do que a sessão.',
  principios: [
    { titulo: 'Escuta antes do toque', texto: 'A sessão começa entendendo o que você sente.' },
    { titulo: 'Técnica sob medida', texto: 'Pressão e ritmo pensados para o seu corpo.' },
    { titulo: 'Cuidado que continua', texto: 'Orientações para a leveza durar mais.' },
  ],
  frase: ['Onde os nós do dia', 'se desfazem.'],
  link: 'Agendar com a Rita',
}

export const GALERIA = {
  sobretitulo: 'O espaço',
  titulo: 'Um lugar para',
  destaque: 'baixar a guarda.',
}

export const DUVIDAS = {
  sobretitulo: 'Sem dúvidas pelo caminho',
  titulo: ['Relaxar também', 'é saber o que'],
  destaque: 'esperar.',
  link: 'Perguntar pelo WhatsApp',
  itens: [
    {
      pergunta: 'Nunca fiz massagem. Qual terapia escolho?',
      resposta: 'Tudo bem não saber. Conte como o seu corpo está e o que você espera sentir, e a Rita indica o melhor começo. Para uma primeira vez, a massagem relaxante costuma ser uma ótima porta de entrada.',
    },
    {
      pergunta: 'A massagem com pedras quentes queima?',
      resposta: 'Não deve queimar. As pedras são aquecidas em temperatura controlada e testadas antes de tocar a pele, e a intensidade do calor é combinada com você durante toda a sessão.',
    },
    {
      pergunta: 'Existe alguma contraindicação?',
      resposta: 'Algumas situações pedem cuidado ou liberação médica, como febre, infecções, feridas ou lesões na pele, trombose, varizes importantes, gestação e alterações de sensibilidade. Por isso toda sessão começa com uma conversa. A massoterapia complementa, mas não substitui, o acompanhamento médico.',
    },
    {
      pergunta: 'Quanto tempo dura uma sessão?',
      resposta: 'A duração muda conforme a terapia escolhida. Na hora de agendar, você recebe todos os detalhes: tempo, preparo e valores.',
    },
    {
      pergunta: 'Com que frequência vale a pena fazer?',
      resposta: 'Depende do objetivo. Para manter o bem-estar, muita gente gosta de uma pausa a cada quinze dias ou uma vez por mês; em fases mais tensas, sessões mais próximas ajudam. A Rita orienta conforme o que o seu corpo mostrar.',
    },
    {
      pergunta: 'Como faço para agendar?',
      resposta: 'Pelo WhatsApp. Escolha a terapia, diga os melhores dias e horários, e a Rita confirma com você.',
    },
  ],
}

export const AGENDAR = {
  sobretitulo: 'Sua pausa começa aqui',
  titulo: 'O corpo já pediu.',
  destaque: 'Agora é só marcar.',
  texto: 'Escolha a terapia e o melhor período. A mensagem fica pronta para você enviar no WhatsApp.',
  passos: { terapia: 'Qual terapia?', periodo: 'Melhor período', nome: 'Seu nome' },
  naoSei: 'Ainda não sei',
  estetica: 'Tratamento estético',
  periodos: ['Manhã', 'Tarde', 'Noite', 'Tanto faz'],
  nomePlaceholder: 'Como você gosta de ser chamada(o)?',
  botao: 'Enviar pelo WhatsApp',
  aviso: 'Você confere a mensagem no WhatsApp antes de enviar.',
}

export const RODAPE = {
  legal: 'A massoterapia complementa, mas não substitui, o acompanhamento médico.',
  credito: 'Site desenvolvido por Nova AI Solutions',
}

export const SEO = {
  titulo: `${RITA.marca} · ${RITA.descritor} | Massagem relaxante, pedras quentes e estética`,
  descricao: `${RITA.marca}: massagem relaxante, pedras quentes, drenagem linfática, reflexologia, escalda-pés e tratamentos de estética feminina. Agende pelo WhatsApp (11) 95942-4884.`,
}
