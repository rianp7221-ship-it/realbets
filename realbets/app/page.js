'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  // Verifica se o usuário está logado
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        loadBalance(data.session.user.id);
      }
      setLoading(false);
    });
  }, []);

  async function loadBalance(userId) {
    const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single();
    if (data) setBalance(data.wallet_balance);
  }

  async function handleAuth(e) {
    e.preventDefault();
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else window.location.reload();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert("Cadastro realizado! Faça o login.");
    }
  }

  async function handleDeposit() {
    const val = parseFloat(amount);
    if (isNaN(val)) return;
    const newBalance = balance + val;
    await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', user.id);
    setBalance(newBalance);
    setAmount('');
    alert("Saldo atualizado!");
  }

  if (loading) return <div>Carregando...</div>;

  // TELA DE LOGIN (Se não estiver logado)
  if (!user) return (
    <div style={{ background: '#121212', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
      <form onSubmit={handleAuth} style={{ width: '300px', padding: '20px', background: '#1f1f1f', borderRadius: '10px' }}>
        <h2>{isLogin ? 'LOGIN' : 'CADASTRO'}</h2>
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px', color: '#000' }} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px', color: '#000' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#ffcc00', border: 'none', cursor: 'pointer' }}>{isLogin ? 'Entrar' : 'Criar Conta'}</button>
        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', fontSize: '12px', marginTop: '10px' }}>{isLogin ? 'Criar conta' : 'Já tenho conta'}</p>
      </form>
    </div>
  );

  // TELA DO DASHBOARD (Se estiver logado)
  return (
    <div style={{ background: '#121212', minHeight: '100vh', color: '#fff', padding: '40px' }}>
      <h1>REALBETS DASHBOARD</h1>
      <div style={{ background: '#1f1f1f', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h3>Saldo Disponível: R$ {balance.toFixed(2)}</h3>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor do Depósito" style={{ padding: '8px', color: '#000' }} />
        <button onClick={handleDeposit} style={{ marginLeft: '10px', padding: '8px 15px', background: '#28a745', border: 'none', color: '#fff', cursor: 'pointer' }}>Depositar</button>
      </div>
      <button onClick={() => { supabase.auth.signOut(); window.location.reload(); }} style={{ marginTop: '20px', padding: '10px', background: '#dc3545', border: 'none', color: '#fff' }}>Sair</button>
    </div>
  );
}
