/**
 * Todo o texto do site mora aqui. Trocou um dado? Troca só neste arquivo.
 *
 * Campos vazios ('') não aparecem no site. Assim nada fica com cara de "a preencher".
 * Pendentes para publicar: cidade/atendimento, instagram e horário.
 */
export const RITA = {
  nome: 'Rita',
  marca: 'Rita de Cássia',
  descritor: 'Estética Feminina',
  assinatura: 'Um momento só seu.',
  slogan: 'Cuidado que renova, beleza que floresce.',

  /** WhatsApp só com números, com 55 + DDD. */
  whatsapp: '5511959424884',
  /** Como o número aparece escrito no site. */
  whatsappExibicao: '(11) 95942-4884',

  /** Link completo do perfil. Ex.: 'https://www.instagram.com/usuario/' */
  instagram: '',
  /** Ex.: '@usuario' */
  instagramHandle: '',

  /** Onde fica o espaço. Ex.: 'Vila Mariana, São Paulo/SP' */
  atendimento: '',
  /** Link do Google Maps, se houver endereço fixo. */
  mapa: '',
  /** Ex.: 'Segunda a sábado, das 9h às 20h' */
  horario: '',

  /** Anos de experiência. Deixe null para não mostrar o selo. */
  anosExperiencia: null as number | null,
}

const ola = `Olá, ${RITA.nome}! Vim pelo site`
const VALE_EXPERIENCIA = 'Sessão de Massagem Relaxante com Pedras'

export const MENSAGENS = {
  padrao: `${ola} e quero agendar um horário.`,
  avaliacao: `${ola} e quero agendar uma avaliação.`,
  area: (area: string) => `${ola} e quero agendar uma avaliação de ${area.toLowerCase()}. Quais horários você tem?`,
  tratamento: (t: string) => `${ola} e quero saber mais sobre ${t.toLowerCase()}. Pode me passar os detalhes?`,
  massagem: (t = 'uma massagem') => `${ola} e quero agendar ${t.toLowerCase()}. Quais horários você tem?`,
  promo: `${ola} e quero aproveitar a promoção de outubro. Como funciona?`,
  duvida: `${ola} e tenho uma dúvida antes de agendar.`,
  escolher: `${ola} e queria ajuda para escolher o melhor tratamento para mim.`,
  /** Vale-presente: `para` já vem com artigo ("a minha esposa"); `nome` é opcional. */
  presente: (para = '', nome = '') => {
    if (para === 'mim mesma') return `${ola} e quero me dar de presente a ${VALE_EXPERIENCIA}. Quais horários você tem?`
    const quem = [para, nome].filter(Boolean).join(', ')
    return `${ola} e quero dar um vale-presente da ${VALE_EXPERIENCIA}${quem ? ` para ${quem}` : ''}. Como funciona?`
  },
  presenteEstetica: `${ola} e quero dar de presente um tratamento de estética. Quais opções você tem?`,
}

export const NAV = [
  { id: 'tratamentos', nome: 'Tratamentos' },
  { id: 'menu', nome: 'Menu completo' },
  { id: 'massagem', nome: 'Massagem' },
  { id: 'como-funciona', nome: 'Como funciona' },
  { id: 'sobre', nome: 'Sobre' },
  { id: 'vale-presente', nome: 'Vale presente' },
  { id: 'duvidas', nome: 'Dúvidas' },
] as const

export const HERO = {
  sobretitulo: 'Estética feminina',
  linha: 'Beleza que',
  palavras: ['floresce.', 'renova.', 'se revela.', 'é sua.'],
  texto: 'Criolipólise, microagulhamento, limpeza de pele, depilação a laser e tratamentos capilares, com avaliação individual e um cuidado que acompanha você até o resultado.',
  cta: 'Agendar minha avaliação',
  secundario: 'Tirar uma dúvida',
  rolar: 'Role devagar',
}

export const COMPROMISSOS = [
  { titulo: 'Avaliação individual', texto: 'antes de qualquer tratamento.' },
  { titulo: 'Rosto, corpo e cabelos', texto: 'num só espaço, feito para você.' },
  { titulo: 'Agendamento direto', texto: 'pelo WhatsApp, sem complicação.' },
]

