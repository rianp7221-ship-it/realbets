'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function RealBets() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

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
    
    if (error) alert(error.message);
    else window.location.reload();
  }

  async function updateBalance(type) {
    const val = parseFloat(amount);
    if (!val || val <= 0) return alert("Digite um valor válido");
    
    const newBalance = type === 'deposit' ? balance + val : balance - val;
    if (type === 'withdraw' && val > balance) return alert("Saldo insuficiente");

    await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', user.id);
    setBalance(newBalance);
    setAmount('');
    alert(type === 'deposit' ? "Depósito efetuado!" : "Saque efetuado!");
  }

  // TELA DE LOGIN
  if (!user) return (
    <div style={{ background: '#121212', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
      <form onSubmit={handleAuth} style={{ width: '300px', padding: '20px', background: '#1f1f1f', borderRadius: '10px' }}>
        <h2>{isLogin ? 'LOGIN' : 'CADASTRO'}</h2>
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px', color: '#000' }} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px', color: '#000' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#ffcc00', border: 'none', cursor: 'pointer' }}>{isLogin ? 'Entrar' : 'Criar Conta'}</button>
        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', textAlign: 'center', marginTop: '10px' }}>{isLogin ? 'Cadastre-se' : 'Já tem conta?'}</p>
      </form>
    </div>
  );

  // TELA PRINCIPAL (DASHBOARD)
  return (
    <div style={{ background: '#121212', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <h1>REALBETS</h1>
      <div style={{ background: '#1f1f1f', padding: '20px', borderRadius: '10px' }}>
        <h3>Saldo: R$ {balance.toFixed(2)}</h3>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor (R$)" style={{ padding: '8px', color: '#000' }} />
        
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => updateBalance('deposit')} style={{ background: '#28a745', border: 'none', padding: '10px', marginRight: '10px', cursor: 'pointer' }}>Depositar</button>
          <button onClick={() => updateBalance('withdraw')} style={{ background: '#dc3545', border: 'none', padding: '10px', cursor: 'pointer' }}>Sacar</button>
        </div>
      </div>
      <button onClick={() => { supabase.auth.signOut(); window.location.reload(); }} style={{ marginTop: '20px', padding: '10px', background: '#555', color: '#fff', border: 'none', cursor: 'pointer' }}>Sair</button>
    </div>
  );
}
