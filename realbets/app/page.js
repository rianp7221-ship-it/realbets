'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [games, setGames] = useState({ live: [], scheduled: [] });
  const [activeTab, setActiveTab] = useState('live');
  const [loading, setLoading] = useState(true);
  const API_KEY = "219415e7d2ff117cc0e96919766c5479"; 

  useEffect(() => {
    async function fetchFullData() {
      setLoading(true);
      const today = new Date();
      const threeDaysLater = new Date();
      threeDaysLater.setDate(today.getDate() + 3);

      const dateFrom = today.toISOString().split('T')[0];
      const dateTo = threeDaysLater.toISOString().split('T')[0];

      try {
        // Busca AO VIVO e agenda para os próximos 3 dias
        const [liveRes, schedRes] = await Promise.all([
          fetch('https://v3.football.api-sports.io/fixtures?live=all', { headers: { 'x-rapidapi-host': 'v3.football.api-sports.io', 'x-rapidapi-key': API_KEY } }),
          fetch(`https://v3.football.api-sports.io/fixtures?from=${dateFrom}&to=${dateTo}`, { headers: { 'x-rapidapi-host': 'v3.football.api-sports.io', 'x-rapidapi-key': API_KEY } })
        ]);

        const liveData = await liveRes.json();
        const schedData = await schedRes.json();

        const process = (arr) => (arr || []).slice(0, 30).map(item => ({
          id: item.fixture.id,
          teams: `${item.teams.home.name} × ${item.teams.away.name}`,
          time: item.fixture.status.short === 'LIVE' ? `${item.fixture.status.elapsed}'` : new Date(item.fixture.date).toLocaleDateString('pt-BR') + ' ' + new Date(item.fixture.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}),
          league: item.league.name
        }));

        setGames({ live: process(liveData.response), scheduled: process(schedData.response) });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchFullData();
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#005a42', padding: '15px', textAlign: 'center', borderBottom: '3px solid #ffdf1b' }}>
        <h1 style={{ margin: 0, fontSize: '22px' }}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></h1>
      </header>

      <div style={{ display: 'flex', background: '#222' }}>
        <button onClick={() => setActiveTab('live')} style={{ flex: 1, padding: '12px', background: activeTab === 'live' ? '#005a42' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>🔴 AO VIVO ({games.live.length})</button>
        <button onClick={() => setActiveTab('scheduled')} style={{ flex: 1, padding: '12px', background: activeTab === 'scheduled' ? '#005a42' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>📅 PRÓXIMOS ({games.scheduled.length})</button>
      </div>

      <div style={{ padding: '15px' }}>
        {loading ? <p style={{ textAlign: 'center' }}>Buscando agenda esportiva...</p> : 
          games[activeTab].length > 0 ? games[activeTab].map(g => (
            <div key={g.id} style={{ background: '#2d2d2d', padding: '15px', marginBottom: '8px', borderRadius: '4px', borderLeft: '4px solid #ffdf1b' }}>
              <div style={{ fontSize: '12px', color: '#12c156', fontWeight: 'bold' }}>{g.time}</div>
              <div style={{ fontWeight: 'bold', margin: '5px 0' }}>{g.teams}</div>
              <div style={{ fontSize: '10px', color: '#888' }}>{g.league}</div>
            </div>
          )) : <p style={{ textAlign: 'center', color: '#555' }}>Nenhum evento encontrado para esta categoria.</p>
        }
      </div>
    </div>
  );
}