export const INTRO = {
  sobretitulo: 'O que o espelho conta',
  titulo: ['Pequenos detalhes', 'mudam o jeito'],
  destaque: 'de se ver.',
  nos: ['A pele que perdeu o viço.', 'A gordurinha que insiste em ficar.', 'Os fios que pedem mais cuidado.'],
  texto: 'A estética certa não transforma você em outra pessoa: devolve o brilho do que já é seu. Cada tratamento começa com uma avaliação honesta e um plano pensado para o seu momento.',
  link: 'Quero uma avaliação',
}

export const FAIXA = [
  ['Renovar', 'a pele.'],
  ['Modelar', 'o corpo.'],
  ['Fortalecer', 'os fios.'],
  ['Realçar', 'o que é seu.'],
  ['Florescer', 'de novo.'],
] as const

export type Area = {
  id: 'rosto' | 'corpo' | 'cabelos' | 'laser'
  nome: string
  resumo: string
  texto: string
  tratamentos: string[]
  tema: 'areia' | 'basalto' | 'linho' | 'argila' | 'folha'
}

export const AREAS_INTRO = {
  sobretitulo: 'Tratamentos',
  titulo: 'Cada pele pede',
  destaque: 'um tipo de cuidado.',
  texto: 'Tratamentos de estética feminina para rosto, corpo e cabelos, sempre indicados depois de uma avaliação individual. Toque em um tratamento para saber mais.',
}

export const AREAS: Area[] = [
  {
    id: 'rosto',
    nome: 'Pele e rosto',
    resumo: 'Viço, textura e luminosidade para a pele que você mostra todo dia.',
    texto: 'Da limpeza profunda ao estímulo de colágeno, cada protocolo é escolhido depois de olhar de perto para a sua pele: textura, manchas, poros e o que você quer realçar.',
    tratamentos: ['Limpeza de pele', 'Microagulhamento', 'Jato de plasma', 'Microcorrente', 'Alta frequência facial'],
    tema: 'linho',
  },
  {
    id: 'corpo',
    nome: 'Corpo e contorno',
    resumo: 'Menos medidas teimosas, mais leveza no espelho e na roupa.',
    texto: 'Tecnologias e manobras para gordura localizada, retenção e contorno, combinadas num plano feito para o seu corpo e o seu ritmo.',
    tratamentos: ['Criolipólise', 'Vácuo terapia', 'Massagem modeladora', 'Drenagem linfática', 'Alta frequência corporal'],
    tema: 'areia',
  },
  {
    id: 'cabelos',
    nome: 'Cabelos',
    resumo: 'Força, brilho e maciez de volta aos fios.',
    texto: 'Nutrição, reconstrução, fortalecimento e desenborrachamento, com nanotecnologia e luz de LED azul para tratar o fio de dentro para fora.',
    tratamentos: ['Nanotecnologia capilar', 'Tratamento capilar com LED azul'],
    tema: 'argila',
  },
  {
    id: 'laser',
    nome: 'Depilação a laser',
    resumo: 'Menos lâmina, menos cera, mais liberdade.',
    texto: 'Sessões rápidas, pele mais lisinha a cada etapa e acompanhamento de perto, do planejamento à manutenção.',
    tratamentos: ['Depilação a laser'],
    tema: 'basalto',
  },
]

export const PALAVRAS_TRATAMENTOS = ['Criolipólise', 'Jato de plasma', 'Drenagem linfática', 'Microcorrente', 'Microagulhamento', 'Massagem modeladora', 'Limpeza de pele', 'Depilação a laser', 'Vácuo terapia', 'Alta frequência', 'LED azul capilar', 'Nanotecnologia capilar']

export type Categoria = 'Rosto' | 'Corpo' | 'Cabelos' | 'Laser'

