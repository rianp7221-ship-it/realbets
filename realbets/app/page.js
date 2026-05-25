'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicialização segura do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sua-url-aqui.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sua-chave-aqui';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    
    // Validação básica para evitar erro de fetch
    if (!supabaseUrl || supabaseUrl.includes('sua-url')) {
      alert("Erro: Configure as Variáveis de Ambiente na Vercel!");
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Erro: " + error.message);
      else window.location.reload();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert("Erro: " + error.message);
      else {
        alert("Conta criada com sucesso! Verifique seu e-mail (se necessário) e faça login.");
        setIsLogin(true);
      }
    }
  };

  return (
    <div style={{ 
      background: '#121212', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <form onSubmit={handleAuth} style={{ 
        background: '#1f1f1f', 
        padding: '30px', 
        borderRadius: '8px', 
        width: '320px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#ffcc00', marginBottom: '20px' }}>
          {isLogin ? 'LOGIN REALBETS' : 'CADASTRO REALBETS'}
        </h2>
        
        <input 
          type="email" 
          placeholder="E-mail" 
          required
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '4px', border: 'none' }} 
        />
        
        <input 
          type="password" 
          placeholder="Senha" 
          required
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '4px', border: 'none' }} 
        />
        
        <button type="submit" style={{ 
          width: '100%', 
          background: '#ffcc00', 
          padding: '12px', 
          border: 'none', 
          cursor: 'pointer', 
          fontWeight: 'bold', 
          borderRadius: '4px' 
        }}>
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </button>
        
        <p onClick={() => setIsLogin(!isLogin)} style={{ 
          textAlign: 'center', 
          cursor: 'pointer', 
          fontSize: '13px', 
          marginTop: '20px', 
          color: '#aaa',
          textDecoration: 'underline'
        }}>
          {isLogin ? 'Não tem conta? Cadastre-se aqui' : 'Já tem conta? Faça login'}
        </p>
      </form>
    </div>
  );
}
