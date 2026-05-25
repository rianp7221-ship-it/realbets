'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

export default function Home() {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    async function load() {
      // Teste simples para não travar o build
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', user.id).single();
          if (data) setSaldo(data.wallet_balance);
        }
      } catch (e) {
        console.log("Aguardando conexão...");
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: '50px', textAlign: 'center', background: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>REALBETS ONLINE</h1>
      <p>Saldo do Banco de Dados: R$ {saldo.toFixed(2)}</p>
    </div>
  );
}
