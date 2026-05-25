'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicialização segura
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Page() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
        
        // Busca o saldo de forma separada para evitar erro de promise
        const { data: profile } = await supabase
          .from('profiles')
          .select('wallet_balance')
          .eq('id', data.session.user.id)
          .single();
        
        if (profile) {
          setBalance(profile.wallet_balance);
        }
      }
    }
    loadSession();
  }, []);

  if (!user) {
    return <div style={{ color: 'white', padding: '50px' }}>Você não está logado.</div>;
  }

  return (
    <div style={{ color: 'white', padding: '50px', background: '#121212', minHeight: '100vh' }}>
      <h1>Dashboard RealBets</h1>
      <p>Email: {user.email}</p>
      <div style={{ background: '#333', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h3>Saldo Atual: R$ {balance.toFixed(2)}</h3>
      </div>
    </div>
  );
}
