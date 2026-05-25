'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Home() {
  const [saldo, setSaldo] = useState(0);
  const [valorDeposito, setValorDeposito] = useState('');

  const handleDeposito = () => {
    const novoSaldo = saldo + parseFloat(valorDeposito);
    setSaldo(novoSaldo);
    alert('Depósito simulado com sucesso!');
  };

  return (
    <div style={{ background: '#121212', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#1f1f1f', padding: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #ffcc00' }}>
        <h1 style={{ margin: 0, color: '#ffcc00' }}>REALBETS</h1>
        <div style={{ background: '#333', padding: '10px', borderRadius: '5px' }}>
          Saldo: <strong>R$ {saldo.toFixed(2)}</strong>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Menu Lateral */}
        <nav style={{ width: '200px', padding: '20px', borderRight: '1px solid #333', height: '80vh' }}>
          <h3>Menu</h3>
          <p>⚽ Futebol</p>
          <p>🏀 Basquete</p>
          <div style={{ marginTop: '50px', background: '#222', padding: '10px' }}>
            <input 
              type="number" 
              placeholder="Valor (R$)" 
              value={valorDeposito}
              onChange={(e) => setValorDeposito(e.target.value)}
              style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
            />
            <button onClick={handleDeposito} style={{ width: '100%', background: '#ffcc00', border: 'none', padding: '5px', cursor: 'pointer' }}>Depositar</button>
          </div>
        </nav>

        {/* Área Central */}
        <main style={{ flex: 1, padding: '20px' }}>
          <h2>Jogos de Hoje</h2>
          <div style={{ background: '#1f1f1f', padding: '20px', borderRadius: '10px' }}>
            <h3>Flamengo vs Fluminense</h3>
            <button style={{ background: '#444', color: '#fff', border: '1px solid #ffcc00', padding: '10px 20px', cursor: 'pointer' }}>Apostar Vitória (Odd 2.0)</button>
          </div>
        </main>
      </div>
    </div>
  );
}
