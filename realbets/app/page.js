'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function RealBetsApp() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        loadBalance(data.session.user.id);
      }
    });
  }, []);

  async function loadBalance(userId) {
    const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single();
    if (data) setBalance(data.wallet_balance);
  }

  async function handleAuth(e) {
    e.preventDefault();
    const { error } = isLogin 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    if (error) alert(error.message); else window.location.reload();
  }

  async function updateWallet(type) {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    const newBalance = type === 'deposit' ? balance + val : balance - val;
    if (type === 'withdraw' && val > balance) return alert("Saldo insuficiente");
    await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', user.id);
    setBalance(newBalance);
    setAmount('');
  }

  // TELA DE LOGIN
  if (!user) return (
    <div style={{ background: '#121212', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
      <form onSubmit={handleAuth} style={{ width: '300px', padding: '20px', background: '#1f1f1f', borderRadius: '10px' }}>
        <h2>{isLogin ? 'LOGIN' : 'CADASTRO'}</h2>
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', color: '#000' }} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', color: '#000' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#ffcc00', border: 'none', cursor: 'pointer' }}>{isLogin ? 'Entrar' : 'Criar Conta'}</button>
      </form>
    </div>
  );

  // LAYOUT LOGADO
  return (
    <div style={{ display: 'flex', background: '#121212', minHeight: '100vh', color: '#fff' }}>
      {/* SIDEBAR */}
      <div style={{ width: '220px', background: '#1a1a1a', padding: '20px', borderRight: '1px solid #333' }}>
        <h2 style={{ color: '#ffcc00' }}>REALBETS</h2>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {['home', 'games', 'wallet'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', color: '#fff', textAlign: 'left', fontSize: '18px', cursor: 'pointer', textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
          <button onClick={() => { supabase.auth.signOut(); window.location.reload(); }} style={{ marginTop: '20px', color: '#ff4444', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>Sair</button>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: '#1f1f1f', padding: '15px', borderRadius: '8px' }}>
          <h3>Bem-vindo!</h3>
          <div style={{ background: '#333', padding: '10px 20px', borderRadius: '20px' }}>Saldo: R$ {balance.toFixed(2)}</div>
        </header>

        {activeTab === 'home' && <div><h1>Bem-vindo ao RealBets</h1><p>Selecione um jogo no menu lateral para começar.</p></div>}
        
        {activeTab === 'games' && (
          <div>
            <h2>Jogos Populares</h2>
            <div style={{ background: '#252525', padding: '20px', borderRadius: '10px', width: '200px', textAlign: 'center' }}>
              <h4>Roleta da Sorte</h4>
              <button onClick={() => alert("Jogo sendo carregado...")} style={{ background: '#ffcc00', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Jogar Agora</button>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div>
            <h2>Carteira</h2>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor R$" style={{ padding: '10px', color: '#000' }} />
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => updateWallet('deposit')} style={{ background: '#28a745', padding: '10px 20px', border: 'none', marginRight: '10px' }}>Depositar</button>
              <button onClick={() => updateWallet('withdraw')} style={{ background: '#dc3545', padding: '10px 20px', border: 'none' }}>Sacar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
