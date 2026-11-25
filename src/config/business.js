/* ==========================================================================
   SEXTO SENTIDO — Cabeleireiro, Estética e Bem-Estar (Porto)
   --------------------------------------------------------------------------
   Este é o ÚNICO ficheiro que precisa de editar para mudar o site.
   Todos os textos, cores, serviços, horários e fotos vêm daqui.

   Ver o site:  npm run dev
   Publicar:    npm run build   (gera a pasta /dist)

   O que ficar vazio ('') desaparece sozinho. Nos títulos, as palavras
   entre *asteriscos* ficam na cor de destaque.

   Por preencher quando o salão nos der:
     • contact.whatsapp  → ex.: '351930553806' (só números, com 351)
     • contact.email     → ex.: 'geral@sextosentido.pt'
     • testimonials      → só opiniões REAIS (copiadas do Google)
     • fotos             → as fotos são de banco de imagens; troque por
                           fotos do salão quando houver
   ========================================================================== */

const NAME = 'Sexto Sentido Cabeleireiro, Estética e Bem-Estar'
const SHORT = 'Sexto Sentido'
const PHONE_DISPLAY = '930 553 806'
const PHONE_LINK = '+351930553806'
const ADDRESS = 'Rua do Amial 926, 4200\u2011056 Porto' // \u2011 = hífen que não deixa partir a linha
const MAPS_URL =
  'https://maps.google.com/?cid=3203580059297402707&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgEIAA'
const HOURS = 'Seg, Ter, Qui, Sex e Sáb · 9:00\u00a0–\u00a019:00' // \u00a0 = espaço que não deixa partir a linha
const PHOTO = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

