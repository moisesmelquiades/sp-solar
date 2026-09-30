import { Link } from 'react-router-dom'

const EMAIL = 'midiaspsolar@gmail.com'
const SITE = 'https://sergiopessoasolar.com.br'

const secoes = [
  {
    titulo: '1. Aceitação dos Termos',
    corpo: (
      <>
        <p>
          Ao acessar ou utilizar o site <strong>S&amp;P Energia Solar</strong> ({SITE}), você concorda com os
          presentes Termos de Serviço. Caso não concorde, não utilize o site.
        </p>
        <p>
          O site é operado pela <strong>SERGIO RICARDO SOARES PESSOA REPRESENTAÇÕES COMERCIAIS</strong>,
          CNPJ <strong>24.335.590/0001-71</strong>, com sede na Rua Manoel Caldas de Araujo, 71, Centro,
          Abreu e Lima - PE, CEP 53.510-170.
        </p>
      </>
    ),
  },
  {
    titulo: '2. Descrição do Site',
    corpo: (
      <p>
        Este site tem caráter institucional e apresenta os serviços de dimensionamento, venda e instalação de
        sistemas de energia solar fotovoltaica prestados pela S&amp;P Energia Solar. O site disponibiliza
        informações institucionais e um canal de contato/orçamento via WhatsApp. A contratação do serviço de
        instalação é regida por contrato próprio, firmado à parte com o cliente.
      </p>
    ),
  },
  {
    titulo: '3. Uso do Site',
    corpo: (
      <ul>
        <li>As informações fornecidas em formulários de contato e no atendimento devem ser verdadeiras</li>
        <li>É proibido utilizar o site para fins ilícitos</li>
        <li>É proibido tentar acessar áreas restritas sem autorização</li>
        <li>É proibida a reprodução, cópia ou distribuição do conteúdo do site sem autorização prévia</li>
      </ul>
    ),
  },
  {
    titulo: '4. Propriedade Intelectual',
    corpo: (
      <p>
        Todo o conteúdo deste site — logotipo, marca, textos, imagens e design — é de propriedade da
        S&amp;P Energia Solar ou licenciado por ela, protegido pela legislação de propriedade intelectual brasileira.
      </p>
    ),
  },
  {
    titulo: '5. Orçamentos e Propostas',
    corpo: (
      <p>
        A análise de potencial de geração enviada pelo WhatsApp é gratuita e estimada a partir dos dados fornecidos
        pelo cliente (conta de energia, consumo, endereço). O valor final do sistema é confirmado após visita técnica
        e formalizado em proposta e contrato próprios, que prevalecem sobre qualquer estimativa apresentada no site
        ou no primeiro contato.
      </p>
    ),
  },
  {
    titulo: '6. Limitação de Responsabilidade',
    corpo: (
      <>
        <p>A S&amp;P Energia Solar não se responsabiliza por danos decorrentes de:</p>
        <ul>
          <li>Uso indevido do site pelo usuário</li>
          <li>Indisponibilidade temporária do site por manutenção ou falhas técnicas</li>
          <li>Informações fornecidas incorretamente pelo usuário (consumo, endereço, dados de contato)</li>
          <li>Alterações de tarifa, legislação ou regras da distribuidora de energia posteriores à proposta</li>
        </ul>
      </>
    ),
  },
  {
    titulo: '7. Alterações destes Termos',
    corpo: (
      <p>
        Estes Termos de Serviço podem ser alterados a qualquer momento. A versão atualizada será publicada em{' '}
        <strong>{SITE}/termos</strong>. O uso continuado do site após as alterações implica aceitação dos novos termos.
      </p>
    ),
  },
  {
    titulo: '8. Foro e Legislação Aplicável',
    corpo: (
      <p>
        Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de{' '}
        <strong>Abreu e Lima - PE</strong> para dirimir eventuais conflitos, com renúncia a qualquer outro, por mais
        privilegiado que seja.
      </p>
    ),
  },
  {
    titulo: '9. Contato',
    corpo: (
      <>
        <p><strong>Empresa:</strong> Sergio Ricardo Soares Pessoa Representações Comerciais ("S&amp;P Energia Solar")</p>
        <p><strong>CNPJ:</strong> 24.335.590/0001-71</p>
        <p><strong>Endereço:</strong> Rua Manoel Caldas de Araujo, 71, Centro, Abreu e Lima - PE, CEP 53.510-170</p>
        <p><strong>E-mail:</strong> <a href={`mailto:${EMAIL}`} style={{ color: '#FEB000' }}>{EMAIL}</a></p>
        <p><strong>Site:</strong> {SITE}</p>
      </>
    ),
  },
]

export default function TermosServico() {
  return (
    <div className="legal-content" style={{ fontFamily: "'Hanken Grotesk', sans-serif", background: '#08183D', color: 'rgba(233,240,250,.85)', minHeight: '100vh' }}>
      <style>{`
        .legal-content ul { list-style: disc; padding-left: 22px; margin: 10px 0; }
        .legal-content li { margin-bottom: 8px; }
        .legal-content p { margin: 0 0 14px; }
        .legal-content p:last-child { margin-bottom: 0; }
      `}</style>
      <header style={{ borderBottom: '1px solid rgba(233,240,250,.1)', padding: '20px max(20px,4vw)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src="/images/logo-white.png" alt="S&P Energia Solar" style={{ height: '48px', width: 'auto', display: 'block' }} />
          </Link>
          <Link to="/" style={{ fontSize: '14px', color: 'rgba(233,240,250,.7)', textDecoration: 'none' }}>&larr; Voltar ao site</Link>
        </div>
      </header>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(40px,8vw,80px) max(20px,4vw) 100px' }}>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(34px,5vw,48px)', color: '#EAF0F8', margin: '0 0 8px' }}>
          Termos de Serviço
        </h1>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '1.5px', color: '#FEB000', textTransform: 'uppercase', margin: '0 0 48px' }}>
          Última atualização: 23 de setembro de 2026
        </p>

        {secoes.map((s) => (
          <section key={s.titulo} style={{ marginBottom: '38px' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#EAF0F8', margin: '0 0 14px' }}>{s.titulo}</h2>
            <div style={{ fontSize: '15px', lineHeight: 1.75 }}>{s.corpo}</div>
          </section>
        ))}
      </main>

      <footer style={{ borderTop: '1px solid rgba(233,240,250,.1)', padding: '28px max(20px,4vw)', textAlign: 'center' }}>
        <span style={{ fontSize: '12.5px', color: 'rgba(233,240,250,.45)' }}>© {new Date().getFullYear()} S&P Energia Solar. Todos os direitos reservados.</span>
      </footer>
    </div>
  )
}
