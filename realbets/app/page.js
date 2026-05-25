'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RealBetsApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        loadBalance(data.session.user.id);
      }
    });
  }, []);

  async function loadBalance(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('wallet_balance')
      .eq('id', userId)
      .single();
    if (data) setBalance(data.wallet_balance);
  }

  async function handleBet() {
    const betValue = 10;
    if (balance < betValue) return alert("Saldo insuficiente!");
    
    const win = Math.random() > 0.5;
    const newBalance = win ? balance + betValue : balance - betValue;
    
    await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', user.id);
    setBalance(newBalance);
    alert(win ? "Você ganhou! 🎉" : "Você perdeu! 😢");
  }

  async function addFunds() {
    const newBalance = balance + 50;
    await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', user.id);
    setBalance(newBalance);
    alert("R$ 50,00 adicionados ao saldo!");
  }

  if (!user) return <div style={{padding: 50, color: '#fff'}}>Carregando sistema...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#121212', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <nav style={{ width: '220px', background: '#1a1a1a', padding: '20px', borderRight: '1px solid #333' }}>
        <h2 style={{ color: '#ffcc00' }}>REALBETS</h2>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {['home', 'games', 'wallet'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#333' : 'transparent', border: 'none', color: '#fff', padding: '10px', textAlign: 'left', cursor: 'pointer', borderRadius: '5px', textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
          <button onClick={() => { supabase.auth.signOut(); window.location.reload(); }} style={{ marginTop: '20px', color: '#ff4444', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>Sair</button>
        </div>
      </nav>

      {/* Conteúdo */}
      <main style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: '#1f1f1f', padding: '15px', borderRadius: '8px' }}>
          <h1>{activeTab.toUpperCase()}</h1>
          <div style={{ background: '#333', padding: '10px 20px', borderRadius: '20px' }}>Saldo: R$ {balance.toFixed(2)}</div>
        </header>

        <section style={{ background: '#1f1f1f', padding: '20px', borderRadius: '10px' }}>
          {activeTab === 'home' && <p>Bem-vindo ao RealBets. Escolha uma opção no menu lateral.</p>}
          
          {activeTab === 'games' && (
            <div style={{ textAlign: 'center' }}>
              <h3>Roleta da Sorte</h3>
              <button onClick={handleBet} style={{ padding: '15px 30px', background: '#ffcc00', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                Apostar R$ 10,00
              </button>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div>
              <h3>Gerenciar Saldo</h3>
              <button onClick={addFunds} style={{ padding: '10px 20px', background: '#28a745', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '5px' }}>
                Adicionar R$ 50,00
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
