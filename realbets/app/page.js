'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Adicionamos um tratamento para garantir que ele não tente conectar com valores vazios
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl || 'https://exemplo.supabase.co', supabaseAnonKey || 'chave-invalida');

export default function AuthPage() {
  };

  return (
    <div style={{ background: '#121212', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
      <form onSubmit={handleAuth} style={{ background: '#1f1f1f', padding: '30px', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center', color: '#ffcc00' }}>{isLogin ? 'LOGIN' : 'CADASTRO'}</h2>
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
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
