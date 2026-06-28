const WA_BASE = 'https://wa.me/558194125508?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20energia%20solar!'

export const DEFAULT_PUCK_DATA = {
  root: { props: {} },
  content: [
    {
      type: 'Hero',
      props: {
        id: 'hero-1',
        badge: 'Energia Solar Fotovoltaica',
        titulo: 'Reduza até 95% da sua conta de luz',
        destaque: '95%',
        subtitulo: 'Projetos personalizados de energia solar para residências, comércios e indústrias em Pernambuco. Instalação profissional com garantia vitalícia de suporte.',
        botao: 'Solicitar Orçamento Grátis',
      },
    },
    {
      type: 'Stats',
      props: {
        id: 'stats-1',
        items: [
          { num: '+50', label: 'Projetos Instalados' },
          { num: '+200kW', label: 'Potência Instalada' },
          { num: '+50', label: 'Clientes Satisfeitos' },
          { num: '100%', label: 'Homologados' },
        ],
      },
    },
    {
      type: 'Diferenciais',
      props: {
        id: 'diferenciais-1',
        titulo: 'Diferenciais da S&P Solar',
        items: [
          { icon: '🏆', title: 'Responsabilidade Técnica', desc: 'Projetos assinados por engenheiro credenciado no CREA.' },
          { icon: '📋', title: 'Homologação Própria', desc: 'Cuidamos de todo o processo junto à distribuidora de energia.' },
          { icon: '🔧', title: 'Suporte Técnico Vitalício', desc: 'Assistência contínua após a instalação, sem custo adicional.' },
          { icon: '📐', title: 'Projetos Personalizados', desc: 'Dimensionamento ideal para cada perfil de consumo.' },
          { icon: '✅', title: 'Conformidade com Normas', desc: 'Instalações dentro das normas ABNT e regulamentações da ANEEL.' },
          { icon: '⚡', title: 'Equipamentos de Alta Performance', desc: 'Trabalhamos com as melhores marcas do mercado solar.' },
        ],
      },
    },
    {
      type: 'FAQ',
      props: {
        id: 'faq-1',
        titulo: 'Perguntas Frequentes',
        items: [
          { q: 'Quanto tempo leva para instalar um sistema solar?', a: 'A instalação residencial padrão leva de 1 a 3 dias.' },
          { q: 'Qual a economia na conta de luz?', a: 'É possível reduzir até 95% da conta de energia elétrica.' },
          { q: 'Qual é a vida útil dos painéis solares?', a: 'Os painéis solares têm vida útil de 25 a 30 anos.' },
          { q: 'A energia solar funciona em dias nublados?', a: 'Sim! Os painéis captam energia da luz solar difusa mesmo em dias nublados.' },
          { q: 'Como funciona a homologação junto à distribuidora?', a: 'Nós cuidamos de todo o processo: projeto elétrico, aprovação e vistoria final.' },
        ],
      },
    },
  ],
  zones: {},
}

function HeroComponent({ badge, titulo, destaque, subtitulo, botao }) {
  const parts = titulo.split(destaque)
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/banner.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0A1628]/75" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
        <p className="text-[#F5A623] font-semibold tracking-widest text-sm uppercase mb-4">{badge}</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          {parts[0]}<span className="text-[#F5A623]">{destaque}</span>{parts[1]}
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">{subtitulo}</p>
        <a href={WA_BASE} target="_blank" rel="noreferrer"
          className="bg-[#F5A623] hover:bg-yellow-500 text-white font-bold px-10 py-5 rounded-full text-xl transition-all shadow-2xl inline-block">
          💬 {botao}
        </a>
      </div>
    </section>
  )
}

function StatsComponent({ items }) {
  return (
    <section className="bg-[#1B4FBF] py-14">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        {items.map(({ num, label }) => (
          <div key={label}>
            <div className="text-4xl font-extrabold text-[#F5A623] mb-1">{num}</div>
            <div className="text-sm text-blue-100">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function DiferenciaisComponent({ titulo, items }) {
  return (
    <section id="diferenciais" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0A1628] mb-12">{titulo}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-[#0A1628] text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQComponent({ titulo, items }) {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0A1628] mb-12">{titulo}</h2>
        <div className="flex flex-col gap-3">
          {items.map(({ q, a }) => (
            <div key={q} className="border border-gray-200 rounded-xl p-5">
              <p className="font-semibold text-gray-800 mb-2">{q}</p>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const puckConfig = {
  components: {
    Hero: {
      label: 'Hero',
      fields: {
        badge: { type: 'text', label: 'Badge superior' },
        titulo: { type: 'text', label: 'Título' },
        destaque: { type: 'text', label: 'Palavra em amarelo' },
        subtitulo: { type: 'textarea', label: 'Subtítulo' },
        botao: { type: 'text', label: 'Texto do botão' },
      },
      defaultProps: DEFAULT_PUCK_DATA.content[0].props,
      render: (props) => <HeroComponent {...props} />,
    },
    Stats: {
      label: 'Números',
      fields: {
        items: {
          type: 'array',
          label: 'Estatísticas',
          arrayFields: {
            num: { type: 'text', label: 'Número' },
            label: { type: 'text', label: 'Descrição' },
          },
        },
      },
      defaultProps: DEFAULT_PUCK_DATA.content[1].props,
      render: (props) => <StatsComponent {...props} />,
    },
    Diferenciais: {
      label: 'Diferenciais',
      fields: {
        titulo: { type: 'text', label: 'Título da seção' },
        items: {
          type: 'array',
          label: 'Cards',
          arrayFields: {
            icon: { type: 'text', label: 'Emoji' },
            title: { type: 'text', label: 'Título' },
            desc: { type: 'textarea', label: 'Descrição' },
          },
        },
      },
      defaultProps: DEFAULT_PUCK_DATA.content[2].props,
      render: (props) => <DiferenciaisComponent {...props} />,
    },
    FAQ: {
      label: 'FAQ',
      fields: {
        titulo: { type: 'text', label: 'Título' },
        items: {
          type: 'array',
          label: 'Perguntas',
          arrayFields: {
            q: { type: 'text', label: 'Pergunta' },
            a: { type: 'textarea', label: 'Resposta' },
          },
        },
      },
      defaultProps: DEFAULT_PUCK_DATA.content[3].props,
      render: (props) => <FAQComponent {...props} />,
    },
  },
}
