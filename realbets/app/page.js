Para transformar o site de vez, incluí a Vitrine de Jogos (com a lógica de lista de partidas que criamos) diretamente dentro do seu código principal. Agora, quando você entrar na aba "Home", verá os confrontos em vez de um texto vazio.

Copie e substitua todo o seu app/page.js por este código:

JavaScript
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RealBetsApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        loadBalance(data.session.user.id);
      }
    });
  }, []);

  async function loadBalance(userId) {
    const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', userId).single();
    if (data) setBalance(data.wallet_balance);
  }

  // Lista de Jogos (Em breve vinda de um banco de dados ou API)
  const jogos = [
    { casa: 'Flamengo', fora: 'Palmeiras', odd: 2.10 },
    { casa: 'Real Madrid', fora: 'Barcelona', odd: 1.85 },
    { casa: 'São Paulo', fora: 'Corinthians', odd: 2.40 },
    { casa: 'Manchester City', fora: 'Liverpool', odd: 1.95 }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#121212', color: '#fff', fontFamily: 'Arial' }}>
      {/* Sidebar */}
      <nav style={{ width: '250px', background: '#1a1a1a', padding: '20px', borderRight: '1px solid #333' }}>
        <h2 style={{ color: '#ffcc00', marginBottom: '40px' }}>REALBETS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['home', 'games', 'wallet'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#333' : 'transparent', border: 'none', color: '#fff', padding: '15px', textAlign: 'left', cursor: 'pointer', borderRadius: '5px', textTransform: 'capitalize', fontSize: '16px' }}>
              {tab === 'home' ? '🏠 Início' : tab === 'games' ? '🎮 Jogos' : '💰 Carteira'}
            </button>
          ))}
        </div>
      </nav>

      {/* Conteúdo */}
      <main style={{ flex: 1, padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1>{activeTab.toUpperCase()}</h1>
          <div style={{ background: '#ffcc00', color: '#000', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold' }}>
            Saldo: R$ {balance.toFixed(2)}
          </div>
        </header>

        {/* Home: Lista de Jogos */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {jogos.map((jogo, i) => (
              <div key={i} style={{ background: '#1f1f1f', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333' }}>
                <div>
                  <strong style={{ fontSize: '18px' }}>{jogo.casa} vs {jogo.fora}</strong>
                </div>
                <button onClick={() => alert("Aposta processada!")} style={{ background: '#28a745', border: 'none', padding: '12px 25px', borderRadius: '5px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
                  Odd: {jogo.odd.toFixed(2)}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Outras abas mantidas */}
        {activeTab === 'games' && <div style={{ textAlign: 'center', padding: '50px' }}><h3>Roleta da Sorte</h3><button style={{ padding: '15px 30px', background: '#ffcc00', border: 'none', borderRadius: '5px' }}>Jogar</button></div>}
        {activeTab === 'wallet' && <div style={{ padding: '20px' }}><h3>Saldo: R$ {balance.toFixed(2)}</h3><button onClick={() => alert('Simulando PIX...')}>Depositar R$ 50</button></div>}
      </main>
    </div>
  );
}
