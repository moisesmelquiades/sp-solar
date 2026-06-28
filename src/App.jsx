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
  { num: '01', title: 'Contato Inicial', desc: 'Você nos chama pelo WhatsApp e compartilha sua conta de energia.' },
  { num: '02', title: 'Análise Gratuita', desc: 'Nossa equipe analisa o seu consumo e elabora a proposta ideal.' },
  { num: '03', title: 'Visita Técnica', desc: 'Fazemos a vistoria no local para confirmar a viabilidade do projeto.' },
  { num: '04', title: 'Instalação', desc: 'Equipe especializada instala o sistema com agilidade e segurança.' },
]

const projetos = [
  '/images/proj1.jpg', '/images/proj2.jpg', '/images/proj3.jpg',
  '/images/proj4.jpg', '/images/proj5.jpg', '/images/proj6.jpg',
  '/images/proj7.jpg', '/images/proj8.jpg', '/images/proj9.jpg',
]

function EmBreve() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center text-white px-4">
      <img src="/images/logo.png" alt="S&P Energia Solar" className="h-32 mb-8" />
      <h1 className="text-3xl font-extrabold mb-3">Em breve</h1>
      <p className="text-blue-200 mb-8 text-center">Estamos preparando algo incrível para você.</p>
      <a href={WA_LINK} target="_blank" rel="noreferrer"
        className="bg-[#F5A623] text-white font-bold px-8 py-4 rounded-full">
        💬 Falar no WhatsApp
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
  const [siteAtivo, setSiteAtivo] = useState(true)
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getSiteAtivo(), getPageData()]).then(([ativo, data]) => {
      setSiteAtivo(ativo)
      setPageData(data || DEFAULT_PUCK_DATA)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <img src="/images/logo.png" alt="" className="h-20 animate-pulse" />
    </div>
  )

  if (!siteAtivo) return <EmBreve />

  return (
    <div className="font-['Inter',sans-serif]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <img src="/images/logo-white.png" alt="S&P Energia Solar" className="h-12 w-auto" />
          <nav className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
            <a href="#diferenciais" className="hover:text-[#F5A623] transition-colors">Diferenciais</a>
            <a href="#como-funciona" className="hover:text-[#F5A623] transition-colors">Como Funciona</a>
            <a href="#projetos" className="hover:text-[#F5A623] transition-colors">Projetos</a>
            <a href="#faq" className="hover:text-[#F5A623] transition-colors">FAQ</a>
            <a href={WA_LINK} target="_blank" rel="noreferrer"
              className="bg-[#F5A623] text-white px-5 py-2 rounded-full font-bold hover:bg-yellow-500 transition-colors">
              Solicitar Orçamento
            </a>
          </nav>
          <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0A1628] px-4 pb-4 flex flex-col gap-3 text-white text-sm font-medium">
            <a href="#diferenciais" onClick={() => setMenuOpen(false)}>Diferenciais</a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como Funciona</a>
            <a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <a href={WA_LINK} target="_blank" rel="noreferrer"
              className="bg-[#F5A623] text-white px-5 py-2 rounded-full font-bold text-center">
              Solicitar Orçamento
            </a>
          </div>
        )}
      </header>

      {/* Conteúdo editável via Puck */}
      <Render config={puckConfig} data={pageData} />

      {/* Como Funciona — estático */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-[#F5A623] font-semibold text-sm uppercase tracking-widest text-center mb-2">Simples e rápido</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0A1628] mb-12">Como Funciona o Processo</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {passos.map(({ num, title, desc }) => (
              <div key={num} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#F5A623]/10 border-2 border-[#F5A623] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#F5A623] font-extrabold text-xl">{num}</span>
                </div>
                <h3 className="font-bold text-[#0A1628] text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href={WA_LINK} target="_blank" rel="noreferrer"
              className="bg-[#1B4FBF] hover:bg-[#0A1628] text-white font-bold px-10 py-4 rounded-full text-lg transition-colors shadow-md inline-block">
              Começar Agora
            </a>
          </div>
        </div>
      </section>

      {/* Projetos — estático */}
      <section id="projetos" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-[#F5A623] font-semibold text-sm uppercase tracking-widest text-center mb-2">Nosso portfólio</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0A1628] mb-12">Projetos Realizados</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projetos.map((src, i) => (
              <div key={i} className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <img src={src} alt={`Projeto ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={WA_LINK} target="_blank" rel="noreferrer"
              className="bg-[#F5A623] hover:bg-yellow-500 text-white font-bold px-10 py-4 rounded-full text-lg transition-colors shadow-md inline-block">
              Quero um projeto como esse →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Solicite seu <span className="text-[#F5A623]">Orçamento Gratuito</span>
          </h2>
          <p className="text-blue-200 text-lg mb-8">Fale com nossa equipe agora e descubra quanto você pode economizar.</p>
          <a href={WA_LINK} target="_blank" rel="noreferrer"
            className="bg-[#F5A623] hover:bg-yellow-500 text-white font-bold px-12 py-5 rounded-full text-xl transition-all shadow-xl inline-block">
            💬 Falar no WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-gray-400 text-sm">
          <div>
            <img src="/images/logo-white.png" alt="S&P Energia Solar" className="h-14 mb-3" />
            <p className="text-gray-500 text-xs">Conectando você a um futuro mais limpo.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Navegação</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="#diferenciais" className="hover:text-[#F5A623] transition-colors">Diferenciais</a></li>
              <li><a href="#como-funciona" className="hover:text-[#F5A623] transition-colors">Como Funciona</a></li>
              <li><a href="#projetos" className="hover:text-[#F5A623] transition-colors">Projetos</a></li>
              <li><a href="#faq" className="hover:text-[#F5A623] transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contato</h4>
            <ul className="flex flex-col gap-2">
              <li><a href={WA_LINK} target="_blank" rel="noreferrer" className="hover:text-[#F5A623] transition-colors">📱 {PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-[#F5A623] transition-colors">✉️ {EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs mt-8">
          © {new Date().getFullYear()} S&P Energia Solar. Todos os direitos reservados.
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a href={WA_LINK} target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-all hover:scale-110"
        aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
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
