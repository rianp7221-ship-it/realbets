'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuração vazia para evitar erro de build inicial
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://none.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'none';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Isso garante que o código SÓ rode no navegador, nunca no servidor
    setLoading(false);
  }, []);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Carregando...</div>;

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>SITE ONLINE</h1>
      <p>O sistema foi carregado com sucesso no seu navegador.</p>
    </div>
  );
}
