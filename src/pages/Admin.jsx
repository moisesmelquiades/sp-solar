import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { pb, getSiteAtivo, setSiteAtivo } from '../lib/pocketbase'

export default function Admin() {
  const [siteAtivo, setSiteAtivoState] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!pb.authStore.isValid) { navigate('/login'); return }
    getSiteAtivo().then(setSiteAtivoState)
  }, [navigate])

  async function toggleSite() {
    setSalvando(true)
    const novo = !siteAtivo
    await setSiteAtivo(novo)
    setSiteAtivoState(novo)
    setSalvando(false)
  }

  function sair() {
    pb.authStore.clear()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A1628] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <img src="/images/logo-white.png" alt="S&P Energia Solar" className="h-12" />
          <p className="text-xs text-blue-300 mt-2">Painel Admin</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white font-medium text-sm">
            🏠 Dashboard
          </Link>
          <Link to="/admin/paginas" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-blue-200 text-sm transition-colors">
            ✏️ Editar Conteúdo
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={sair} className="w-full text-left text-sm text-blue-300 hover:text-white transition-colors px-4 py-2">
            → Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#0A1628] mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Toggle site */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-800 mb-1">Status do Site</h2>
            <p className="text-sm text-gray-500 mb-6">
              Quando desativado, visitantes veem uma tela "Em breve".
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSite}
                disabled={salvando}
                className={`relative w-14 h-7 rounded-full transition-colors ${siteAtivo ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${siteAtivo ? 'translate-x-7' : ''}`} />
              </button>
              <span className={`font-semibold text-sm ${siteAtivo ? 'text-green-600' : 'text-gray-500'}`}>
                {salvando ? 'Salvando...' : siteAtivo ? 'Site no ar ✓' : 'Site desativado'}
              </span>
            </div>
          </div>

          {/* Atalho editar */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-gray-800 mb-1">Conteúdo do Site</h2>
              <p className="text-sm text-gray-500">Edite textos, títulos, perguntas e números.</p>
            </div>
            <Link
              to="/admin/paginas"
              className="mt-6 bg-[#1B4FBF] hover:bg-[#0A1628] text-white font-bold px-6 py-3 rounded-xl transition-colors text-center text-sm inline-block"
            >
              ✏️ Abrir Editor
            </Link>
          </div>

          {/* Ver site */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-gray-800 mb-1">Ver Site</h2>
              <p className="text-sm text-gray-500">Visualize o site como os visitantes veem.</p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 border-2 border-[#1B4FBF] text-[#1B4FBF] font-bold px-6 py-3 rounded-xl transition-colors text-center text-sm inline-block hover:bg-[#1B4FBF] hover:text-white"
            >
              🌐 Abrir Site
            </a>
          </div>

          {/* Info */}
          <div className="bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-2xl p-6">
            <h2 className="font-bold text-[#0A1628] mb-1">☀️ S&P Energia Solar</h2>
            <p className="text-sm text-gray-600">
              Conectando você a um futuro mais limpo.
            </p>
            <div className="mt-4 text-sm text-gray-500 flex flex-col gap-1">
              <span>📱 +55 81 9412-5508</span>
              <span>✉️ midiaspsolar@gmail.com</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
