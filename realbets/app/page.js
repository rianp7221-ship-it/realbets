'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function RealBetsHub() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [betAmount, setBetAmount] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        loadData(data.session.user.id);
      }
    });
  }, []);

  async function loadData(userId) {
    const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single();
    if (data) setBalance(data.wallet_balance);
  }

  async function placeBet() {
    const amount = parseFloat(betAmount);
    if (amount > balance) return alert("Saldo insuficiente!");
    
    // Lógica simples de sorteio: 50/50
    const won = Math.random() > 0.5;
    const newBalance = won ? balance + amount : balance - amount;

    await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', user.id);
    setBalance(newBalance);
    alert(won ? "Parabéns! Você ganhou!" : "Que pena, você perdeu!");
  }

  if (!user) return <div style={{padding: 50, color: '#fff', textAlign: 'center'}}>Por favor, faça login para acessar o RealBets.</div>;

  return (
    <div style={{ background: '#121212', minHeight: '100vh', color: '#fff', fontFamily: 'Arial' }}>
      {/* Menu Superior */}
      <nav style={{ padding: '20px', background: '#1f1f1f', display: 'flex', justifyContent: 'space-between' }}>
        <h2>REALBETS</h2>
        <div>
          <button onClick={() => setActiveTab('home')}>Início</button>
          <button onClick={() => setActiveTab('games')} style={{marginLeft: 10}}>Jogar</button>
          <button onClick={() => {supabase.auth.signOut(); window.location.reload();}} style={{marginLeft: 10, color: 'red'}}>Sair</button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <div style={{ padding: '20px' }}>
        <h3>Seu Saldo: R$ {balance.toFixed(2)}</h3>

        {activeTab === 'games' && (
          <div style={{ background: '#252525', padding: '20px', borderRadius: '10px' }}>
            <h4>Roleta da Sorte (50/50)</h4>
            <input type="number" placeholder="Valor da aposta" onChange={(e) => setBetAmount(e.target.value)} style={{padding: 10}} />
            <button onClick={placeBet} style={{padding: '10px 20px', background: '#ffcc00', border: 'none', cursor: 'pointer', marginLeft: 10 }}>Apostar</button>
          </div>
        )}
      </div>
    </div>
  );
}
