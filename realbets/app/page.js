'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [games, setGames] = useState({ live: [], scheduled: [] });
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login');

  // Chave da API mantida
  const API_KEY = "219415e7d2ff117cc0e96919766c5479";

  useEffect(() => {
    async function fetchData() {
      // Lista de demonstração caso a API não retorne jogos neste horário
      const demoData = [
        { id: 1, teams: 'Real Madrid × Barcelona', time: '16:00', league: 'La Liga' },
        { id: 2, teams: 'Flamengo × Palmeiras', time: '18:30', league: 'Brasileirão' }
      ];
      setGames({ live: [], scheduled: demoData });
    }
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* HEADER */}
      <header style={{ backgroundColor: '#005a42', padding: '15px 20px', borderBottom: '3px solid #ffdf1b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900' }}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => {setModalType('login'); setShowModal(true);}} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '8px 15px', cursor: 'pointer' }}>Login</button>
          <button onClick={() => {setModalType('register'); setShowModal(true);}} style={{ backgroundColor: '#ffdf1b', color: '#003b2b', border: 'none', padding: '8px 15px', fontWeight: 'bold', cursor: 'pointer' }}>Registre-se</button>
        </div>
      </header>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.8)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000 }}>
          <div style={{ backgroundColor:'#222', padding:'30px', borderRadius:'8px', width:'300px' }}>
            <h2 style={{ color:'#ffdf1b', textAlign:'center' }}>{modalType === 'login' ? 'LOGIN' : 'CADASTRO'}</h2>
            <input type="text" placeholder="Usuário" style={{ width:'100%', padding:'10px', marginBottom:'10px', background:'#111', border:'1px solid #444', color:'#fff' }} />
            <input type="password" placeholder="Senha" style={{ width:'100%', padding:'10px', marginBottom:'20px', background:'#111', border:'1px solid #444', color:'#fff' }} />
            <button onClick={() => setShowModal(false)} style={{ width:'100%', padding:'10px', background:'#12c156', border:'none', color:'#fff', cursor:'pointer' }}>{modalType === 'login' ? 'ENTRAR' : 'CRIAR'}</button>
            <button onClick={() => setShowModal(false)} style={{ width:'100%', background:'transparent', border:'none', color:'#888', marginTop:'10px', cursor:'pointer' }}>Fechar</button>
          </div>
        </div>
      )}

      {/* LAYOUT PRINCIPAL */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '20px auto', gap: '20px', padding: '0 10px' }}>
        <nav style={{ width: '200px', backgroundColor: '#222', padding: '10px', borderRadius: '4px' }}>
          <h3 style={{ color: '#ffdf1b', fontSize: '14px' }}>ESPORTES</h3>
          <div style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>⚽ Futebol</div>
        </nav>

        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', background: '#333', borderRadius: '4px', marginBottom: '10px' }}>
            <button onClick={() => setActiveTab('live')} style={{ flex:1, padding:'12px', background: activeTab === 'live' ? '#005a42' : 'transparent', color:'#fff', border:'none', cursor:'pointer' }}>🔴 AO VIVO</button>
            <button onClick={() => setActiveTab('scheduled')} style={{ flex:1, padding:'12px', background: activeTab === 'scheduled' ? '#005a42' : 'transparent', color:'#fff', border:'none', cursor:'pointer' }}>📅 AGENDA</button>
          </div>
          
          {games[activeTab].map(g => (
            <div key={g.id} style={{ background: '#242424', padding: '15px', marginBottom: '8px', borderLeft: '4px solid #12c156', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize:'11px', color:'#aaa' }}>{g.time}</div>
                <div style={{ fontWeight:'bold' }}>{g.teams}</div>
              </div>
              <div style={{ display:'flex', gap:'5px' }}>
                <button style={{ padding:'10px', background:'#333', color:'#ffdf1b', border:'1px solid #444' }}>1</button>
                <button style={{ padding:'10px', background:'#333', color:'#ffdf1b', border:'1px solid #444' }}>X</button>
                <button style={{ padding:'10px', background:'#333', color:'#ffdf1b', border:'1px solid #444' }}>2</button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