export const MENU = {
  sobretitulo: 'Nosso espaço · Menu completo',
  titulo: 'Tudo o que',
  destaque: 'o espaço oferece.',
  texto: `Os tratamentos de estética feminina da ${RITA.marca}, do rosto aos fios. Filtre por área e toque para conversar pelo WhatsApp.`,
  todos: 'Todos',
  cta: 'Quero saber mais',
  itens: [
    { nome: 'Criolipólise', detalhe: '', categoria: 'Corpo' },
    { nome: 'Jato de plasma', detalhe: '', categoria: 'Rosto' },
    { nome: 'Drenagem linfática', detalhe: '', categoria: 'Corpo' },
    { nome: 'Microcorrente', detalhe: '', categoria: 'Rosto' },
    { nome: 'Nanotecnologia capilar', detalhe: '', categoria: 'Cabelos' },
    { nome: 'Alta frequência', detalhe: 'Facial e corporal', categoria: 'Rosto' },
    { nome: 'Microagulhamento', detalhe: '', categoria: 'Rosto' },
    { nome: 'Massagem modeladora', detalhe: '', categoria: 'Corpo' },
    { nome: 'Limpeza de pele', detalhe: '', categoria: 'Rosto' },
    { nome: 'Depilação a laser', detalhe: '', categoria: 'Laser' },
    { nome: 'Vácuo terapia', detalhe: '', categoria: 'Corpo' },
    { nome: 'Tratamento capilar com LED azul', detalhe: 'Nutrição, reconstrução, fortalecimento e desenborrachamento', categoria: 'Cabelos' },
  ] as { nome: string; detalhe: string; categoria: Categoria }[],
}

/** Promoção do panfleto. Some sozinha do site depois de `validaAte` (horário de Brasília). */
export const PROMO = {
  ativa: true,
  validaAte: '2026-10-31T23:59:59-03:00',
  selo: 'Promoção de outubro',
  titulo: 'Promoção de Outubro',
  linhas: ['2 sessões por semana, durante 3 meses.', 'Válido apenas para o mês de outubro.'],
  moeda: 'R$',
  valor: '300',
  unidade: '/mês',
  cta: 'Quero aproveitar',
  chamada: 'Agende seu horário e reserve um momento só seu.',
}

export const MASSAGEM = {
  sobretitulo: 'Também no espaço · Massagem',
  titulo: ['O calor chega', 'onde a mão'],
  destaque: 'não alcança.',
  lead: 'Para completar o cuidado com o corpo: massagens que modelam, desincham e relaxam, com óleo morno e, quando você quiser, o calor das pedras de basalto.',
  tipos: ['Massagem relaxante com pedras', 'Massagem modeladora', 'Drenagem linfática'],
  etapas: [
    { nome: 'Aquecer', texto: 'As pedras de basalto aquecem em água, na temperatura certa para o conforto da pele. Antes de tocar você, cada uma é testada.' },
    { nome: 'Deslizar', texto: 'Com óleo, as pedras deslizam pela musculatura. O calor amolece as fibras e prepara o corpo para receber pressão sem resistência.' },
    { nome: 'Repousar', texto: 'Algumas pedras descansam em pontos-chave enquanto as mãos seguem o trabalho. É aqui que o corpo, finalmente, se entrega.' },
  ],
  nota: 'Calor acolhedor, nunca desconfortável. Se estiver quente demais, é só falar.',
  cta: 'Quero agendar uma massagem',
}

/** Vale-presente (da arte que a Rita usa). Quem compra escolhe para quem é, e a etiqueta muda junto. */
export type Presenteada = { id: string; rotulo: string; para: string; etiqueta: string; fecho: string }

