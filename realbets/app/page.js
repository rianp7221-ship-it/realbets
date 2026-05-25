'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [view, setView] = useState('home'); // 'home', 'admin', 'login'
  const [activeTab, setActiveTab] = useState('live');
  const [games, setGames] = useState({ live: [], scheduled: [] });
  const [isAdmin, setIsAdmin] = useState(false);

  // Integração com API-Sports
  useEffect(() => {
    async function fetchData() {
      const demoData = [{ id: 1, teams: 'Real Madrid × Barcelona', time: '16:00', league: 'La Liga' }];
      setGames({ live: [], scheduled: demoData });
    }
    fetchData();
  }, []);

  // --- ÁREA DO ADMINISTRADOR ---
  if (view === 'admin') return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h1>⚙️ PAINEL ADMIN</h1>
        <button onClick={() => setView('home')} style={{ background: '#c00', border: 'none', padding: '10px', color: '#fff' }}>Sair do Admin</button>
      </header>
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
          <h3>Gerenciar Odds</h3>
          <input placeholder="ID do Jogo" style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
          <button style={{ background: '#005a42', color: '#fff', padding: '10px 20px', border: 'none' }}>Atualizar</button>
        </div>
      </div>
    </div>
  );

  // --- SITE PRINCIPAL (LAYOUT BET365) ---
  return (
    <div style={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* HEADER */}
      <header style={{ background: '#005a42', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></h1>
        <div>
          <button onClick={() => setView('login')} style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '8px 15px', marginRight: '10px' }}>Login</button>
          <button onClick={() => setView('login')} style={{ background: '#ffdf1b', color: '#003b2b', border: 'none', padding: '8px 15px', fontWeight: 'bold' }}>Registre-se</button>
        </div>
      </header>

      {/* LOGIN SIMPLES */}
      {view === 'login' && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h3>Acesso Administrativo</h3>
          <input id="user" placeholder="Usuário" style={{ display: 'block', margin: '10px auto', padding: '10px' }} />
          <input id="pass" type="password" placeholder="Senha" style={{ display: 'block', margin: '10px auto', padding: '10px' }} />
          <button onClick={() => {
            if(document.getElementById('user').value === 'admin') { setView('admin'); } else { setView('home'); }
          }} style={{ background: '#12c156', padding: '10px 20px', border: 'none' }}>ENTRAR</button>
        </div>
      )}

      {/* LAYOUT DE COLUNAS */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '20px auto', gap: '20px', padding: '0 10px' }}>
        <nav style={{ width: '200px', background: '#222', padding: '10px' }}>
          <h3>ESPORTES</h3>
          <div style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>⚽ Futebol</div>
        </nav>

        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', background: '#333', marginBottom: '10px' }}>
            <button onClick={() => setActiveTab('live')} style={{ flex: 1, padding: '12px', background: activeTab === 'live' ? '#005a42' : 'transparent', color: '#fff', border: 'none' }}>🔴 AO VIVO</button>
            <button onClick={() => setActiveTab('scheduled')} style={{ flex: 1, padding: '12px', background: activeTab === 'scheduled' ? '#005a42' : 'transparent', color: '#fff', border: 'none' }}>📅 AGENDA</button>
          </div>
          
          {games[activeTab].map(g => (
            <div key={g.id} style={{ background: '#242424', padding: '15px', marginBottom: '8px', borderLeft: '4px solid #12c156', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#aaa' }}>{g.time}</div>
                <div style={{ fontWeight: 'bold' }}>{g.teams}</div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
