'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  // Verifica se o usuário já está logado ao carregar a página
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
        fetchBalance(data.session.user.id);
      }
    };
    checkUser();
  }, []);

  // Busca o saldo na tabela profiles
  const fetchBalance = async (userId) => {
    const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single();
    if (data) setBalance(data.wallet_balance);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Erro: " + error.message);
      else window.location.reload();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert("Erro: " + error.message);
      else alert("Conta criada! Agora faça o login.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // Se o usuário estiver logado, mostra o "Painel"
  if (user) {
    return (
      <div style={{ background: '#121212', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <h1>Bem-vindo!</h1>
        <p>E-mail: {user.email}</p>
        <h2 style={{ color: '#ffcc00' }}>Saldo: R$ {balance.toFixed(2)}</h2>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ff4444', border: 'none', cursor: 'pointer', color: 'white' }}>Sair</button>
      </div>
    );
  }

  // Se não estiver logado, mostra o formulário
  return (
    <div style={{ background: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
      <form onSubmit={handleAuth} style={{ background: '#1f1f1f', padding: '30px', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center', color: '#ffcc00' }}>{isLogin ? 'LOGIN' : 'CADASTRO'}</h2>
        <input type="email" placeholder="E-mail" required onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: 'none' }} />
        <input type="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: 'none' }} />
        <button type="submit" style={{ width: '100%', background: '#ffcc00', padding: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} style={{ textAlign: 'center', cursor: 'pointer', fontSize: '12px', marginTop: '15px', color: '#888' }}>
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
        </p>
      </form>
    </div>
  );
}
  );
}
