'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bet, setBet] = useState(null);
  const [betValue, setBetValue] = useState('10');

  const API_KEY = "219415e7d2ff117cc0e96919766c5479"; 

  useEffect(() => {
    async function fetchRealGames() {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];

        // Busca simultânea: Jogos ao vivo + Jogos do dia
        const [liveRes, todayRes] = await Promise.all([
          fetch('https://v3.football.api-sports.io/fixtures?live=all', { headers: { 'x-rapidapi-host': 'v3.football.api-sports.io', 'x-rapidapi-key': API_KEY } }),
          fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, { headers: { 'x-rapidapi-host': 'v3.football.api-sports.io', 'x-rapidapi-key': API_KEY } })
        ]);

        const liveData = await liveRes.json();
        const todayData = await todayRes.json();

        // Combina e remove duplicatas
        const allFixtures = [...(liveData.response || []), ...(todayData.response || [])];
        const uniqueGames = Array.from(new Set(allFixtures.map(g => g.fixture.id)))
          .map(id => allFixtures.find(g => g.fixture.id === id));

        const formattedGames = uniqueGames.slice(0, 20).map((item) => {
          const seed = item.fixture.id;
          return {
            id: seed,
            teams: `${item.teams.home.name} × ${item.teams.away.name}`,
            league: item.league.name,
            time: item.fixture.status.short === 'LIVE' ? `AO VIVO - ${item.fixture.status.elapsed}'` : new Date(item.fixture.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            odds: [parseFloat((1.5 + (seed % 4) * 0.3).toFixed(2)), parseFloat((3.0 + (seed % 2) * 0.5).toFixed(2)), parseFloat((2.0 + (seed % 5) * 0.4).toFixed(2))]
          };
        });

        setGames(formattedGames);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRealGames();
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#005a42', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #ffdf1b' }}>
        <span style={{ fontWeight: '900', fontSize: '24px' }}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></span>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1200px', margin: '20px auto', padding: '0 20px', gap: '20px' }}>
        <main style={{ flex: 2, minWidth: '300px' }}>
          <h2 style={{ color: '#ffdf1b', borderLeft: '4px solid #12c156', paddingLeft: '10px', marginBottom: '15px' }}>⚽ EVENTOS DISPONÍVEIS</h2>
          {loading ? <p>Carregando eventos reais...</p> : games.map((game) => (
            <div key={game.id} style={{ backgroundColor: '#242424', borderRadius: '6px', padding: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333' }}>
              <div>
                <span style={{ color: '#12c156', fontSize: '11px', fontWeight: 'bold' }}>{game.time}</span>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{game.teams}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{game.league}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {game.odds.map((odd, idx) => (
                  <button key={idx} onClick={() => setBet({ game: game.teams, odd: odd, type: ['1', 'X', '2'][idx] })} style={{ backgroundColor: '#333', color: '#ffdf1b', border: '1px solid #444', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    <small style={{ color: '#888', display: 'block' }}>{['1', 'X', '2'][idx]}</small>
                    <strong>{odd.toFixed(2)}</strong>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </main>

        <aside style={{ flex: 1, minWidth: '280px', backgroundColor: '#212121', padding: '15px', borderRadius: '6px', height: 'fit-content' }}>
          <h3>📋 Cupom</h3>
          {bet ? (
            <div>
              <p style={{ fontSize: '14px' }}>{bet.game} <br/> <strong>{bet.type} @ {bet.odd}</strong></p>
              <input type="number" value={betValue} onChange={(e) => setBetValue(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1a1a1a', color: '#fff', border: '1px solid #444' }} />
              <button style={{ width: '100%', marginTop: '10px', padding: '12px', background: '#12c156', color: '#fff', border: 'none', cursor: 'pointer' }}>APOSTAR R$ {(betValue * bet.odd).toFixed(2)}</button>
            </div>
          ) : <p style={{ fontSize: '13px', color: '#666' }}>Selecione uma odd para começar.</p>}
        </aside>
      </div>
    </div>
  );
}
