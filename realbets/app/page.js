'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Page() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        supabase.from('profiles').select('wallet_balance').eq('id', data.session.user.id).single()
          .then(({ data: profile }) => { if (profile) setBalance(profile.wallet_balance); });
      }
    });
  }, []);

  if (!user) return <div style={{color: 'white', padding: '50px'}}>Faça login para acessar.</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#121212', color: 'white' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', background: '#1a1a1a', padding: '20px' }}>
        <h2 style={{ color: '#ffcc00' }}>REALBETS</h2>
        <button onClick={() => setActiveTab('home')} style={{ display: 'block', margin: '20px 0', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Início</button>
        <button onClick={() => setActiveTab('games')} style={{ display: 'block', margin: '20px 0', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Jogos</button>
      </div>

      {/* Conteúdo */}
      <div style={{ padding: '40px', flex: 1 }}>
        <h1>{activeTab === 'home' ? 'Bem-vindo' : 'Jogos'}</h1>
        <p>Saldo: R$ {balance.toFixed(2)}</p>
      </div>
    </div>
  );
}
