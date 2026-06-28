import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Puck } from '@measured/puck'
import '@measured/puck/puck.css'
import { pb, getPageData, savePageData } from '../lib/pocketbase'
import { puckConfig, DEFAULT_PUCK_DATA } from '../puck/config'

export default function PageEditor() {
  const [data, setData] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!pb.authStore.isValid) { navigate('/login'); return }
    getPageData().then(d => setData(d || DEFAULT_PUCK_DATA))
  }, [navigate])

  async function handlePublish(d) {
    setSalvando(true)
    await savePageData(d)
    setSalvando(false)
    alert('Conteúdo publicado com sucesso!')
  }

  if (!data) return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center text-white">
      Carregando editor...
    </div>
  )

  return (
    <div className="h-screen">
      <Puck
        config={puckConfig}
        data={data}
        onPublish={handlePublish}
        overrides={{
          header: ({ actions }) => (
            <div className="flex items-center justify-between px-4 py-3 bg-[#0A1628] border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src="/images/logo-white.png" alt="S&P Solar" className="h-8" />
                <span className="text-white text-sm font-medium">Editor de Conteúdo</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/admin')}
                  className="text-blue-300 hover:text-white text-sm transition-colors"
                >
                  ← Dashboard
                </button>
                {actions}
              </div>
            </div>
          ),
          actionBar: ({ children }) => (
            <div className="flex gap-2">
              {salvando ? (
                <span className="text-sm text-blue-300 px-4 py-2">Salvando...</span>
              ) : children}
            </div>
          ),
        }}
      />
    </div>
  )
}
