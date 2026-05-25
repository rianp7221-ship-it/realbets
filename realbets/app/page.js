'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Home() {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', user.id).single();
        if (data) setSaldo(data.wallet_balance);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ background: '#0e1111', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#1e2329', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e1b12c' }}>
        <h1 style={{ margin: 0, fontSize: '20px', color: '#e1b12c' }}>REALBETS</h1>
        <div style={{ background: '#2c333a', padding: '8px 15px', borderRadius: '4px', fontSize: '14px' }}>
          Saldo: <strong>R$ {saldo.toFixed(2)}</strong>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Sidebar Esquerda */}
        <nav style={{ width: '200px', padding: '20px', background: '#1e2329', minHeight: '90vh' }}>
          <h3 style={{ fontSize: '14px', color: '#888' }}>ESPORTES</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>⚽ Futebol</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>🏀 Basquetebol</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>🎾 Ténis</li>
          </ul>
        </nav>

        {/* Área Principal (Jogos) */}
        <main style={{ flex: 1, padding: '20px' }}>
          <h2 style={{ fontSize: '18px' }}>Jogos em Destaque</h2>
          <div style={{ background: '#1e2329', padding: '20px', borderRadius: '8px', marginTop: '10px' }}>
            <p>Real Madrid vs Barcelona</p>
            <button style={{ background: '#e1b12c', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Apostar na Vitória
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
