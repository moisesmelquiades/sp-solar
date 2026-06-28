import { useState, useEffect, useRef } from 'react'

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
        subtitulo: 'Projetos sob medida de energia solar para residências, comércios e indústrias em Pernambuco. Instalação profissional, homologação completa e suporte vitalício.',
        botao: 'Solicitar orçamento grátis',
      },
    },
    {
      type: 'Stats',
      props: {
        id: 'stats-1',
        items: [
          { num: '+50', label: 'Projetos instalados' },
          { num: '+200 kW', label: 'Potência instalada' },
          { num: '+50', label: 'Clientes satisfeitos' },
          { num: '100%', label: 'Sistemas homologados' },
        ],
      },
    },
    {
      type: 'Diferenciais',
      props: {
        id: 'diferenciais-1',
        titulo: 'Precisão acima de tudo',
        items: [
          { n: '01', title: 'Responsabilidade técnica', desc: 'Projetos assinados por engenheiro credenciado no CREA, do dimensionamento à entrega.' },
          { n: '02', title: 'Homologação própria', desc: 'Cuidamos de todo o processo junto à distribuidora — você não lida com burocracia.' },
          { n: '03', title: 'Suporte vitalício', desc: 'Assistência técnica contínua após a instalação, sem custo adicional para o cliente.' },
          { n: '04', title: 'Projetos personalizados', desc: 'Dimensionamento ideal para cada perfil de consumo — residencial, comercial ou industrial.' },
          { n: '05', title: 'Conformidade com normas', desc: 'Instalações dentro das normas ABNT e das regulamentações da ANEEL.' },
          { n: '06', title: 'Alta performance', desc: 'Trabalhamos com as melhores marcas de painéis e inversores do mercado solar.' },
        ],
      },
    },
    {
      type: 'FAQ',
      props: {
        id: 'faq-1',
        titulo: 'Perguntas frequentes',
        items: [
          { q: 'Quanto tempo leva para instalar um sistema solar?', a: 'A instalação residencial padrão leva de 1 a 3 dias, dependendo do porte do sistema e das condições do telhado.' },
          { q: 'Qual a economia real na conta de luz?', a: 'É possível reduzir até 95% da conta de energia elétrica, mantendo apenas a taxa mínima da distribuidora.' },
          { q: 'Qual é a vida útil dos painéis solares?', a: 'Os painéis têm vida útil de 25 a 30 anos, com perda mínima de eficiência ao longo do tempo.' },
          { q: 'A energia solar funciona em dias nublados?', a: 'Sim. Os painéis captam a luz solar difusa e continuam gerando energia mesmo em dias nublados, em menor intensidade.' },
          { q: 'Como funciona a homologação junto à distribuidora?', a: 'Nós cuidamos de todo o processo: projeto elétrico, solicitação de acesso, aprovação e vistoria final.' },
        ],
      },
    },
  ],
  zones: {},
}

// ===== HERO =====
function HeroComponent({ badge, titulo, destaque, subtitulo, botao }) {
  const parts = titulo.split(destaque)
  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#08183D', paddingTop: '104px', paddingBottom: '40px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/images/banner.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(96deg,rgba(5,14,36,.94) 0%,rgba(6,16,40,.74) 44%,rgba(6,16,40,.32) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(6,16,40,.55) 0%,rgba(6,16,40,0) 24%,rgba(6,16,40,0) 70%,#08183D 100%)' }} />
      <div className="animate-glow" style={{ position: 'absolute', left: '-8%', top: '18%', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(254,176,0,.42) 0%,rgba(254,176,0,0) 66%)', filter: 'blur(8px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1180px', margin: '0 auto', padding: '0 max(20px,4vw)', width: '100%' }}>
        <div style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '26px' }}>
            <span style={{ width: '30px', height: '1px', background: '#FEB000', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '4px', color: '#FEB000', textTransform: 'uppercase' }}>{badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(46px,7.2vw,94px)', lineHeight: 1.0, color: '#EAF0F8', margin: '0 0 26px', letterSpacing: '-.5px' }}>
            {parts[0]}<span style={{ color: '#FEB000', fontStyle: 'italic' }}>{destaque}</span>{parts[1]}
          </h1>
          <p style={{ fontSize: 'clamp(17px,1.4vw,20px)', lineHeight: 1.6, color: 'rgba(233,240,250,.78)', maxWidth: '560px', margin: '0 0 38px', fontWeight: 400 }}>
            {subtitulo}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginBottom: '46px' }}>
            <a href={WA_BASE} target="_blank" rel="noreferrer" style={{ background: '#FEB000', color: '#08183D', fontWeight: 700, fontSize: '16px', padding: '17px 34px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 18px 40px -18px rgba(254,176,0,.7)' }}>
              {botao}
            </a>
            <a href="#projetos" style={{ border: '1px solid rgba(233,240,250,.32)', color: '#EAF0F8', fontWeight: 600, fontSize: '16px', padding: '16px 30px', borderRadius: '100px', textDecoration: 'none' }}>
              Ver projetos
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '26px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '2.5px', color: 'rgba(233,240,250,.5)', textTransform: 'uppercase' }}>CREA · ABNT · ANEEL</span>
            <span style={{ width: '1px', height: '14px', background: 'rgba(233,240,250,.22)', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '2.5px', color: 'rgba(233,240,250,.5)', textTransform: 'uppercase' }}>Garantia vitalícia de suporte</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== STATS =====
