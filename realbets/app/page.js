'use client';
import { useState } from 'react';

export default function Bet365Clone() {
  const [activeTab, setActiveTab] = useState('home');
  const [betSlip, setBetSlip] = useState([]); // Bilhetes ativos

  const jogos = [
    { id: 1, casa: 'Flamengo', fora: 'Palmeiras', odd: 2.10 },
    { id: 2, casa: 'Real Madrid', fora: 'Barcelona', odd: 1.85 },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#e9e9e9', color: '#333', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1. COLUNA ESQUERDA: MENU */}
      <nav style={{ width: '220px', background: '#fff', padding: '15px' }}>
        <h2 style={{ color: '#007d62', marginBottom: '20px' }}>BetClone</h2>
        {['Esportes', 'Ao Vivo', 'Depósito', 'Saque'].map(item => (
          <div key={item} style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}>{item}</div>
        ))}
      </nav>

      {/* 2. COLUNA CENTRAL: EVENTOS */}
      <main style={{ flex: 1, padding: '20px' }}>
        <div style={{ background: '#fff', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
          <h3>Eventos em Destaque</h3>
          {jogos.map(jogo => (
            <div key={jogo.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee' }}>
              <span>{jogo.casa} vs {jogo.fora}</span>
              <button onClick={() => setBetSlip([...betSlip, jogo])} style={{ background: '#007d62', color: '#fff', border: 'none', padding: '5px 15px' }}>
                {jogo.odd}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* 3. COLUNA DIREITA: BILHETE E HISTÓRICO */}
      <aside style={{ width: '280px', background: '#fff', padding: '15px', borderLeft: '1px solid #ddd' }}>
        <h3>Bilhete de Apostas</h3>
        {betSlip.length === 0 ? <p>Seu bilhete está vazio</p> : betSlip.map((b, i) => <div key={i}>{b.casa} x {b.fora}</div>)}
        
        <hr />
        
        <h3>Histórico de Apostas</h3>
        <div style={{ fontSize: '12px' }}>
          <p>✅ Flamengo 2x1 - R$ 50,00</p>
          <p>❌ Real Madrid 1x2 - R$ 20,00</p>
        </div>
      </aside>
    </div>
  );
}
