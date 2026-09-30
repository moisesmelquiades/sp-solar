import { Link } from 'react-router-dom'

const EMAIL = 'midiaspsolar@gmail.com'
const SITE = 'https://sergiopessoasolar.com.br'

const secoes = [
  {
    titulo: '1. Sobre esta Política',
    corpo: (
      <>
        <p>
          A presente Política de Privacidade descreve como a <strong>SERGIO RICARDO SOARES PESSOA REPRESENTAÇÕES COMERCIAIS</strong>,
          inscrita sob o CNPJ <strong>24.335.590/0001-71</strong> ("S&amp;P Energia Solar"), responsável pelo site institucional{' '}
          <strong>{SITE}</strong>, coleta, utiliza, armazena, compartilha e protege os dados pessoais de seus visitantes e
          clientes, em conformidade com a Lei nº 13.709/2018 (LGPD).
        </p>
        <p>Ao navegar neste site, enviar sua conta de luz pelo WhatsApp ou entrar em contato conosco, você declara estar ciente dos termos aqui descritos.</p>
      </>
    ),
  },
  {
    titulo: '2. Dados Coletados',
    corpo: (
      <>
        <p><strong>Dados fornecidos voluntariamente:</strong></p>
        <ul>
          <li>Nome</li>
          <li>Telefone / WhatsApp</li>
          <li>E-mail</li>
          <li>Endereço do imóvel onde o sistema solar será instalado</li>
          <li>Conta de energia elétrica (histórico de consumo), quando enviada para análise</li>
        </ul>
        <p><strong>Dados coletados automaticamente:</strong></p>
        <ul>
          <li>Endereço IP</li>
          <li>Tipo de navegador e dispositivo</li>
          <li>Cookies e dados de navegação (analytics)</li>
        </ul>
      </>
    ),
  },
  {
    titulo: '3. Finalidade da Coleta',
    corpo: (
      <ul>
        <li>Elaborar análise gratuita de potencial de geração e orçamento</li>
        <li>Agendar visita técnica e conduzir o projeto de instalação</li>
        <li>Enviar propostas, contratos e atualizações sobre o andamento do serviço</li>
        <li>Cumprir obrigações legais, fiscais e regulatórias (incluindo junto à distribuidora de energia)</li>
        <li>Prevenir fraudes e incidentes de segurança</li>
      </ul>
    ),
  },
  {
    titulo: '4. Base Legal para Tratamento dos Dados',
    corpo: (
      <>
        <p>O tratamento dos dados pessoais ocorre com base nas hipóteses previstas pela LGPD (Lei nº 13.709/2018):</p>
        <ul>
          <li>Consentimento do titular</li>
          <li>Execução de procedimentos preliminares e do contrato de instalação do sistema solar</li>
          <li>Cumprimento de obrigação legal ou regulatória</li>
          <li>Legítimo interesse</li>
        </ul>
      </>
    ),
  },
  {
    titulo: '5. Compartilhamento de Dados',
    corpo: (
      <>
        <p>Os dados poderão ser compartilhados com:</p>
        <ul>
          <li>Prestadores de serviços de hospedagem e infraestrutura</li>
          <li>Serviços de análise e marketing (Google Analytics, Google Tag Manager, Meta Pixel)</li>
          <li>Plataforma de atendimento e API oficial do WhatsApp Business, para comunicação sobre seu orçamento e projeto</li>
          <li>Distribuidora de energia e órgãos reguladores, quando necessário ao processo de homologação</li>
          <li>Autoridades públicas, quando exigido por lei</li>
        </ul>
        <p>Não vendemos dados pessoais a terceiros.</p>
      </>
    ),
  },
  {
    titulo: '6. Armazenamento e Segurança',
    corpo: (
      <ul>
        <li>Criptografia em trânsito (HTTPS/SSL)</li>
        <li>Controle de acesso restrito à equipe responsável</li>
        <li>Monitoramento e políticas de backup</li>
      </ul>
    ),
  },
  {
    titulo: '7. Cookies e Tecnologias Semelhantes',
    corpo: (
      <>
        <p>Utilizamos cookies para analisar o tráfego do site, entender a origem dos visitantes (campanhas, buscas) e personalizar a experiência de navegação. O usuário pode desativar os cookies nas configurações do navegador.</p>
      </>
    ),
  },
  {
    titulo: '8. Direitos do Titular',
    corpo: (
      <>
        <p>Nos termos da LGPD, você poderá solicitar: confirmação do tratamento, acesso aos seus dados, correção de informações incorretas, anonimização ou bloqueio de dados desnecessários, portabilidade, eliminação dos dados tratados com consentimento e revogação do consentimento.</p>
        <p>Para exercer seus direitos, entre em contato pelo e-mail: <a href={`mailto:${EMAIL}`} style={{ color: '#FEB000' }}>{EMAIL}</a></p>
      </>
    ),
  },
  {
    titulo: '9. Retenção dos Dados',
    corpo: <p>Os dados serão armazenados pelo período necessário para cumprimento das finalidades previstas nesta política ou conforme exigido pela legislação aplicável.</p>,
  },
  {
    titulo: '10. Alterações desta Política',
    corpo: <p>Esta Política poderá ser alterada a qualquer momento para adequação legal, operacional ou tecnológica. A versão atualizada será publicada em <strong>{SITE}/privacidade</strong> com a data de revisão.</p>,
  },
  {
    titulo: '11. Encarregado de Proteção de Dados (DPO)',
    corpo: (
      <>
        <p><strong>Empresa:</strong> Sergio Ricardo Soares Pessoa Representações Comerciais ("S&amp;P Energia Solar")</p>
        <p><strong>CNPJ:</strong> 24.335.590/0001-71</p>
        <p><strong>Endereço:</strong> Rua Manoel Caldas de Araujo, 71, Centro, Abreu e Lima - PE, CEP 53.510-170</p>
        <p><strong>E-mail:</strong> <a href={`mailto:${EMAIL}`} style={{ color: '#FEB000' }}>{EMAIL}</a></p>
      </>
    ),
  },
]

export default function PoliticaPrivacidade() {
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
          Política de Privacidade
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
