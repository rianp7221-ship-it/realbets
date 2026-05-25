'use client';
import { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = ['home', 'games', 'wallet'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#121212', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Sidebar Fixo */}
      <nav style={{ width: '220px', background: '#1a1a1a', padding: '20px', borderRight: '1px solid #333' }}>
        <h2 style={{ color: '#ffcc00', marginBottom: '40px' }}>REALBETS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {menuItems.map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item)}
              style={{ 
                background: activeTab === item ? '#333' : 'transparent',
                border: 'none', 
                color: '#fff', 
                padding: '10px', 
                textAlign: 'left', 
                cursor: 'pointer',
                borderRadius: '5px',
                textTransform: 'capitalize'
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Área de Conteúdo */}
      <main style={{ flex: 1, padding: '40px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1>{activeTab.toUpperCase()}</h1>
        </header>

        <section style={{ background: '#1f1f1f', padding: '20px', borderRadius: '10px' }}>
          {activeTab === 'home' && <p>Bem-vindo ao RealBets. Escolha uma opção no menu.</p>}
          {activeTab === 'games' && <p>Carregando jogos...</p>}
          {activeTab === 'wallet' && <p>Configurações da carteira.</p>}
        </section>
      </main>
    </div>
  );
}
