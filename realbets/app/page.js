'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Home() {
  const [user, setUser] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', user.id).single();
        if (data) setSaldo(data.wallet_balance);
      }
    }
    checkUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) window.location.reload();
    else alert('Erro ao logar: ' + error.message);
  };

  // SE NÃO ESTIVER LOGADO, MOSTRA A TELA DE LOGIN
  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0e1111', color: '#fff' }}>
        <form onSubmit={handleLogin} style={{ background: '#1e2329', padding: '30px', borderRadius: '8px', width: '300px' }}>
          <h2 style={{ textAlign: 'center', color: '#e1b12c' }}>REALBETS LOGIN</h2>
          <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px' }} />
          <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px' }} />
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#e1b12c', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Entrar</button>
        </form>
      </div>
    );
  }

  // SE ESTIVER LOGADO, MOSTRA O SITE
  return (
    <div style={{ background: '#0e1111', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <header style={{ background: '#1e2329', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>REALBETS</h1>
        <div>Saldo: <strong>R$ {saldo.toFixed(2)}</strong></div>
      </header>
      <main style={{ marginTop: '20px' }}>
        <h2>Bem-vindo, {user.email}!</h2>
        <p>Você está logado e pronto para apostar.</p>
        <button onClick={() => { supabase.auth.signOut(); window.location.reload(); }} style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '10px' }}>Sair</button>
      </main>
    </div>
  );
}
