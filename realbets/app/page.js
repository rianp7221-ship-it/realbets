'use client'; // Esta linha é obrigatória para evitar o erro de servidor

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuração segura para evitar erros durante o build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [saldo, setSaldo] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Usamos o useEffect para garantir que a consulta ao banco só ocorra no navegador
    async function buscarSaldo() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', user.id).single();
          if (data) setSaldo(data.wallet_balance);
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setCarregando(false);
      }
    }
    buscarSaldo();
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>REALBETS STATUS</h1>
      {carregando ? (
        <p>Conectando ao banco de dados...</p>
      ) : (
        <div>
          <p>O site está rodando com sucesso!</p>
          <p>Saldo do usuário logado: <strong>R$ {saldo.toFixed(2)}</strong></p>
        </div>
      )}
    </div>
  );
}
