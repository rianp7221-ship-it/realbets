'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [games, setGames] = useState({ live: [], scheduled: [] });
  const [activeTab, setActiveTab] = useState('scheduled');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Dados de contingência para o site não ficar vazio de madrugada
      const demoData = [
        { id: 1, teams: 'Real Madrid × Barcelona', time: '16:00', league: 'La Liga' },
        { id: 2, teams: 'Flamengo × Palmeiras', time: '18:30', league: 'Brasileirão' },
        { id: 3, teams: 'Man. City × Liverpool', time: '20:00', league: 'Premier League' }
      ];

      try {
        // Tenta buscar da API
        const today = new Date().toISOString().split('T')[0];
        const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, { 
          headers: { 'x-rapidapi-host': 'v3.football.api-sports.io', 'x-rapidapi-key': '219415e7d2ff117cc0e96919766c5479' } 
        });
        const data = await res.json();
        
        if (data.response && data.response.length > 0) {
          const formatted = data.response.map(item => ({
            id: item.fixture.id,
            teams: `${item.teams.home.name} × ${item.teams.away.name}`,
            time: new Date(item.fixture.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}),
            league: item.league.name
          }));
          setGames({ live: [], scheduled: formatted });
        } else {
          // Se a API estiver vazia, usa a demo
          setGames({ live: [], scheduled: demoData });
        }
      } catch (e) {
        setGames({ live: [], scheduled: demoData });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#005a42', padding: '15px', textAlign: 'center', borderBottom: '3px solid #ffdf1b' }}>
        <h1 style={{ margin: 0, fontSize: '22px' }}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></h1>
      </header>

      <div style={{ display: 'flex', background: '#222' }}>
        <button onClick={() => setActiveTab('live')} style={{ flex: 1, padding: '12px', background: activeTab === 'live' ? '#005a42' : 'transparent', color: '#fff', border: 'none' }}>🔴 AO VIVO</button>
        <button onClick={() => setActiveTab('scheduled')} style={{ flex: 1, padding: '12px', background: activeTab === 'scheduled' ? '#005a42' : 'transparent', color: '#fff', border: 'none' }}>📅 AGENDA</button>
      </div>

      <div style={{ padding: '15px' }}>
        {games[activeTab].map(g => (
          <div key={g.id} style={{ background: '#2d2d2d', padding: '15px', marginBottom: '8px', borderRadius: '4px', borderLeft: '4px solid #ffdf1b' }}>
            <div style={{ fontSize: '12px', color: '#12c156', fontWeight: 'bold' }}>{g.time}</div>
            <div style={{ fontWeight: 'bold', margin: '5px 0' }}>{g.teams}</div>
            <div style={{ fontSize: '10px', color: '#888' }}>{g.league}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
