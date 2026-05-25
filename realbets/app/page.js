'use client';
import { useState, useEffect } from 'react';

/**
 * PROJETO: REALBETS - VERSÃO 1.0 (ARQUITETURA PROFISSIONAL)
 * Este arquivo centraliza a lógica, o layout e o roteamento.
 */

// 1. COMPONENTE DE CABEÇALHO (HEADER)
const Header = ({ setMenuOpen, setView, setUserSession, userSession }) => (
  <header style={{ 
    background: '#005a42', 
    padding: '15px 20px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderBottom: '3px solid #ffdf1b', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100 
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <button 
        onClick={() => setMenuOpen(prev => !prev)} 
        style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>
        ☰
      </button>
      <h1 
        style={{ margin: 0, fontSize: '24px', cursor: 'pointer', color: '#fff' }} 
        onClick={() => setView('home')}>
        REAL<span style={{ color: '#ffdf1b' }}>BETS</span>
      </h1>
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      {userSession === 'admin' && (
        <button 
          onClick={() => setView('admin')} 
          style={{ background: '#ffdf1b', border: 'none', padding: '8px 15px', fontWeight: 'bold', cursor: 'pointer' }}>
          PAINEL ADMIN
        </button>
      )}
      <button 
        onClick={() => setView('login')} 
        style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '8px 15px', cursor: 'pointer' }}>
        {userSession ? 'Perfil' : 'Login'}
      </button>
    </div>
  </header>
);

// 2. COMPONENTE DE MENU LATERAL (SIDEBAR)
const SideMenu = ({ menuOpen, setMenuOpen }) => (
  <nav style={{ 
    position: 'fixed', 
    left: menuOpen ? 0 : '-280px', 
    top: '70px', 
    width: '280px', 
    height: '100%', 
    background: '#222', 
    transition: '0.4s ease', 
    padding: '20px', 
    zIndex: 99, 
    borderRight: '1px solid #333' 
  }}>
    {['Futebol', 'Basquete', 'Tênis', 'Cassino Ao Vivo', 'E-Sports', 'Promoções', 'Suporte ao Cliente', 'Termos de Uso'].map((item) => (
      <div key={item} style={{ 
        padding: '15px', 
        borderBottom: '1px solid #333', 
        color: '#ccc', 
        cursor: 'pointer',
        fontSize: '15px'
      }}>
        {item}
      </div>
    ))}
  </nav>
);

export default function Home() {
  const [view, setView] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userSession, setUserSession] = useState(null);

  // 3. LOGICA DO PAINEL ADMINISTRATIVO
  if (view === 'admin') {
    return (
      <div style={{ background: '#0f0f0f', color: '#fff', minHeight: '100vh', padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h1>⚙️ DASHBOARD ADMINISTRATIVO</h1>
          <button onClick={() => setView('home')} style={{ background: '#c00', border: 'none', padding: '10px 25px', color: '#fff', cursor: 'pointer' }}>VOLTAR AO SITE</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Usuários Ativos', val: '1,240' },
            { title: 'Volume de Apostas', val: 'R$ 45.200,00' },
            { title: 'Gerenciar Odds', val: 'Configurar' },
            { title: 'API de Resultados', val: 'Conectado' },
            { title: 'Depósitos Pendentes', val: '12' },
            { title: 'Relatórios Financeiros', val: 'Download' }
          ].map((card) => (
            <div key={card.title} style={{ background: '#1a1a1a', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#ffdf1b' }}>{card.title}</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{card.val}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. INTERFACE PRINCIPAL
  return (
    <div style={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Header setMenuOpen={setMenuOpen} setView={setView} setUserSession={setUserSession} userSession={userSession} />
      <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      <main style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px' }}>
        {view === 'login' ? (
          <div style={{ textAlign: 'center', background: '#222', padding: '60px', borderRadius: '10px', maxWidth: '400px', margin: '50px auto', border: '1px solid #333' }}>
            <h2 style={{ marginBottom: '30px' }}>Acesso à Conta</h2>
            <input id="user" placeholder="Usuário (admin)" style={{ width: '100%', padding: '12px', marginBottom: '15px', background: '#000', border: '1px solid #444', color: '#fff' }} />
            <input type="password" placeholder="Senha" style={{ width: '100%', padding: '12px', marginBottom: '25px', background: '#000', border: '1px solid #444', color: '#fff' }} />
            <button onClick={() => {
              const u = document.getElementById('user').value;
              if(u === 'admin') setUserSession('admin');
              else setUserSession('user');
              setView('home');
            }} style={{ width: '100%', padding: '15px', background: '#12c156', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>ENTRAR</button>
          </div>
        ) : (
          <div>
            <div style={{ background: '#003b2b', padding: '40px', textAlign: 'center', marginBottom: '30px', borderRadius: '8px', border: '1px solid #ffdf1b' }}>
              <h2 style={{ margin: 0 }}>BÔNUS DE 100% NO PRIMEIRO DEPÓSITO</h2>
              <p style={{ margin: '10px 0 0' }}>Cadastre-se agora e dobre suas chances!</p>
            </div>

            <div style={{ background: '#242424', padding: '60px', textAlign: 'center', border: '1px solid #333', borderRadius: '8px' }}>
              <p style={{ color: '#aaa', fontSize: '18px' }}>Carregando eventos esportivos do dia...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
