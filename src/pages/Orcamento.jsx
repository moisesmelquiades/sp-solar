import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const API = 'https://zceqvrjtfnliavrzczjt.supabase.co/functions/v1/orcamento-site'
const WA_NUMERO = '558173447018' // reserva; o servidor devolve o número do CRM

const NAVY = '#08183D'
const AMBER = '#FEB000'
const INK = '#EAF0F8'
const SOFT = 'rgba(233,240,250,.68)'
const LINE = 'rgba(233,240,250,.16)'

const MODOS = [
  { id: 'valor', titulo: 'Valor da conta', dica: 'Quanto você paga por mês', prefixo: 'R$', placeholder: '450,00' },
  { id: 'kwh', titulo: 'Consumo em kWh', dica: 'Está escrito na sua conta de luz', prefixo: 'kWh', placeholder: '380' },
]

const fmt = n => new Intl.NumberFormat('pt-BR').format(n)
const fmtKw = n => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(n)

async function chamar(corpo) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  })
  const dados = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(dados.error || 'Não foi possível concluir agora. Tente de novo em instantes.')
  return dados
}

function origemDaVisita() {
  const q = new URLSearchParams(location.search)
  const o = { path: location.pathname, referrer: document.referrer || '' }
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid']) {
    if (q.get(k)) o[k] = q.get(k)
  }
  return o
}

function Rotulo({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
      <span style={{ width: '30px', height: '1px', background: AMBER }} />
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '4px', color: AMBER, textTransform: 'uppercase' }}>{children}</span>
    </div>
  )
}

function Numero({ valor, rotulo, destaque }) {
  return (
    <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: '18px' }}>
      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: destaque ? 'clamp(54px,9vw,84px)' : 'clamp(34px,5vw,44px)', lineHeight: 1, color: destaque ? AMBER : INK, letterSpacing: '-.5px' }}>{valor}</div>
      <div style={{ fontSize: '14px', color: SOFT, marginTop: '8px' }}>{rotulo}</div>
    </div>
  )
}

const campo = {
  width: '100%', boxSizing: 'border-box', padding: '15px 18px', borderRadius: '12px', fontSize: '17px',
  background: 'rgba(233,240,250,.06)', border: `1px solid ${LINE}`, color: INK, outline: 'none',
  fontFamily: "'Hanken Grotesk', sans-serif",
}