const STATS_PARSED = [
  { prefix: '+', target: 50,  suffix: '',    label: 'Projetos instalados' },
  { prefix: '+', target: 200, suffix: ' kW', label: 'Potência instalada' },
  { prefix: '+', target: 50,  suffix: '',    label: 'Clientes satisfeitos' },
  { prefix: '',  target: 100, suffix: '%',   label: 'Sistemas homologados' },
]

function StatsComponent() {
  const [cur, setCur] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        io.disconnect()
        const dur = 1500, t0 = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - t0) / dur)
          const e = 1 - Math.pow(1 - t, 3)
          setCur(STATS_PARSED.map(p => Math.round(p.target * e)))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section style={{ background: '#0049B0', padding: 0 }}>
      <div ref={ref} style={{ maxWidth: '1180px', margin: '0 auto', padding: 'clamp(40px,5.5vw,64px) max(20px,4vw)', display: 'grid', gap: 0 }} className="grid-cols-2 md:grid-cols-4">
        {STATS_PARSED.map((p, i) => (
          <div key={i} style={{ padding: '6px max(10px,2.5vw)', borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,.22)' }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(42px,4.6vw,66px)', lineHeight: 1, color: '#FFFFFF', letterSpacing: '-1px' }}>
              {p.prefix}{cur ? cur[i] : p.target}{p.suffix}
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11.5px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,.74)', marginTop: '14px' }}>
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ===== DIFERENCIAIS =====
function DiferenciaisComponent({ items }) {
  return (
    <section id="diferenciais" style={{ background: '#F4F6F9', padding: 'clamp(60px,10vw,120px) 0', borderTop: '1px solid rgba(8,24,61,.08)' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 max(20px,4vw)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '64px' }}>
          <div style={{ maxWidth: '620px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ width: '30px', height: '1px', background: '#FEB000', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '4px', color: '#0049B0', textTransform: 'uppercase' }}>Por que a S&P</span>
            </div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(38px,4.6vw,58px)', lineHeight: 1.05, color: '#08183D', margin: 0, letterSpacing: '-.5px' }}>Precisão acima de tudo</h2>
          </div>
          <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#5B6577', maxWidth: '330px', margin: 0 }}>
            Cada sistema é dimensionado, assinado e homologado por quem entende. Do projeto à vistoria final.
          </p>
        </div>
        <div style={{ display: 'grid', gap: '18px' }} className="grid-cols-1 md:grid-cols-3">
          {items.map(d => (
            <div key={d.n}
              style={{ background: '#FFFFFF', border: '1px solid rgba(8,24,61,.1)', borderRadius: '4px', padding: '34px 30px 36px', transition: 'transform .25s ease,border-color .25s ease,box-shadow .25s ease', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(254,176,0,.55)'; e.currentTarget.style.boxShadow = '0 22px 44px -28px rgba(8,24,61,.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(8,24,61,.1)'; e.currentTarget.style.boxShadow = '' }}
            >
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', letterSpacing: '1px', color: '#FEB000', marginBottom: '30px' }}>{d.n}</div>
              <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#08183D', margin: '0 0 11px', letterSpacing: '-.2px' }}>{d.title}</h3>
              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#5B6577', margin: 0 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== FAQ =====
function FAQComponent({ items }) {
  const [open, setOpen] = useState(-1)

  return (
    <section id="faq" style={{ background: '#F4F6F9', padding: 'clamp(60px,10vw,120px) 0', borderTop: '1px solid rgba(8,24,61,.08)' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 max(20px,4vw)' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ width: '30px', height: '1px', background: '#FEB000' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '4px', color: '#0049B0', textTransform: 'uppercase' }}>Dúvidas frequentes</span>
            <span style={{ width: '30px', height: '1px', background: '#FEB000' }} />
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(38px,4.6vw,56px)', lineHeight: 1.05, color: '#08183D', margin: 0, letterSpacing: '-.5px' }}>Perguntas frequentes</h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(8,24,61,.13)' }}>
          {items.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(8,24,61,.13)' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', padding: '26px 4px', textAlign: 'left', fontFamily: 'inherit' }}>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(20px,2.2vw,25px)', lineHeight: 1.25, color: '#08183D' }}>{f.q}</span>
                <span style={{ flexShrink: 0, width: '30px', height: '30px', border: `1px solid ${open === i ? '#FEB000' : 'rgba(8,24,61,.25)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .3s ease,background .3s ease,border-color .3s ease', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', background: open === i ? '#FEB000' : 'transparent' }}>
                  <span style={{ fontSize: '18px', lineHeight: 1, color: '#08183D', fontWeight: 300 }}>+</span>
                </span>
              </button>
              <div style={{ overflow: 'hidden', transition: 'max-height .35s ease,opacity .35s ease', maxHeight: open === i ? '260px' : '0px', opacity: open === i ? 1 : 0 }}>
                <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: '#5B6577', margin: 0, padding: '0 44px 28px 4px' }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== PUCK CONFIG =====
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
      render: () => <StatsComponent />,
    },
    Diferenciais: {
      label: 'Diferenciais',
      fields: {
        titulo: { type: 'text', label: 'Título da seção' },
        items: {
          type: 'array',
          label: 'Cards',
          arrayFields: {
            n: { type: 'text', label: 'Número' },
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
