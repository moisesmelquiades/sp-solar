import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Render } from '@measured/puck'
import '@measured/puck/puck.css'
import { pb, getSiteAtivo, getPageData } from './lib/pocketbase'
import { puckConfig, DEFAULT_PUCK_DATA } from './puck/config'
import Login from './pages/Login'
import Admin from './pages/Admin'
import PageEditor from './pages/PageEditor'

const WA_LINK = 'https://wa.me/558194125508?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20energia%20solar!'
const PHONE = '+55 81 9412-5508'
const EMAIL = 'midiaspsolar@gmail.com'

const passos = [
  { num: '01', title: 'Contato inicial', desc: 'Você nos chama no WhatsApp e compartilha sua conta de energia.' },
  { num: '02', title: 'Análise gratuita', desc: 'Nossa equipe analisa o consumo e elabora a proposta ideal.' },
  { num: '03', title: 'Visita técnica', desc: 'Fazemos a vistoria no local para confirmar a viabilidade do projeto.' },
  { num: '04', title: 'Instalação', desc: 'Equipe especializada instala o sistema com agilidade e segurança.' },
]

const projetos = [
  { src: '/images/proj1.jpg', tipo: 'Usina residencial' },
  { src: '/images/proj7.jpg', tipo: 'Sistema comercial' },
  { src: '/images/proj3.jpg', tipo: 'Telhado residencial' },
  { src: '/images/proj2.jpg', tipo: 'Geração distribuída' },
  { src: '/images/proj9.jpg', tipo: 'Usina comercial' },
  { src: '/images/proj5.jpg', tipo: 'Sistema residencial' },
]

