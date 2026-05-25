'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Home() {
  const [saldo, setSaldo] = useState(0);
  const [userId, setUserId] = useState(null);
  const [valorDeposito, setValorDeposito] = useState('');

  useEffect(() => {
    async function carregarDados() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', user.id).single();
        if (data) setSaldo(data.wallet_balance);
      }
    }
    carregarDados();
  }, []);

  const handleDepositoReal = async () => {
    if (!userId) return alert("Você precisa estar logado!");
    const valor = parseFloat(valorDeposito);
    
    // Atualiza o saldo no banco de dados (SOMA o valor atual + o novo depósito)
    const { error } = await supabase
      .from('profiles')
      .update({ wallet_balance: saldo + valor })
      .eq('id', userId);

    if (!error) {
      setSaldo(saldo + valor);
      alert('Depósito realizado com sucesso!');
    } else {
      alert('Erro ao depositar: ' + error.message);
    }
  };

  return (
    <div style={{ background: '#121212', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <h1>REALBETS - Saldo: R$ {saldo.toFixed(2)}</h1>
      <div style={{ marginTop: '20px', background: '#222', padding: '20px', width: '250px' }}>
        <input 
          type="number" 
          placeholder="Valor do Depósito (R$)" 
          value={valorDeposito}
          onChange={(e) => setValorDeposito(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button onClick={handleDepositoReal} style={{ width: '100%', background: '#ffcc00', padding: '10px', cursor: 'pointer' }}>
          Depositar Agora
        </button>
      </div>
    </div>
  );
}
