'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [games, setGames] = useState({ live: [], scheduled: [] });
  const [activeTab, setActiveTab] = useState('scheduled');
  const [loading, setLoading] = useState(true);

  // Exemplo de visualização (substituído pela API quando disponível)
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const demoData = [
        { id: 1, teams: 'Real Madrid × Barcelona', time: '16:00', league: 'La Liga' },
        { id: 2, teams: 'Flamengo × Palmeiras', time: '18:30', league: 'Brasileirão' },
        { id: 3, teams: 'Man. City × Liverpool', time: '20:00', league: 'Premier League' }
      ];
      setGames({ live: [], scheduled: demoData });
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER VERDE */}
      <header style={{ backgroundColor: '#005a42', padding: '15px 20px', borderBottom: '3px solid #ffdf1b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900' }}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: '#ffdf1b', color: '#003b2b', border: 'none', padding: '8px 15px', fontWeight: 'bold', cursor: 'pointer' }}>Registre-se</button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL (LAYOUT 3 COLUNAS) */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '20px auto', width: '100%', gap: '20px', padding: '0 10px' }}>
        
        {/* COLUNA ESQUERDA (MENU) */}
        <nav style={{ width: '200px', backgroundColor: '#222', padding: '10px', borderRadius: '4px' }}>
          <h3 style={{ color: '#ffdf1b', fontSize: '14px' }}>A-Z ESPORTES</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>⚽ Futebol</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>🏀 Basquete</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>🎾 Tênis</li>
          </ul>
        </nav>

        {/* COLUNA CENTRAL (JOGOS) */}
        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', background: '#333', borderRadius: '4px', marginBottom: '10px' }}>
            <button onClick={() => setActiveTab('live')} style={{ flex: 1, padding: '12px', background: activeTab === 'live' ? '#005a42' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>🔴 AO VIVO</button>
            <button onClick={() => setActiveTab('scheduled')} style={{ flex: 1, padding: '12px', background: activeTab === 'scheduled' ? '#005a42' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>📅 AGENDA</button>
          </div>
          
          {games[activeTab].map(g => (
            <div key={g.id} style={{ background: '#242424', padding: '15px', marginBottom: '8px', borderLeft: '4px solid #12c156', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#aaa' }}>{g.time} - {g.league}</div>
                <div style={{ fontWeight: 'bold' }}>{g.teams}</div>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button style={{ padding: '10px', background: '#333', color: '#ffdf1b', border: '1px solid #444' }}>1</button>
                <button style={{ padding: '10px', background: '#333', color: '#ffdf1b', border: '1px solid #444' }}>X</button>
                <button style={{ padding: '10px', background: '#333', color: '#ffdf1b', border: '1px solid #444' }}>2</button>
              </div>
            </div>
          ))}
        </main>

        {/* COLUNA DIREITA (CUPOM) */}
        <aside style={{ width: '250px', backgroundColor: '#222', padding: '15px', borderRadius: '4px', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>📋 Cupom de Apostas</h3>
          <p style={{ color: '#666', fontSize: '13px' }}>Selecione uma odd para começar.</p>
        </aside>
      </div>
    </div>
  );
}