const WA_ICON = (
  <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', fill: '#08183D' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function EmBreve() {
  return (
    <div style={{ minHeight: '100vh', background: '#08183D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <img src="/images/logo-white.png" alt="S&P Energia Solar" style={{ height: '56px', width: 'auto' }} />
      </div>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(42px,6vw,72px)', color: '#EAF0F8', margin: '0 0 16px', textAlign: 'center' }}>Em breve</h1>
      <p style={{ color: 'rgba(233,240,250,.6)', marginBottom: '40px', textAlign: 'center', fontSize: '18px' }}>
        Estamos preparando algo incrível para você.
      </p>
      <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FEB000', color: '#08183D', fontWeight: 700, fontSize: '16px', padding: '16px 32px', borderRadius: '100px', textDecoration: 'none' }}>
        {WA_ICON} Falar no WhatsApp
      </a>
    </div>
  )
}

function ProtectedRoute({ children }) {
  if (!pb.authStore.isValid) return <Navigate to="/login" replace />
  return children
}

function Site() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [siteAtivo, setSiteAtivo] = useState(true)
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getSiteAtivo(), getPageData()]).then(([ativo, data]) => {
      setSiteAtivo(ativo)
      setPageData(data || DEFAULT_PUCK_DATA)
      setLoading(false)
    })

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#08183D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'pulse 2s infinite' }}>
        <img src="/images/logo-white.png" alt="" style={{ height: '48px', width: 'auto', opacity: 0.7 }} />
      </div>
    </div>
  )

  if (!siteAtivo) return <EmBreve />

  return (
    <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", background: '#08183D', color: '#08183D', overflowX: 'hidden' }}>

      {/* ========== HEADER ========== */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        transition: 'background .4s ease, border-color .4s ease, backdrop-filter .4s ease',
        background: scrolled ? 'rgba(6,16,40,.92)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'rgba(233,240,250,.1)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <a href="#top" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/images/logo-white.png" alt="S&P Energia Solar" style={{ height: '40px', width: 'auto', display: 'block' }} />
          </a>
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '38px' }}>
            {[['#diferenciais','Diferenciais'],['#como-funciona','Como funciona'],['#projetos','Projetos'],['#faq','FAQ']].map(([href, label]) => (
              <a key={href} href={href} style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(233,240,250,.82)', textDecoration: 'none', letterSpacing: '.2px' }}>{label}</a>
            ))}
          </nav>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="hidden md:block" style={{ background: '#FEB000', color: '#08183D', fontWeight: 700, fontSize: '13.5px', padding: '11px 22px', borderRadius: '100px', textDecoration: 'none', letterSpacing: '.2px', whiteSpace: 'nowrap' }}>
            Solicitar orçamento
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <svg width="24" height="24" fill="none" stroke="rgba(233,240,250,.82)" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden" style={{ background: 'rgba(6,16,40,.96)', borderTop: '1px solid rgba(233,240,250,.1)', padding: '16px 40px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[['#diferenciais','Diferenciais'],['#como-funciona','Como funciona'],['#projetos','Projetos'],['#faq','FAQ']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontSize: '15px', color: 'rgba(233,240,250,.82)', textDecoration: 'none' }}>{label}</a>
              ))}
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ background: '#FEB000', color: '#08183D', fontWeight: 700, fontSize: '14px', padding: '12px 22px', borderRadius: '100px', textDecoration: 'none', textAlign: 'center', marginTop: '8px' }}>
                Solicitar orçamento
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========== PUCK SECTIONS: Hero → Stats → Diferenciais → FAQ ========== */}
      <Render config={puckConfig} data={pageData} />

      {/* ========== COMO FUNCIONA ========== */}
      <section id="como-funciona" style={{ background: '#08183D', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-6%', top: '-10%', width: '460px', height: '460px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(254,176,0,.16) 0%,rgba(254,176,0,0) 68%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ width: '30px', height: '1px', background: '#FEB000' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '4px', color: '#FEB000', textTransform: 'uppercase' }}>Simples e rápido</span>
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(38px,4.6vw,58px)', lineHeight: 1.05, color: '#EAF0F8', margin: '0 0 70px', letterSpacing: '-.5px', maxWidth: '640px' }}>
            Como funciona o processo
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '34px' }} className="grid-cols-2 md:grid-cols-4">
            {passos.map(p => (
              <div key={p.num} style={{ borderTop: '1px solid rgba(233,240,250,.16)', paddingTop: '28px', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '-4px', left: 0, width: '7px', height: '7px', background: '#FEB000', display: 'block' }} />
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '54px', lineHeight: 1, color: '#FEB000', marginBottom: '18px' }}>{p.num}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#EAF0F8', margin: '0 0 10px', letterSpacing: '-.2px' }}>{p.title}</h3>
                <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'rgba(233,240,250,.6)', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '64px' }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: '#FEB000', color: '#08183D', fontWeight: 700, fontSize: '16px', padding: '16px 34px', borderRadius: '100px', textDecoration: 'none' }}>
              Começar agora
            </a>
          </div>
        </div>
      </section>

      {/* ========== PROJETOS ========== */}
      <section id="projetos" style={{ background: '#EEF1F5', padding: '120px 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ width: '30px', height: '1px', background: '#FEB000' }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '4px', color: '#0049B0', textTransform: 'uppercase' }}>Portfólio</span>
              </div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(38px,4.6vw,58px)', lineHeight: 1.05, color: '#08183D', margin: 0, letterSpacing: '-.5px' }}>Projetos realizados</h2>
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '2px', color: '#5B6577', textTransform: 'uppercase' }}>+50 sistemas em PE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="grid-cols-2 md:grid-cols-3">
            {projetos.map((pr, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '4px', background: '#d3d9e2' }}>
                <img
                  src={pr.src}
                  alt={pr.tipo}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s cubic-bezier(.2,.7,.2,1)' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: '#08183D', color: '#EAF0F8', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '100px', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#11244F'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#08183D'; e.currentTarget.style.transform = '' }}
            >
              Quero um projeto como esses
            </a>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section style={{ position: 'relative', background: '#08183D', padding: '130px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/images/banner.png')", backgroundSize: 'cover', backgroundPosition: 'center 40%', opacity: 0.16 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#08183D 0%,rgba(8,24,61,.7) 50%,#08183D 100%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '620px', height: '620px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(254,176,0,.22) 0%,rgba(254,176,0,0) 64%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '4px', color: '#FEB000', textTransform: 'uppercase' }}>Orçamento sem compromisso</span>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(42px,5.6vw,76px)', lineHeight: 1.03, color: '#EAF0F8', margin: '24px 0 22px', letterSpacing: '-.8px' }}>
            Descubra quanto você pode <span style={{ color: '#FEB000', fontStyle: 'italic' }}>economizar</span>
          </h2>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(233,240,250,.74)', maxWidth: '520px', margin: '0 auto 40px' }}>
            Envie sua conta de luz pelo WhatsApp e receba uma análise gratuita do seu potencial de geração.
          </p>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#FEB000', color: '#08183D', fontWeight: 700, fontSize: '18px', padding: '19px 40px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 24px 50px -20px rgba(254,176,0,.7)' }}>
            {WA_ICON}
            Falar no WhatsApp
          </a>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ background: '#05122E', padding: '72px 0 36px', borderTop: '1px solid rgba(233,240,250,.1)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '48px' }} className="grid-cols-1 md:grid-cols-3">
          <div>
            <div style={{ marginBottom: '22px' }}>
              <img src="/images/logo-white.png" alt="S&P Energia Solar" style={{ height: '48px', width: 'auto', display: 'block' }} />
            </div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '1.5px', color: '#FEB000', textTransform: 'uppercase', lineHeight: 1.7, margin: 0, maxWidth: '280px' }}>
              Conectando você a um futuro mais limpo
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '2px', color: 'rgba(233,240,250,.5)', textTransform: 'uppercase', margin: '0 0 20px' }}>Navegação</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {[['#diferenciais','Diferenciais'],['#como-funciona','Como funciona'],['#projetos','Projetos'],['#faq','FAQ']].map(([href, label]) => (
                <li key={href}><a href={href} style={{ fontSize: '15px', color: 'rgba(233,240,250,.78)', textDecoration: 'none' }}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '2px', color: 'rgba(233,240,250,.5)', textTransform: 'uppercase', margin: '0 0 20px' }}>Contato</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <li><a href={WA_LINK} target="_blank" rel="noreferrer" style={{ fontSize: '15px', color: 'rgba(233,240,250,.78)', textDecoration: 'none' }}>{PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`} style={{ fontSize: '15px', color: 'rgba(233,240,250,.78)', textDecoration: 'none' }}>{EMAIL}</a></li>
              <li style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: 'rgba(233,240,250,.5)', marginTop: '6px', letterSpacing: '1px' }}>Pernambuco · Brasil</li>
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: '1180px', margin: '48px auto 0', padding: '24px 40px 0', borderTop: '1px solid rgba(233,240,250,.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ fontSize: '12.5px', color: 'rgba(233,240,250,.45)' }}>© {new Date().getFullYear()} S&P Energia Solar. Todos os direitos reservados.</span>
          <span style={{ fontSize: '12.5px', color: 'rgba(233,240,250,.45)' }}>Desenvolvido por <span style={{ color: '#FEB000' }}>Melch Tecnologia</span></span>
        </div>
      </footer>

      {/* ========== FLOATING WHATSAPP ========== */}
      <a href={WA_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        style={{ position: 'fixed', bottom: '26px', right: '26px', zIndex: 70, width: '58px', height: '58px', borderRadius: '50%', background: '#FEB000', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 34px -10px rgba(0,0,0,.5)', transition: 'transform .2s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = ''}
      >
        <svg viewBox="0 0 24 24" style={{ width: '30px', height: '30px', fill: '#08183D' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin/paginas" element={<ProtectedRoute><PageEditor /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