export default function Orcamento() {
  const [modo, setModo] = useState('valor')
  const [valor, setValor] = useState('')
  const [calculando, setCalculando] = useState(false)
  const [erro, setErro] = useState('')
  const [dados, setDados] = useState(null) // { resultado, optin }

  const [nome, setNome] = useState('')
  const [zap, setZap] = useState('')
  const [aceito, setAceito] = useState(false)
  const [isca, setIsca] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState('')
  const [enviado, setEnviado] = useState(null) // { codigo, url }
  const formVisivelEm = useRef(0)
  const resultadoRef = useRef(null)

  useEffect(() => { document.title = 'Orçamento de energia solar | S&P Energia Solar' }, [])

  const modoAtual = MODOS.find(m => m.id === modo)

  async function calcular(e) {
    e.preventDefault()
    setErro(''); setDados(null); setEnviado(null); setErroEnvio('')
    setCalculando(true)
    try {
      const d = await chamar({ acao: 'calcular', modo, valor })
      setDados(d)
      formVisivelEm.current = Date.now()
      setTimeout(() => resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    } catch (err) {
      setErro(err.message)
    } finally {
      setCalculando(false)
    }
  }

  async function enviar(e) {
    e.preventDefault()
    setErroEnvio('')
    if (nome.trim().length < 2) return setErroEnvio('Informe seu nome.')
    if (zap.replace(/\D/g, '').length < 10) return setErroEnvio('Informe seu WhatsApp com DDD.')
    if (!aceito) return setErroEnvio('Marque a caixa para aceitar receber mensagens.')

    // O celular só deixa abrir o WhatsApp se a janela nascer dentro do toque; o
    // endereço entra depois, quando o servidor responde.
    const janela = window.open('about:blank', '_blank')
    setEnviando(true)
    try {
      const d = await chamar({
        acao: 'enviar', modo, valor, nome, whatsapp: zap, optin: true, hp: isca,
        tempo_ms: Date.now() - formVisivelEm.current, origem: origemDaVisita(),
      })
      const url = `https://wa.me/${d.whatsapp_destino || WA_NUMERO}?text=${encodeURIComponent(d.mensagem)}`
      setEnviado({ codigo: d.codigo, url })
      if (janela) janela.location.href = url
      else window.location.href = url
    } catch (err) {
      if (janela) janela.close()
      setErroEnvio(err.message)
    } finally {
      setEnviando(false)
    }
  }

  const r = dados?.resultado

  return (
    <div style={{ minHeight: '100vh', background: NAVY, color: INK, fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <header style={{ borderBottom: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '16px max(20px,4vw)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <Link to="/"><img src="/images/logo-white.png" alt="S&P Energia Solar" style={{ height: "64px", width: "auto", display: "block" }} /></Link>
          <Link to="/" style={{ color: SOFT, textDecoration: 'none', fontSize: '14px' }}>← Voltar ao site</Link>
        </div>
      </header>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(40px,8vw,90px) max(20px,4vw) 120px' }}>
        <Rotulo>Orçamento</Rotulo>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(40px,6vw,64px)', lineHeight: 1.04, margin: '0 0 20px', letterSpacing: '-.6px' }}>
          Descubra o sistema solar <span style={{ color: AMBER, fontStyle: 'italic' }}>ideal</span> para você
        </h1>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: SOFT, margin: '0 0 44px' }}>
          Calculamos o tamanho do sistema pelo seu gasto de energia. Escolha abaixo como quer informar:
          pelo valor da conta ou pelo consumo em kWh.
        </p>

        <form onSubmit={calcular}>
          <div role="radiogroup" aria-label="Como informar" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {MODOS.map(m => {
              const ativo = m.id === modo
              return (
                <button key={m.id} type="button" role="radio" aria-checked={ativo}
                  onClick={() => { setModo(m.id); setValor(''); setErro('') }}
                  style={{
                    textAlign: 'left', padding: '16px 18px', borderRadius: '14px', cursor: 'pointer',
                    background: ativo ? 'rgba(254,176,0,.12)' : 'rgba(233,240,250,.04)',
                    border: `1px solid ${ativo ? AMBER : LINE}`, color: INK, fontFamily: 'inherit',
                    transition: 'border-color .2s ease, background .2s ease',
                  }}>
                  <div style={{ fontWeight: 600, fontSize: '16px' }}>{m.titulo}</div>
                  <div style={{ fontSize: '13px', color: SOFT, marginTop: '4px' }}>{m.dica}</div>
                </button>
              )
            })}
          </div>

          <label htmlFor="valor" style={{ display: 'block', fontSize: '14px', color: SOFT, marginBottom: '8px' }}>
            {modo === 'valor' ? 'Valor médio da sua conta de luz (por mês)' : 'Consumo médio mensal (kWh)'}
          </label>
          <div style={{ display: 'flex', alignItems: 'stretch', gap: '0', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', padding: '0 18px', borderRadius: '12px 0 0 12px', border: `1px solid ${LINE}`, borderRight: 'none', background: 'rgba(233,240,250,.1)', fontFamily: "'Space Mono', monospace", fontSize: '14px', color: AMBER }}>{modoAtual.prefixo}</span>
            <input id="valor" value={valor} inputMode="decimal" autoComplete="off" required
              onChange={e => setValor(e.target.value.replace(/[^\d.,]/g, ''))}
              placeholder={modoAtual.placeholder} style={{ ...campo, borderRadius: '0 12px 12px 0' }} />
          </div>

          {erro && <p role="alert" style={{ color: '#FFB4A8', fontSize: '15px', margin: '0 0 16px' }}>{erro}</p>}

          <button type="submit" disabled={calculando} style={{ background: AMBER, color: NAVY, fontWeight: 700, fontSize: '17px', padding: '17px 36px', borderRadius: '100px', border: 'none', cursor: calculando ? 'wait' : 'pointer', opacity: calculando ? .7 : 1, fontFamily: 'inherit' }}>
            {calculando ? 'Calculando…' : 'Calcular meu sistema'}
          </button>
        </form>

        {r && (
          <section ref={resultadoRef} aria-live="polite" style={{ marginTop: '72px', scrollMarginTop: '24px' }}>
            <Rotulo>Seu sistema</Rotulo>
            <div style={{ display: 'grid', gap: '28px' }}>
              <Numero destaque valor={`${r.qtd_modulos} placas`} rotulo={`de ${r.potencia_modulo_wp} Wp cada — sistema de ${fmtKw(r.potencia_kwp)} kWp`} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '28px' }}>
                <Numero valor={`${fmtKw(r.inversor_kw)} kW`} rotulo="inversor ideal" />
                <Numero valor={`${fmt(r.geracao_estimada_kwh)} kWh`} rotulo="geração estimada por mês" />
              </div>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: SOFT, margin: '28px 0 0' }}>
              Base do cálculo: consumo de {fmt(r.consumo_kwh)} kWh{r.modo === 'valor' ? ` (conta de R$ ${fmt(r.valor_informado)})` : ''}. É uma estimativa inicial; o projeto final depende da visita técnica.
            </p>

            {/* ---- formulário ---- */}
            <div style={{ marginTop: '56px', padding: 'clamp(24px,4vw,40px)', borderRadius: '20px', background: 'rgba(233,240,250,.05)', border: `1px solid ${LINE}` }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,38px)', lineHeight: 1.1, margin: '0 0 10px' }}>
                Quer saber quanto fica e as formas de pagamento?
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: SOFT, margin: '0 0 26px' }}>
                Preencha seus dados e toque no botão. Vamos abrir o WhatsApp com o resultado do seu
                orçamento já escrito — é só enviar.
              </p>

              {enviado ? (
                <div role="status">
                  <p style={{ fontSize: '17px', margin: '0 0 6px', color: INK }}>Orçamento <strong style={{ color: AMBER }}>{enviado.codigo}</strong> registrado.</p>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: SOFT, margin: '0 0 20px' }}>
                    Toque em <strong>enviar</strong> no WhatsApp para começar a conversa. Se ele não abriu:
                  </p>
                  <a href={enviado.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: AMBER, color: NAVY, fontWeight: 700, fontSize: '16px', padding: '15px 30px', borderRadius: '100px', textDecoration: 'none' }}>
                    Abrir o WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={enviar} style={{ display: 'grid', gap: '14px' }}>
                  <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" autoComplete="name" maxLength={80} aria-label="Seu nome" style={campo} />
                  <input value={zap} onChange={e => setZap(e.target.value)} placeholder="Seu WhatsApp com DDD" autoComplete="tel" inputMode="tel" aria-label="Seu WhatsApp" style={campo} />
                  {/* campo-isca: pessoa não vê, robô preenche */}
                  <input value={isca} onChange={e => setIsca(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true"
                    style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }} name="website" />

                  <label style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer', fontSize: '14.5px', lineHeight: 1.5, color: INK }}>
                    <input type="checkbox" checked={aceito} onChange={e => setAceito(e.target.checked)}
                      style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: AMBER, flexShrink: 0 }} />
                    <span>{dados.optin.texto}</span>
                  </label>

                  {erroEnvio && <p role="alert" style={{ color: '#FFB4A8', fontSize: '15px', margin: 0 }}>{erroEnvio}</p>}

                  <button type="submit" disabled={enviando || !aceito}
                    style={{ background: AMBER, color: NAVY, fontWeight: 700, fontSize: '17px', padding: '17px 34px', borderRadius: '100px', border: 'none', fontFamily: 'inherit',
                      cursor: enviando ? 'wait' : (aceito ? 'pointer' : 'not-allowed'), opacity: aceito && !enviando ? 1 : .5, transition: 'opacity .2s ease' }}>
                    {enviando ? 'Abrindo o WhatsApp…' : 'Receber meu orçamento no WhatsApp'}
                  </button>
                  <p style={{ fontSize: '12.5px', color: SOFT, margin: 0, lineHeight: 1.5 }}>
                    Seus dados são usados só para o atendimento do seu orçamento. Veja a <Link to="/privacidade" style={{ color: SOFT }}>Política de Privacidade</Link>.
                  </p>
                </form>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