export const VALE_PRESENTE = {
  sobretitulo: 'Vale presente',
  titulo: ['Porque ela merece', 'todo o cuidado'],
  destaque: 'do mundo.',
  texto: `Um convite especial para uma ${VALE_EXPERIENCIA}: duas horas só dela, com imersão em água quente, sais e pétalas de rosas. Um presente para ela lembrar muito depois do dia.`,
  experiencia: VALE_EXPERIENCIA,
  itens: [
    { titulo: 'Imersão em água quente', texto: 'com sais e pétalas de rosas' },
    { titulo: '2 horas', texto: 'de experiência relaxante' },
    { titulo: 'Corpo e mente', texto: 'em equilíbrio' },
    { titulo: 'Renove', texto: 'suas energias' },
  ],
  pergunta: 'Para quem é o presente?',
  opcoes: [
    { id: 'esposa', rotulo: 'Esposa', para: 'a minha esposa', etiqueta: 'Para a minha esposa,', fecho: 'com todo o meu amor!' },
    { id: 'namorada', rotulo: 'Namorada', para: 'a minha namorada', etiqueta: 'Para a minha namorada,', fecho: 'com todo o meu amor!' },
    { id: 'mae', rotulo: 'Mãe', para: 'a minha mãe', etiqueta: 'Para a minha mãe,', fecho: 'com todo o meu carinho!' },
    { id: 'amiga', rotulo: 'Amiga', para: 'uma amiga', etiqueta: 'Para uma amiga querida,', fecho: 'com todo o carinho!' },
    { id: 'eu', rotulo: 'Eu mesma', para: 'mim mesma', etiqueta: 'Para mim mesma,', fecho: 'porque eu mereço!' },
  ] as Presenteada[],
  etiquetaPadrao: { etiqueta: 'Para alguém especial,', fecho: 'com todo o carinho!' },
  nomeRotulo: 'Nome de quem vai receber',
  nomeOpcional: 'opcional',
  nomePlaceholder: 'Ex.: Ana',
  cta: 'Quero presentear',
  ctaEu: 'Quero me presentear',
  estetica: 'Prefere presentear com um tratamento de estética?',
  assinatura: 'Ela merece esse momento…',
  selo: 'Vale presente · Rita de Cássia · ',
  alt: `Vale-presente da ${RITA.marca}: ${VALE_EXPERIENCIA}, com imersão em água quente com sais e pétalas de rosas, 2 horas de experiência relaxante, corpo e mente em equilíbrio. Você merece esse momento.`,
}

export const SESSAO = {
  sobretitulo: 'Como funciona',
  titulo: 'Todo resultado começa',
  destaque: 'com uma avaliação.',
  apoio: 'Você entende cada passo antes de começar, e o plano se ajusta a você.',
  etapas: [
    {
      titulo: 'Avaliação',
      rotulo: 'Primeiro, olhar de perto.',
      texto: 'Uma conversa e uma análise da pele, do corpo ou dos fios para entender o que você quer e o que faz sentido para você.',
      pontos: ['Avaliação individual', 'Histórico e expectativas', 'Indicação honesta'],
    },
    {
      titulo: 'Plano',
      rotulo: 'Um protocolo só seu.',
      texto: 'Tratamento, número de sessões e intervalos definidos para o seu objetivo, com tudo explicado antes de começar.',
      pontos: ['Protocolo personalizado', 'Sessões e valores claros', 'Sem surpresa no caminho'],
    },
    {
      titulo: 'Sessões',
      rotulo: 'Técnica e conforto.',
      texto: 'Equipamentos e técnicas aplicados com cuidado, num ambiente pensado para você relaxar enquanto se cuida.',
      pontos: ['Ambiente acolhedor', 'Conforto em cada etapa', 'Ajustes sempre que precisar'],
    },
    {
      titulo: 'Resultado',
      rotulo: 'O cuidado continua.',
      texto: 'Orientações para casa e acompanhamento da evolução, para o resultado aparecer e durar.',
      pontos: ['Cuidados pós-sessão', 'Acompanhamento da evolução', 'Manutenção quando fizer sentido'],
    },
  ],
}

export const SENSACOES = {
  sobretitulo: 'O que muda',
  titulo: 'Você chega de um jeito.',
  destaque: 'Sai de outro.',
  instrucao: 'Arraste a linha e sinta a diferença.',
  chega: ['Pele cansada', 'Gordurinha teimosa', 'Fios sem vida', 'Pelos incômodos', 'Corpo inchado', 'Autoestima em baixa'],
  sai: ['Pele com viço', 'Contorno mais definido', 'Fios com brilho', 'Pele lisinha', 'Corpo leve', 'Autoestima lá em cima'],
  nota: 'Cada corpo responde no seu tempo. O tratamento e o número de sessões são definidos na avaliação.',
}

export const SOBRE = {
  sobretitulo: 'Quem cuida de você',
  titulo: 'Olhar atento.',
  destaque: 'Mãos cuidadosas.',
  lead: `${RITA.marca} cuida de mulheres que querem se sentir bem na própria pele, com tratamentos escolhidos a dedo para cada uma.`,
  texto: 'Rosto, corpo, cabelos: o tratamento muda, o cuidado não. Antes de indicar qualquer protocolo, ela escuta. Durante, acompanha. Depois, orienta, para que o resultado dure muito além da sessão.',
  principios: [
    { titulo: 'Avaliação antes de tudo', texto: 'O tratamento certo começa entendendo você.' },
    { titulo: 'Protocolos sob medida', texto: 'Plano pensado para a sua pele e o seu objetivo.' },
    { titulo: 'Acompanhamento de perto', texto: 'Evolução acompanhada a cada sessão.' },
  ],
  frase: ['Cuidado que renova,', 'beleza que floresce.'],
  link: 'Agendar com a Rita',
}