const business = {
  /* 1. DADOS BÁSICOS */
  language: 'pt-PT',
  name: NAME,
  logo: { src: '', alt: '' }, // ex.: '/logo.png' (ficheiro na pasta /public)
  // Ícone do separador: um "S" rosa sobre castanho-escuro.
  favicon: `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#2B1D1A"/><text x="32" y="45" font-family="Georgia,serif" font-size="38" fill="#E8A0A8" text-anchor="middle">S</text></svg>',
  )}`,
  wordmark: { primary: SHORT, secondary: SHORT, tagline: 'Cabeleireiro · Estética · Bem-Estar' },
  type: 'Cabeleireiro e estética',

  seo: {
    title: `${SHORT} — Cabeleireiro, Estética e Bem-Estar no Porto`,
    description:
      'Cortes, penteados, coloração e tratamentos na Rua do Amial 926, no Porto. Aberto segunda, terça, quinta, sexta e sábado, das 9:00 às 19:00. Marcações: 930 553 806.',
    // Endereço do site publicado. Quando houver domínio próprio, troque aqui
    // (ex.: 'https://sextosentido.pt') e publique de novo.
    url: 'https://sexto-sentido-porto.netlify.app',
    // Imagem que aparece ao partilhar o link (WhatsApp, Facebook…):
    // 1200 × 630 px, ficheiro na pasta /public.
    shareImage: {
      src: '/og-image.jpg',
      alt: 'Cabeleireira a lavar o cabelo de uma cliente no lavatório',
      width: 1200,
      height: 630,
    },
  },

  /* 2. CONTACTOS (vazio = escondido) */
  contact: {
    whatsapp: '',
    email: '',
    instagram: '',
  },

  /* 3. CORES E LETRAS — rosa nude + castanho-escuro, estilo editorial ("nude").
     O estilo anterior continua disponível: style: 'minimal' (ver global.css). */
  theme: {
    style: 'nude',
    primary: '#2B1D1A', // castanho-escuro: botões principais, rodapé
    secondary: '#F6E4DF', // rosa nude: secções alternadas
    accent: '#E8A0A8', // rosa de destaque: botões secundários, badges, ícones
    pinkText: '#C25E6E', // rosa para TEXTO sobre fundos claros (o #E8A0A8 não tem contraste AA)
    ink: '#1A1414', // texto principal
    muted: '#4A3B37', // texto secundário
    background: '#FBF0EC', // fundo principal (creme rosado)
    neutral: '#F6E4DF', // secção de serviços
    highlightOnDark: '#E8A0A8',
    fonts: {
      display: 'Anton',
      body: 'Inter',
      displayFallback: "'Bebas Neue', 'Arial Narrow', sans-serif",
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Anton&family=Great+Vibes&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500&display=swap',
    },
  },

  /* 4. MENU DO TOPO */
  nav: {
    links: [
      { label: 'Serviços', href: '#services' },
      { label: 'Sobre nós', href: '#about' },
      { label: 'Contactos', href: '#contact' },
    ],
    cta: { label: 'Marcar', href: '#contact', showInHeader: true },
    menuOpenLabel: 'Abrir menu',
    menuCloseLabel: 'Fechar menu',
    mainNavLabel: 'Navegação principal',
    mobileNavLabel: 'Navegação móvel',
    homeLabel: 'página inicial',
  },

  /* 5. ONDE ESTAMOS — um só salão: os dados aparecem em "Marcações" */
  locations: {
    showSection: false,
    mapsLabel: 'Direções',
    callLabel: 'Ligar',
    mapsSearchPrefix: '',
    regions: [],
    items: [
      {
        name: SHORT,
        address: ADDRESS,
        phoneDisplay: PHONE_DISPLAY,
        phoneLink: PHONE_LINK,
        hours: HOURS,
        // Horário completo (weekday: 0 = domingo … 6 = sábado; marca o dia de hoje)
        hoursTable: [
          { day: 'Segunda', weekday: 1, time: '9:00 – 19:00' },
          { day: 'Terça', weekday: 2, time: '9:00 – 19:00' },
          { day: 'Quarta', weekday: 3, time: 'Encerrado', closed: true },
          { day: 'Quinta', weekday: 4, time: '9:00 – 19:00' },
          { day: 'Sexta', weekday: 5, time: '9:00 – 19:00' },
          { day: 'Sábado', weekday: 6, time: '9:00 – 19:00' },
          { day: 'Domingo', weekday: 0, time: 'Encerrado', closed: true },
        ],
        mapsUrl: MAPS_URL,
      },
    ],
  },

  /* 6. DESTAQUE (topo da página) */
  hero: {
    eyebrow: 'Cabeleireiro e estética · Porto',
    headline: 'Cabelo e pele *em boas mãos*',
    subheadline: 'Cortes, coloração, penteados e tratamentos na Rua do Amial, no Porto. Ligue e marque a sua hora.',
    primaryCta: { label: 'Marcar atendimento', href: '#contact' },
    menuCta: { label: 'Ver serviços', href: '#services' },
    reserveLink: { label: `Ligar ${PHONE_DISPLAY}`, href: `tel:${PHONE_LINK}` },
    infoBar: [
      { label: 'Horário', value: '9:00 – 19:00' },
      { label: 'Aberto', value: 'Seg, Ter, Qui, Sex, Sáb' },
      { label: 'Encerrado', value: 'Quarta e domingo' },
      { label: 'Morada', value: 'Rua do Amial 926' },
    ],
    // Selo circular a rodar (só no estilo 'nude'): textos que já existem no site.
    seal: { ring: 'Cabeleireiro · Estética · Bem-Estar ·', center: SHORT },
    image: {
      src: PHOTO('1634449571010-02389ed0f9b0'),
      alt: 'Cabeleireira a lavar o cabelo de uma cliente no lavatório',
      position: '40% 50%',
    },
  },

  /* 7. SERVIÇOS */
  services: {
    eyebrow: 'Serviços',
    title: 'Do corte *ao cuidado*',
    intro: 'Tudo o que o seu cabelo precisa, no mesmo espaço. Diga-nos o que procura quando marcar.',
    // Botão redondo com seta em cada cartão (o texto só é lido por leitores de ecrã)
    cardCta: { label: 'Marcar', href: '#contact' },
    items: [
      {
        title: 'Cortes',
        description: 'Um corte pensado para o seu cabelo e para o seu dia a dia.',
        image: {
          src: PHOTO('1562322140-8baeececf3df'),
          alt: 'Cabeleireira a secar e modelar o cabelo curto de uma cliente',
          position: '60% 40%',
        },
      },
      {
        title: 'Penteados',
        description: 'Brushing, ondas ou apanhados, para todos os dias ou para uma ocasião especial.',
        image: {
          src: PHOTO('1582095133179-bfd08e2fc6b3'),
          alt: 'Mãos a prender um penteado apanhado com ganchos',
          position: '50% 40%',
        },
      },
      {
        title: 'Coloração',
        description: 'Da cor de raiz a uma mudança completa, escolhida consigo.',
        image: {
          src: PHOTO('1492106087820-71f1a00d2b11'),
          alt: 'Cabelo comprido ondulado pintado em tom lilás',
          position: '50% 50%',
        },
      },
      {
        title: 'Tratamentos',
        description: 'Cuidados que devolvem brilho e força ao cabelo, e momentos de estética e bem-estar.',
        image: {
          src: PHOTO('1570172619644-dfd03ed5d881'),
          alt: 'Cliente deitada a receber uma máscara facial aplicada com pincel',
          position: '50% 40%',
        },
      },
    ],
  },

  /* 8. SOBRE NÓS */
  about: {
    tone: 'light',
    eyebrow: 'Sobre nós',
    title: 'Cuidar de si, *no Amial*',
    paragraphs: [
      'O Sexto Sentido é um cabeleireiro com estética e bem-estar na Rua do Amial, no Porto. Cortamos, pintamos, penteamos e cuidamos, tudo no mesmo espaço.',
      'Estamos abertos cinco dias por semana, das 9:00 às 19:00, sábado incluído. Ligue-nos, diga o que precisa, e marcamos a hora que lhe der jeito.',
    ],
    signature: '',
    link: { label: 'Ver horário e contactos', href: '#contact' },
    image: {
      src: PHOTO('1521590832167-7bcbfaa6381f'),
      alt: 'Cadeiras cor-de-rosa em frente ao espelho de um salão de cabeleireiro',
    },
  },

  /* 9. PORQUÊ NÓS — só factos reais (horário, morada, serviços) */
  why: {
    eyebrow: 'Bom saber',
    title: 'Um salão que *cabe na sua semana*',
    items: [
      { title: 'Tudo no mesmo espaço', text: 'Cabeleireiro, estética e bem-estar, sem ter de mudar de sítio.' },
      { title: 'Aberto ao sábado', text: 'Para quem não consegue vir durante a semana.' },
      { title: 'Das 9:00 às 19:00', text: 'Segunda, terça, quinta, sexta e sábado. Encerramos à quarta e ao domingo.' },
      { title: 'Rua do Amial 926', text: 'No Porto. Toque em “Direções” e o mapa leva-o até à porta.' },
    ],
  },

  /* 10. OPINIÕES — vazio = secção escondida. Só opiniões REAIS:
     { quote: '…', name: 'Ana M.', detail: 'Google' } */
  testimonials: {
    eyebrow: 'Opiniões',
    title: 'O que dizem *as clientes*',
    items: [],
  },

  /* 11. PERGUNTAS FREQUENTES — vazio = secção escondida */
  faq: {
    eyebrow: 'Perguntas',
    title: 'Antes de *vir*',
    items: [],
  },

  /* 12. MARCAÇÕES */
  contactSection: {
    eyebrow: 'Marcações',
    title: 'Marque a *sua hora*',
    intro: 'O mais rápido é ligar-nos. Se preferir, prepare o pedido no formulário e ligue para confirmar.',
    selectLabel: 'Salão',
    selectPlaceholder: 'Escolha',
    emptyText: '',
    emptyLink: { label: '', href: '' },
    noDetailsText: '',
    labels: {
      call: 'Ligar para marcar',
      callTo: 'Ligar para o',
      callViaMaps: 'Ver o número',
      whatsapp: 'WhatsApp',
      email: 'Enviar email',
      directions: 'Direções',
      maps: 'Ver no Google Maps',
      address: 'Morada',
      hours: 'Horário',
      today: 'Hoje',
      phone: 'Telefone',
      emailAddress: 'Email',
    },
    image: {
      src: PHOTO('1527799820374-dcf8d9d4a388'),
      alt: 'Secador, escovas e pentes de cabeleireiro arrumados sobre uma mesa branca',
    },
    form: {
      title: 'Pedido de marcação',
      fields: {
        location: 'Salão',
        name: 'Nome',
        phone: 'Telemóvel',
        service: 'Serviço',
        date: 'Dia',
        time: 'Hora preferida',
        message: 'Alguma nota?',
        messagePlaceholder: 'Ex.: comprimento do cabelo, cor que tem agora…',
      },
      serviceOptions: ['Corte', 'Penteado', 'Coloração', 'Tratamento', 'Outro / ainda não sei'],
      servicePlaceholder: 'Escolha um serviço',
      timeOptions: [
        '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      ],
      maxGuests: 0, // 0 = não perguntar "quantas pessoas"
      closedWeekdays: [0, 3], // domingo e quarta
      closedDayMessage: 'Estamos encerrados à quarta e ao domingo. Escolha outro dia.',
      dateHint: 'Encerramos à quarta-feira e ao domingo.',
      submit: 'Preparar pedido',
      note: 'As marcações ficam confirmadas por telefone.',
      successTitle: 'Dados preparados',
      successText:
        'Este pedido ainda não foi enviado ao salão. Ligue-nos para marcar e confirmar a hora; tenha estes dados à mão:',
      successTextSent: 'A mensagem está pronta no WhatsApp ou no email: só falta enviar.',
      sendAnother: 'Novo pedido',
      messageIntro: `Olá, gostaria de marcar uma hora no ${SHORT}.`,
      emailSubject: 'Pedido de marcação',
    },
  },

  /* 13. RODAPÉ */
  footer: {
    note: 'Cabeleireiro, estética e bem-estar na Rua do Amial, no Porto.',
    exploreTitle: 'Explorar',
    locationsTitle: 'Morada',
    locationsSummary: '',
    locationsLink: 'Horário e contactos',
    locationsHref: '#contact',
    contactTitle: 'Contactos',
    instagramLabel: 'Instagram',
    rights: 'Todos os direitos reservados.',
    backToTop: 'Voltar ao topo',
  },
}

export default business
