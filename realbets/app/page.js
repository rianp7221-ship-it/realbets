'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', session.user.id).single();
        if (data) setSaldo(data.wallet_balance);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>REALBETS</h1>
      <p>Saldo: R$ {saldo.toFixed(2)}</p>
    </div>
  );
}

  // --- SEÇÃO DE ADMIN (TELAS SEPARADAS) ---
  if (view === 'admin') return (
    <div style={{ background: '#0f0f0f', color: '#fff', minHeight: '100vh', padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1>⚙️ PAINEL DE CONTROLE REALBETS</h1>
        <button onClick={() => setView('home')} style={{ background: '#c00', border: 'none', padding: '10px 20px', color: '#fff', cursor: 'pointer' }}>SAIR DO ADMIN</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '30px' }}>
        {[ 'Usuários', 'Gerenciar Odds', 'Finanças', 'Depósitos', 'Logs de Sistema', 'Configuração API', 'Bônus', 'Suporte' ].map(item => (
          <div key={item} style={{ background: '#222', padding: '40px', borderRadius: '8px', border: '1px solid #444', textAlign: 'center' }}>
            <h3>{item}</h3>
            <button style={{ marginTop: '10px', background: '#005a42', border: 'none', padding: '8px 16px', color: '#fff' }}>Acessar</button>
          </div>
        ))}
      </div>
    </div>
  );

  // --- INTERFACE PRINCIPAL ---
  return (
    <div style={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* HEADER PROFISSIONAL */}
      <header style={{ background: '#005a42', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #ffdf1b', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer' }}>☰</button>
          <h1 style={{ margin: 0, fontSize: '26px', color: '#fff', cursor: 'pointer' }} onClick={() => setView('home')}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></h1>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#003b2b', padding: '8px 15px', borderRadius: '5px', border: '1px solid #ffdf1b' }}>SALDO: R$ {saldo.toFixed(2)}</div>
              <button onClick={() => setView('admin')} style={{ background: '#ffdf1b', border: 'none', padding: '8px 15px', fontWeight: 'bold' }}>ADMIN</button>
            </div>
          ) : (
            <button onClick={() => setView('login')} style={{ background: '#ffdf1b', border: 'none', padding: '8px 20px', fontWeight: 'bold' }}>ENTRAR</button>
          )}
        </div>
      </header>

      {/* LAYOUT DE COLUNAS */}
      <div style={{ display: 'flex', marginTop: '5px' }}>
        {/* MENU LATERAL */}
        {menuOpen && (
          <nav style={{ width: '250px', background: '#222', minHeight: '90vh', padding: '20px', borderRight: '1px solid #333' }}>
            <h4 style={{ color: '#ffdf1b' }}>ESPORTES</h4>
            {sports.map(s => <div key={s} style={{ padding: '12px 0', borderBottom: '1px solid #333', cursor: 'pointer' }}>{s}</div>)}
          </nav>
        )}

        {/* CONTEÚDO CENTRAL */}
        <main style={{ flex: 1, padding: '20px' }}>
          <div style={{ display: 'flex', background: '#333', borderRadius: '4px', marginBottom: '20px' }}>
            {['live', 'scheduled', 'results'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '15px', background: activeTab === tab ? '#005a42' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {liveGames.map(game => (
            <div key={game.id} style={{ background: '#242424', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><small>{game.liga}</small><div>{game.casa} vs {game.fora}</div></div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[game.odd1, game.oddX, game.odd2].map((odd, i) => (
                  <button key={i} style={{ padding: '10px 20px', background: '#333', border: '1px solid #555', color: '#ffdf1b' }}>{odd}</button>
                ))}
              </div>
            </div>
          ))}
        </main>

        {/* COLUNA DIREITA (CUPOM) */}
        <aside style={{ width: '300px', background: '#222', padding: '20px', borderLeft: '1px solid #333' }}>
          <h3>CUPOM DE APOSTA</h3>
          <p style={{ color: '#777' }}>Selecione um evento para apostar.</p>
        </aside>
      </div>
    </div>
  );
}