export const GALERIA = {
  sobretitulo: 'O espaço',
  titulo: 'Um lugar feito para',
  destaque: 'você se cuidar.',
}

export const DUVIDAS = {
  sobretitulo: 'Sem dúvidas pelo caminho',
  titulo: ['Se cuidar é', 'saber o que'],
  destaque: 'esperar.',
  link: 'Perguntar pelo WhatsApp',
  itens: [
    {
      pergunta: 'Preciso passar por uma avaliação antes?',
      resposta: 'Sim, e ela faz toda a diferença. É na avaliação que a Rita entende o seu objetivo, observa a pele, o corpo ou os fios e indica o tratamento e o número de sessões ideais.',
    },
    {
      pergunta: 'Quantas sessões vou precisar?',
      resposta: 'Depende do tratamento e do seu objetivo. Alguns cuidados, como a limpeza de pele, podem ser pontuais; outros, como criolipólise, depilação a laser e tratamentos capilares, funcionam em protocolos com várias sessões. Tudo é combinado na avaliação.',
    },
    {
      pergunta: 'Os tratamentos doem?',
      resposta: 'A maioria é bem tolerada. Alguns, como o microagulhamento e a depilação a laser, podem causar um leve desconforto, e a intensidade é sempre ajustada com você.',
    },
    {
      pergunta: 'Existe alguma contraindicação?',
      resposta: 'Alguns tratamentos pedem cuidado ou liberação médica em situações como gestação, lesões ou inflamações na pele, uso de certos medicamentos, marcapasso e algumas condições de saúde. Por isso a avaliação vem antes de qualquer sessão.',
    },
    {
      pergunta: 'Tem pacotes ou promoções?',
      resposta: 'Pergunte pelo WhatsApp: as condições e as promoções do momento são passadas na hora do agendamento.',
    },
    {
      pergunta: 'Posso dar uma sessão de presente?',
      resposta: `Pode, sim. O vale-presente é um convite para a ${VALE_EXPERIENCIA}: duas horas com imersão em água quente, sais e pétalas de rosas. É só chamar a Rita no WhatsApp e combinar.`,
    },
    {
      pergunta: 'Como faço para agendar?',
      resposta: 'Pelo WhatsApp. Diga qual tratamento te interessa e os melhores dias e horários, e a Rita confirma com você.',
    },
  ],
}

export const AGENDAR = {
  sobretitulo: 'Agende seu horário',
  titulo: 'Reserve um momento',
  destaque: 'só seu.',
  texto: 'Escolha o tratamento e o melhor período. A mensagem fica pronta para você enviar no WhatsApp.',
  passos: { terapia: 'O que você procura?', periodo: 'Melhor período', nome: 'Seu nome' },
  opcoes: ['Pele e rosto', 'Corpo e contorno', 'Cabelos', 'Depilação a laser', 'Massagem'],
  naoSei: 'Ainda não sei',
  periodos: ['Manhã', 'Tarde', 'Noite', 'Tanto faz'],
  nomePlaceholder: 'Como você gosta de ser chamada?',
  botao: 'Enviar pelo WhatsApp',
  aviso: 'Você confere a mensagem no WhatsApp antes de enviar.',
}

export const RODAPE = {
  legal: 'Resultados variam de pessoa para pessoa. Os tratamentos são indicados após avaliação individual.',
  credito: 'Site desenvolvido por Nova AI Solutions',
}

export const SEO = {
  titulo: `${RITA.marca} · ${RITA.descritor} | Criolipólise, microagulhamento, limpeza de pele e depilação a laser`,
  descricao: `${RITA.marca}, estética feminina: criolipólise, microagulhamento, limpeza de pele, jato de plasma, depilação a laser, tratamentos capilares e massagens. Agende pelo WhatsApp ${RITA.whatsappExibicao}.`,
}
