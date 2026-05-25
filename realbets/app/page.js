'use client';
import { useState } from 'react';

export default function Home() {
  // Estado para controlar a aposta selecionada no cupom
  const [bet, setBet] = useState(null);
  const [betValue, setBetValue] = useState('10');

  const games = [
    { id: 1, teams: 'Real Madrid × Barcelona', league: 'Liga dos Campeões', time: "AO VIVO - 72'", odds: [2.10, 3.40, 3.10] },
    { id: 2, teams: 'Flamengo × Palmeiras', league: 'Série A Brasileirão', time: 'Hoje 21:30', odds: [1.85, 3.60, 4.20] },
    { id: 3, teams: 'Manchester City × Liverpool', league: 'Premier League', time: 'Amanhã 16:00', odds: [1.95, 3.80, 3.50] }
  ];

  const handleSelectBet = (gameTeams, type, odd) => {
    setBet({ game: gameTeams, type: type === 0 ? 'Casa' : type === 1 ? 'Empate' : 'Fora', odd: odd });
  };

  const possibleGain = bet ? (parseFloat(betValue || 0) * bet.odd).toFixed(2) : 0;

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      margin: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* HEADER PRINCIPAL BET365 */}
      <header style={{
        backgroundColor: '#005a42',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '3px solid #ffdf1b',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ color: '#ffffff', fontWeight: '900', fontSize: '24px', letterSpacing: '-1px' }}>
            REAL<span style={{ color: '#ffdf1b' }}>BETS</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: 'transparent', color: '#ffffff', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
          <button style={{ backgroundColor: '#ffdf1b', color: '#003b2b', border: 'none', fontSize: '14px', fontWeight: 'bold', padding: '8px 16px', borderRadius: '3px', cursor: 'pointer' }}>Registre-se</button>
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO PRINCIPAL + CUPOM */}
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', maxWidth: '1200px', width: '100%', margin: '20px auto', padding: '0 20px', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* LISTA DE JOGOS (ESQUERDA) */}
        <main style={{ flex: 2, minWidth: '300px' }}>
          <div style={{ background: 'linear-gradient(180deg, #003b2b 0%, #00241a 100%)', padding: '20px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #333' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#ffdf1b' }}>RUMO AO HEXA</h1>
            <p style={{ color: '#ccc', fontSize: '14px', margin: 0 }}>As melhores ODDS do mercado esportivo estão aqui.</p>
          </div>

          <h2 style={{ fontSize: '16px', color: '#ffdf1b', borderLeft: '4px solid #12c156', paddingLeft: '10px', marginBottom: '15px', textTransform: 'uppercase' }}>
            ⚽ Principais Confrontos
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {games.map((game) => (
              <div key={game.id} style={{ backgroundColor: '#262626', borderRadius: '6px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <span style={{ color: game.time.includes('AO VIVO') ? '#12c156' : '#a3a3a3', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>{game.time}</span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', display: 'block' }}>{game.teams}</span>
                  <span style={{ color: '#a3a3a3', fontSize: '12px' }}>{game.league}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {game.odds.map((odd, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleSelectBet(game.teams, idx, odd)}
                      style={{
                        backgroundColor: '#333',
                        border: '1px solid #444',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        color: '#ffdf1b',
                        cursor: 'pointer',
                        width: '65px',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
                    >
                      <span style={{ display: 'block', fontSize: '10px', color: '#a3a3a3' }}>{idx === 0 ? '1' : idx === 1 ? 'X' : '2'}</span>
                      <strong>{odd.toFixed(2)}</strong>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* CUPOM DE APOSTAS INTERATIVO (DIREITA) */}
        <aside style={{ flex: 1, minWidth: '280px', backgroundColor: '#212121', borderRadius: '6px', border: '1px solid #333', height: 'fit-content', padding: '15px' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#ffffff', borderBottom: '1px solid #333', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span>📋 Cupom de Apostas</span>
            {bet && <span style={{ color: '#12c156', fontSize: '12px' }}>● Ativo</span>}
          </h3>

          {bet ? (
            <div>
              <div style={{ backgroundColor: '#2d2d2d', padding: '10px', borderRadius: '4px', marginBottom: '15px', borderLeft: '3px solid #ffdf1b' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', display: 'block' }}>{bet.game}</span>
                <span style={{ fontSize: '12px', color: '#a3a3a3' }}>Mercado: Resultado Final ({bet.type})</span>
                <span style={{ fontSize: '14px', color: '#ffdf1b', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>ODDS: {bet.odd.toFixed(2)}</span>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#a3a3a3', display: 'block', marginBottom: '5px' }}>Valor da Aposta (R$):</label>
                <input 
                  type="number" 
                  value={betValue} 
                  onChange={(e) => setBetValue(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '15px', padding: '0 5px' }}>
                <span style={{ color: '#a3a3a3' }}>Retorno Potencial:</span>
                <span style={{ color: '#12c156', fontWeight: 'bold' }}>R$ {possibleGain}</span>
              </div>

              <button onClick={() => alert('Aposta realizada com sucesso!')} style={{ width: '100%', backgroundColor: '#12c156', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase' }}>
                Fazer Aposta
              </button>
              
              <button onClick={() => setBet(null)} style={{ width: '100%', backgroundColor: 'transparent', color: '#aaa', border: 'none', padding: '8px', fontSize: '12px', cursor: 'pointer', marginTop: '5px' }}>
                Cancelar
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#666' }}>
              <p style={{ margin: 0, fontSize: '13px' }}>Selecione uma das ODDS ao lado para iniciar o seu palpite.</p>
            </div>
          )}
        </aside>

      </div>

      {/* RODAPÉ */}
      <footer style={{ textAlign: 'center', padding: '20px', color: '#444', fontSize: '11px', borderTop: '1px solid #222', marginTop: 'auto' }}>
        <p style={{ margin: '0 0 5px 0' }}>Proibido para menores de 18 anos. Jogue com responsabilidade.</p>
        <p style={{ margin: 0 }}>© 2026 REALBETS - Plataforma Independente.</p>
      </footer>
    </div>
  );
}
