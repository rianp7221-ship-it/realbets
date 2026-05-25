'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  // Estados globais do sistema
  const [view, setView] = useState('home'); // 'home', 'login', 'admin'
  const [userSession, setUserSession] = useState(null); // 'user', 'admin' ou null
  const [activeTab, setActiveTab] = useState('live');
  const [games, setGames] = useState({ live: [], scheduled: [] });
  const [showModal, setShowModal] = useState(false);

  // Simulação de busca de dados da API
  useEffect(() => {
    // Aqui você integraria sua API futuramente
    setGames({ 
      live: [{ id: 1, teams: 'Real Madrid × Barcelona', time: "90'" }], 
      scheduled: [{ id: 2, teams: 'Flamengo × Palmeiras', time: '18:00' }] 
    });
  }, []);

  // --- COMPONENTE: HEADER PROFISSIONAL ---
  const Header = () => (
    <header style={{ background: '#005a42', padding: '15px 20px', borderBottom: '3px solid #ffdf1b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 onClick={() => setView('home')} style={{ margin: 0, fontSize: '24px', fontWeight: '900', cursor: 'pointer', color: '#fff' }}>
        REAL<span style={{ color: '#ffdf1b' }}>BETS</span>
      </h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        {userSession === 'admin' && <button onClick={() => setView('admin')} style={{ background: '#ffdf1b', color: '#000', border: 'none', padding: '8px 15px', fontWeight: 'bold' }}>PAINEL ADMIN</button>}
        {!userSession ? (
          <button onClick={() => setView('login')} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '8px 15px' }}>Login</button>
        ) : (
          <button onClick={() => {setUserSession(null); setView('home');}} style={{ background: '#c00', color: '#fff', border: 'none', padding: '8px 15px' }}>Sair</button>
        )}
      </div>
    </header>
  );

  // --- COMPONENTE: PAINEL ADMIN (PROTEGIDO) ---
  if (view === 'admin' && userSession === 'admin') {
    return (
      <div style={{ background: '#111', color: '#fff', minHeight: '100vh' }}>
        <Header />
        <div style={{ padding: '40px' }}>
          <h2>⚙️ PAINEL DE CONTROLE ADMINISTRATIVO</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
            <div style={{ background: '#222', padding: '20px', borderRadius: '5px' }}><h3>Gerenciar Jogos</h3><button>Adicionar Evento</button></div>
            <div style={{ background: '#222', padding: '20px', borderRadius: '5px' }}><h3>Financeiro</h3><p>Saldo do sistema: R$ 0,00</p></div>
            <div style={{ background: '#222', padding: '20px', borderRadius: '5px' }}><h3>Usuários</h3><p>125 cadastrados</p></div>
          </div>
        </div>
      </div>
    );
  }

  // --- COMPONENTE: SITE PRINCIPAL ---
  return (
    <div style={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Header />

      {view === 'login' ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <div style={{ background: '#222', padding: '40px', borderRadius: '8px', width: '350px' }}>
            <h2>Login</h2>
            <input id="u" placeholder="Usuário (admin para testar)" style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#000', border: '1px solid #444', color: '#fff' }} />
            <input id="p" type="password" placeholder="Senha" style={{ width: '100%', padding: '10px', marginBottom: '20px', background: '#000', border: '1px solid #444', color: '#fff' }} />
            <button onClick={() => {
              const u = document.getElementById('u').value;
              if(u === 'admin') { setUserSession('admin'); setView('admin'); } 
              else { setUserSession('user'); setView('home'); }
            }} style={{ width: '100%', padding: '12px', background: '#12c156', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>ENTRAR</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', maxWidth: '1200px', margin: '20px auto', gap: '20px', padding: '0 10px' }}>
          <nav style={{ width: '220px', background: '#222', padding: '15px', borderRadius: '4px' }}>
            <h3 style={{ color: '#ffdf1b', fontSize: '14px' }}>ESPORTES</h3>
            <div style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>⚽ Futebol</div>
            <div style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>🏀 Basquete</div>
          </nav>
          <main style={{ flex: 1 }}>
            <div style={{ display: 'flex', background: '#333', borderRadius: '4px', marginBottom: '15px' }}>
              <button onClick={() => setActiveTab('live')} style={{ flex: 1, padding: '12px', background: activeTab === 'live' ? '#005a42' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>🔴 AO VIVO</button>
              <button onClick={() => setActiveTab('scheduled')} style={{ flex: 1, padding: '12px', background: activeTab === 'scheduled' ? '#005a42' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>📅 AGENDA</button>
            </div>
            {games[activeTab].map(g => (
              <div key={g.id} style={{ background: '#242424', padding: '15px', marginBottom: '8px', borderLeft: '4px solid #12c156', display: 'flex', justifyContent: 'space-between' }}>
                <div><div style={{ fontSize: '11px', color: '#aaa' }}>{g.time}</div><div style={{ fontWeight: 'bold' }}>{g.teams}</div></div>
              </div>
            ))}
          </main>
        </div>
      )}
    </div>
  );
}
