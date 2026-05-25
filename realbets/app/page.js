'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMensagem('Erro: ' + error.message);
    else {
        setMensagem('Sucesso! Redirecionando...');
        window.location.reload(); // Recarrega para mostrar o saldo
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0e1111', color: '#fff' }}>
      <form onSubmit={handleLogin} style={{ background: '#1e2329', padding: '30px', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center', color: '#e1b12c' }}>LOGIN REALBETS</h2>
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: 'none' }} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: 'none' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#e1b12c', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Entrar</button>
        <p style={{ fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>{mensagem}</p>
      </form>
    </div>
  );
}
