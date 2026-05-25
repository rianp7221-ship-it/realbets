'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bet, setBet] = useState(null);
  const [betValue, setBetValue] = useState('10');

  // Chave da API injetada diretamente
  const API_KEY = "219415e7d2ff117cc0e96919766c5479"; 

  useEffect(() => {
    async function fetchRealGames() {
      try {
        // Busca os jogos que estão rolando AO VIVO agora no planeta
        let response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': API_KEY,
          }
        });
        
        let data = await response.json();
        
        // Se não houver nenhum jogo ao vivo no exato momento, busca as partidas agendadas para o dia de hoje
        if (!data.response || data.response.length === 0) {
          const today = new Date().toISOString().split('T')[0];
          response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': API_KEY,
            }
          });
          data = await response.json();
        }

        if (data.response && data.response.length > 0) {
          // Organiza e limita em até 12 jogos na tela para não sobrecarregar o layout
          const realFixtures = data.response.slice(0, 12).map((item, index) => {
            const seed = item.fixture.id || index;
            // Cálculo matemático para gerar ODDS realistas e estáveis baseadas no ID único do jogo
            const oddCasa = parseFloat((1.4 + (seed % 5) * 0.4).toFixed(2));
            const oddEmpate = parseFloat((2.9 + (seed % 3) * 0.3).toFixed(2));
            const oddFora = parseFloat((1.9 + (seed % 7) * 0.5).toFixed(2));

            let statusTempo = 'Em breve';
            if (item.fixture.status.short === 'LIVE' || item.fixture.status.elapsed) {
              statusTempo = `AO VIVO - ${item.fixture.status.elapsed}'`;
            } else if (item.fixture.status.short === 'NS') {
              const horaJogo = new Date(item.fixture.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
              statusTempo = `Hoje ${horaJogo}`;
            }

            return {
              id: item.fixture.id || index,
              teams: `${item.teams.home.name} × ${item.teams.away.name}`,
              league: item.league.name,
              time: statusTempo,
              odds: [oddCasa, oddEmpate, oddFora]
            };
          });
          setGames(realFixtures);
        } else {
          // Lista de contingência estrutural caso os servidores da API fiquem temporariamente sem resposta
          setGames([
            { id: 901, teams: 'Real Madrid × Barcelona', league: 'La Liga', time: 'Hoje 16:00', odds: [2.10, 3.40, 3.10] },
            { id: 902, teams: 'Flamengo × Palmeiras', league: 'Brasileirão Série A', time: 'Hoje 18:30', odds: [1.95, 3.30, 3.80] },
            { id: 903, teams: 'Manchester City × Liverpool', league: 'Premier League', time: 'Hoje 20:00', odds: [1.80, 3.90, 4.20] }
          ]);
        }
      } catch (error) {
        console.error("Erro na integração com os dados da API-Sports:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRealGames();
  }, [API_KEY]);

  const handleSelectBet = (gameTeams, type, odd) => {
    setBet({ game: gameTeams, type: type === 0 ? 'Casa' : type === 1 ? 'Empate' : 'Fora', odd: odd });
  };

  const possibleGain = bet ? (parseFloat(betValue || 0) * bet.odd).toFixed(2) : 0;

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER ESTILO BET365 */}
      <header style={{ backgroundColor: '#005a42', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #ffdf1b', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#ffffff', fontWeight: '900', fontSize: '24px', letterSpacing: '-1px' }}>
            REAL<span style={{ color: '#ffdf1b' }}>BETS</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: 'transparent', color: '#ffffff', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
          <button style={{ backgroundColor: '#ffdf1b', color: '#003b2b', border: 'none', fontSize: '14px', fontWeight: 'bold', padding: '8px 18px', borderRadius: '3px', cursor: 'pointer' }}>Registre-se</button>
        </div>
      </header>

      {/* PAINEL CENTRAL DE JOGOS E CUPOM */}
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', maxWidth: '1200px', width: '100%', margin: '20px auto', padding: '0 20px', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* LISTAGEM DOS CONFRONTOS OBTIDOS DA API */}
        <main style={{ flex: 2, minWidth: '300px' }}>
          <div style={{ background: 'linear-gradient(180deg, #003b2b 0%, #00241a 100%)', padding: '22px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #2a2a2a' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#ffdf1b', letterSpacing: '0.5px' }}>RUMO AO HEXA</h1>
            <p style={{ color: '#a3a3a3', fontSize: '14px', margin: 0 }}>Dados esportivos em tempo real integrados com os campeonatos globais.</p>
          </div>

          <h2 style={{ fontSize: '15px', color: '#ffdf1b', borderLeft: '4px solid #12c156', paddingLeft: '10px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ⚽ Partidas em Andamento / Próximos Jogos
          </h2>

          {loading ? (
            <div style={{ color: '#ffdf1b', textAlign: 'center', padding: '50px', fontSize: '15px', fontWeight: 'bold' }}>
              🔄 Conectando aos servidores de dados esportivos da API...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {games.map((game) => (
                <div key={game.id} style={{ backgroundColor: '#242424', borderRadius: '6px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333', flexWrap: 'wrap', gap: '15px' }}>
                  <div>
                    <span style={{ color: game.time.includes('AO VIVO') ? '#12c156' : '#ffdf1b', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>{game.time}</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', display: 'block', color: '#fff' }}>{game.teams}</span>
                    <span style={{ color: '#888', fontSize: '12px' }}>{game.league}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {game.odds.map((odd, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleSelectBet(game.teams, idx, odd)}
                        style={{ backgroundColor: '#333', border: '1px solid #444', padding: '10px 0', borderRadius: '4px', textAlign: 'center', color: '#ffdf1b', cursor: 'pointer', width: '68px', transition: 'all 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333'}
                      >
                        <span style={{ display: 'block', fontSize: '10px', color: '#888', marginBottom: '2px' }}>{idx === 0 ? '1' : idx === 1 ? 'X' : '2'}</span>
                        <strong style={{ fontSize: '13px' }}>{odd.toFixed(2)}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* INTERAÇÃO DO CUPOM DE PALPITES */}
        <aside style={{ flex: 1, minWidth: '280px', backgroundColor: '#212121', borderRadius: '6px', border: '1px solid #333', height: 'fit-content', padding: '15px' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#ffffff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>📋 Cupom de Apostas</h3>

          {bet ? (
            <div>
              <div style={{ backgroundColor: '#2d2d2d', padding: '12px', borderRadius: '4px', marginBottom: '15px', borderLeft: '3px solid #ffdf1b' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', display: 'block' }}>{bet.game}</span>
                <span style={{ fontSize: '12px', color: '#a3a3a3' }}>Resultado Final: <strong style={{ color: '#fff' }}>{bet.type}</strong></span>
                <span style={{ fontSize: '14px', color: '#ffdf1b', fontWeight: 'bold', display: 'block', marginTop: '6px' }}>ODDS: {bet.odd.toFixed(2)}</span>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', color: '#a3a3a3', display: 'block', marginBottom: '5px' }}>Valor do Palpite (R$):</label>
                <input type="number" value={betValue} onChange={(e) => setBetValue(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '15px' }}>
                <span style={{ color: '#a3a3a3' }}>Retorno Possível:</span>
                <span style={{ color: '#12c156', fontWeight: 'bold' }}>R$ {possibleGain}</span>
              </div>

              <button onClick={() => alert('Aposta Computada com sucesso!')} style={{ width: '100%', backgroundColor: '#12c156', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fazer Aposta</button>
              <button onClick={() => setBet(null)} style={{ width: '100%', backgroundColor: 'transparent', color: '#aaa', border: 'none', padding: '8px', fontSize: '12px', cursor: 'pointer', marginTop: '5px' }}>Cancelar</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '35px 10px', color: '#666' }}>
              <p style={{ margin: 0, fontSize: '13px' }}>Selecione um dos mercados ao lado para abrir o bilhete.</p>
            </div>
          )}
        </aside>
      </div>

      {/* RODAPÉ */}
      <footer style={{ textAlign: 'center', padding: '20px', color: '#444', fontSize: '11px', borderTop: '1px solid #222', marginTop: 'auto' }}>
        <p style={{ margin: '0 0 5px 0' }}>Proibido para menores de 18 anos. Jogue com responsabilidade.</p>
        <p style={{ margin: 0 }}>© 2026 REALBETS - Sistema Esportivo Conectado.</p>
      </footer>
    </div>
  );
}
