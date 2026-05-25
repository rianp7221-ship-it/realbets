'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [games, setGames] = useState({ live: [], scheduled: [] });
  const [activeTab, setActiveTab] = useState('live');
  const [loading, setLoading] = useState(true);
  const [bet, setBet] = useState(null);
  const [betValue, setBetValue] = useState('10');

  const API_KEY = "219415e7d2ff117cc0e96919766c5479"; 

  useEffect(() => {
    async function fetchData() {
      try {
        const today = new Date().toISOString().split('T')[0];
        const [liveRes, schedRes] = await Promise.all([
          fetch('https://v3.football.api-sports.io/fixtures?live=all', { headers: { 'x-rapidapi-host': 'v3.football.api-sports.io', 'x-rapidapi-key': API_KEY } }),
          fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, { headers: { 'x-rapidapi-host': 'v3.football.api-sports.io', 'x-rapidapi-key': API_KEY } })
        ]);

        const liveData = await liveRes.json();
        const schedData = await schedRes.json();

        const process = (data) => (data.response || []).map(item => ({
          id: item.fixture.id,
          teams: `${item.teams.home.name} × ${item.teams.away.name}`,
          time: item.fixture.status.short === 'LIVE' ? `${item.fixture.status.elapsed}'` : new Date(item.fixture.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          odds: [1.8, 3.5, 2.1]
        }));

        setGames({ live: process(liveData), scheduled: process(schedData) });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'Arial' }}>
      <header style={{ backgroundColor: '#005a42', padding: '15px', borderBottom: '3px solid #ffdf1b' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></span>
      </header>

      {/* ABAS DE NAVEGAÇÃO */}
      <div style={{ display: 'flex', gap: '2px', backgroundColor: '#333', padding: '5px' }}>
        {['live', 'scheduled'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ 
            flex: 1, padding: '10px', border: 'none', cursor: 'pointer',
            backgroundColor: activeTab === tab ? '#005a42' : '#222', color: '#fff', fontWeight: 'bold'
          }}>
            {tab === 'live' ? '🔴 AO VIVO' : '📅 HOJE'}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        {loading ? <p>Carregando...</p> : games[activeTab].map(g => (
          <div key={g.id} style={{ background: '#242424', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', borderRadius: '4px' }}>
            <div><div style={{ color: '#12c156' }}>{g.time}</div><div>{g.teams}</div></div>
            <button onClick={() => setBet({ game: g.teams, odd: g.odds[0] })} style={{ background: '#333', color: '#ffdf1b', border: 'none', padding: '10px' }}>ODD: {g.odds[0]}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
