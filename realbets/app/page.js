export default function Home() {
  const affiliateLink = "https://realsports.top";

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      margin: 0,
      paddingBottom: '50px'
    }}>
      {/* HEADER ESTILO BET365 */}
      <header style={{
        backgroundColor: '#005a42',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '3px solid #ffdf1b',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '24px',
            letterSpacing: '-1px'
          }}>
            REAL<span style={{ color: '#ffdf1b' }}>SPORTS</span>
          </span>
          <span style={{
            backgroundColor: '#ffdf1b',
            color: '#005a42',
            fontSize: '11px',
            fontWeight: 'bold',
            padding: '2px 6px',
            borderRadius: '3px',
            textTransform: 'uppercase'
          }}>.TOP</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href={affiliateLink} style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            alignSelf: 'center',
            padding: '8px 15px'
          }}>Login</a>
          <a href={affiliateLink} style={{
            backgroundColor: '#ffdf1b',
            color: '#003b2b',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '8px 20px',
            borderRadius: '3px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>Registre-se</a>
        </div>
      </header>

      {/* BANNER PRINCIPAL DE BÔNUS */}
      <section style={{
        background: 'linear-gradient(180deg, #003b2b 0%, #00241a 100%)',
        padding: '40px 20px',
        textAlign: 'center',
        borderBottom: '1px solid #333'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#ffffff' }}>
          BÔNUS DE BOAS-VINDAS DE ATÉ <span style={{ color: '#ffdf1b' }}>R$ 500</span>
        </h1>
        <p style={{ color: '#a3a3a3', fontSize: '16px', margin: '0 0 25px 0' }}>
          Registre-se hoje, deposite e duplique sua banca na maior das Américas.
        </p>
        <a href={affiliateLink} style={{
          backgroundColor: '#12c156',
          color: '#ffffff',
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: 'bold',
          padding: '14px 40px',
          borderRadius: '4px',
          display: 'inline-block',
          boxShadow: '0 4px 15px rgba(18, 193, 86, 0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Aproveitar Bônus Agora RUMO AO HEXA
        </a>
      </section>

      {/* PAINEL DE JOGOS E ODDS EM DESTAQUE */}
      <main style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
        <h2 style={{
          fontSize: '18px',
          color: '#ffdf1b',
          borderLeft: '4px solid #12c156',
          paddingLeft: '10px',
          marginBottom: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          ⚽ Principais Partidas - Ao Vivo e Destaques
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* CARD JOGO 1 */}
          <div style={{
            backgroundColor: '#262626',
            borderRadius: '6px',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #333'
          }}>
            <div>
              <span style={{ color: '#12c156', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>AO VIVO - 72'</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>Real Madrid × Barcelona</span>
              <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Liga dos Campeões</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={affiliateLink} style={{ textDecoration: 'none', backgroundColor: '#333', padding: '10px 20px', borderRadius: '4px', textAlign: 'center', color: '#ffdf1b' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#a3a3a3' }}>1</span>
                <strong>2.10</strong>
              </a>
              <a href={affiliateLink} style={{ textDecoration: 'none', backgroundColor: '#333', padding: '10px 20px', borderRadius: '4px', textAlign: 'center', color: '#ffdf1b' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#a3a3a3' }}>X</span>
                <strong>3.40</strong>
              </a>
              <a href={affiliateLink} style={{ textDecoration: 'none', backgroundColor: '#333', padding: '10px 20px', borderRadius: '4px', textAlign: 'center', color: '#ffdf1b' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#a3a3a3' }}>2</span>
                <strong>3.10</strong>
              </a>
            </div>
          </div>

          {/* CARD JOGO 2 */}
          <div style={{
            backgroundColor: '#262626',
            borderRadius: '6px',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #333'
          }}>
            <div>
              <span style={{ color: '#a3a3a3', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Hoje 21:30</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>Flamengo × Palmeiras</span>
              <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Série A Brasileirão</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={affiliateLink} style={{ textDecoration: 'none', backgroundColor: '#333', padding: '10px 20px', borderRadius: '4px', textAlign: 'center', color: '#ffdf1b' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#a3a3a3' }}>1</span>
                <strong>1.85</strong>
              </a>
              <a href={affiliateLink} style={{ textDecoration: 'none', backgroundColor: '#333', padding: '10px 20px', borderRadius: '4px', textAlign: 'center', color: '#ffdf1b' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#a3a3a3' }}>X</span>
                <strong>3.60</strong>
              </a>
              <a href={affiliateLink} style={{ textDecoration: 'none', backgroundColor: '#333', padding: '10px 20px', borderRadius: '4px', textAlign: 'center', color: '#ffdf1b' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#a3a3a3' }}>2</span>
                <strong>4.20</strong>
              </a>
            </div>
          </div>
        </div>

        {/* RECURSOS DA PLATAFORMA */}
        <section style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#212121', padding: '20px', borderRadius: '6px', borderTop: '3px solid #12c156' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#ffffff', fontSize: '16px' }}>⚡ Saques Instantâneos</h3>
            <p style={{ margin: 0, color: '#a3a3a3', fontSize: '14px', lineHeight: '1.4' }}>Via PIX na sua conta em menos de 2 minutos. Sem taxas ocultas.</p>
          </div>
          <div style={{ backgroundColor: '#212121', padding: '20px', borderRadius: '6px', borderTop: '3px solid #ffdf1b' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#ffffff', fontSize: '16px' }}>📈 Super ODDS diárias</h3>
            <p style={{ margin: 0, color: '#a3a3a3', fontSize: '14px', lineHeight: '1.4' }}>Cotações turbinadas nos principais eventos de futebol e basquete do mundo.</p>
          </div>
          <div style={{ backgroundColor: '#212121', padding: '20px', borderRadius: '6px', borderTop: '3px solid #12c156' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#ffffff', fontSize: '16px' }}>🛑 Suporte 24h</h3>
            <p style={{ margin: 0, color: '#a3a3a3', fontSize: '14px', lineHeight: '1.4' }}>Atendimento humanizado via chat ao vivo para resolver qualquer dúvida instantaneamente.</p>
          </div>
        </section>
      </main>

      {/* DISQUE JOGO RESPONSÁVEL */}
      <footer style={{ textAlign: 'center', marginTop: '50px', padding: '0 20px', color: '#666', fontSize: '12px' }}>
        <p style={{ marginBottom: '5px' }}>Proibido para menores de 18 anos. Jogue com responsabilidade.</p>
        <p style={{ margin: 0 }}>© 2026 REALSPORTS.TOP - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
