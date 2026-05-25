'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÃO E CLIENTE ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "", 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function CompleteBetSystem() {
  // --- ESTADOS ---
  const [balance, setBalance] = useState(5000.00);
  const [activeTab, setActiveTab] = useState('esportes');
  const [bets, setBets] = useState([]); // Bilhete ativo
  const [history, setHistory] = useState([
    { id: 1, desc: 'Flamengo x Palmeiras', status: 'ganho', valor: 50 },
    { id: 2, desc: 'Real Madrid x Barça', status: 'perdido', valor: 20 }
  ]);
  const [isDepositing, setIsDepositing] = useState(false);
  const [sportFilter, setSportFilter] = useState('Futebol');

  // --- MOCK DE DADOS (EXPANSÍVEL PARA MILHARES) ---
  const events = [
    { id: 1, sport: 'Futebol', casa: 'Flamengo', fora: 'Palmeiras', odd: 2.10 },
    { id: 2, sport: 'Futebol', casa: 'Real Madrid', fora: 'Barcelona', odd: 1.85 },
    { id: 3, sport: 'Tênis', casa: 'Djokovic', fora: 'Alcaraz', odd: 1.65 },
    { id: 4, sport: 'Basquete', casa: 'Lakers', fora: 'Celtics', odd: 1.95 },
    { id: 5, sport: 'Futebol', casa: 'São Paulo', fora: 'Corinthians', odd: 2.45 },
    { id: 6, sport: 'Futebol', casa: 'Manchester City', fora: 'Liverpool', odd: 1.90 },
    { id: 7, sport: 'Tênis', casa: 'Sinner', fora: 'Zverev', odd: 2.05 },
    { id: 8, sport: 'Basquete', casa: 'Heat', fora: 'Knicks', odd: 1.75 }
  ];

  // --- LÓGICA DE NEGÓCIOS ---
  const placeBet = (event) => {
    if (balance < 10) return alert("Saldo insuficiente para aposta mínima!");
    setBets([...bets, { ...event, betId: Date.now() }]);
    setBalance(prev => prev - 10);
  };

  const finalizeBet = () => {
    if (bets.length === 0) return;
    setHistory([...history, { id: Date.now(), desc: 'Bilhete Múltiplo', status: 'pendente', valor: bets.length * 10 }]);
    setBets([]);
    alert("Bilhete registrado com sucesso!");
  };

  // --- RENDERIZAÇÃO COMPLETA (LAYOUT ESTILO BET365) ---
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#dcdcdc', fontFamily: 'Segoe UI, Arial, sans-serif', fontSize: '13px' }}>
      
      {/* HEADER PROFESSIONAL */}
      <header style={{ background: '#007d62', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>BET365 CLONE PRO</div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>Usuário: APOSTADOR_01</span>
          <div style={{ background: '#fff', color: '#007d62', padding: '5px 15px', borderRadius: '3px', fontWeight: 'bold' }}>
            R$ {balance.toFixed(2)}
          </div>
          <button onClick={() => setIsDepositing(!isDepositing)} style={{ background: '#ffcc00', border: 'none', padding: '5px 15px', cursor: 'pointer', borderRadius: '3px' }}>Depositar</button>
        </div>
      </header>

      {/* CONTAINER PRINCIPAL */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* COLUNA 1: MENU E FILTROS */}
        <aside style={{ width: '220px', background: '#fff', padding: '10px', overflowY: 'auto' }}>
          <div style={{ fontWeight: 'bold', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>ESPORTES</div>
          {['Futebol', 'Tênis', 'Basquete', 'E-Sports', 'Vôlei', 'Fórmula 1', 'Boxe'].map(s => (
            <div key={s} onClick={() => setSportFilter(s)} style={{ padding: '10px', cursor: 'pointer', background: sportFilter === s ? '#eee' : 'transparent', borderBottom: '1px solid #f0f0f0' }}>
              {s}
            </div>
          ))}
        </aside>

        {/* COLUNA 2: LISTA DE JOGOS (EVENTOS) */}
        <main style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
          <div style={{ background: '#fff', padding: '15px' }}>
            <h2>{sportFilter} - Eventos ao Vivo</h2>
            {events.filter(e => e.sport === sportFilter).map(event => (
              <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                <div><strong>{event.casa}</strong> vs <strong>{event.fora}</strong></div>
                <button onClick={() => placeBet(event)} style={{ background: '#007d62', color: '#fff', border: 'none', padding: '8px 20px', cursor: 'pointer' }}>{event.odd.toFixed(2)}</button>
              </div>
            ))}
          </div>
        </main>

        {/* COLUNA 3: BILHETE E HISTÓRICO */}
        <aside style={{ width: '320px', background: '#f5f5f5', padding: '10px', borderLeft: '1px solid #ccc', overflowY: 'auto' }}>
          <div style={{ background: '#fff', padding: '10px', marginBottom: '10px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Bilhete de Apostas ({bets.length})</h4>
            {bets.map((b, i) => <div key={i} style={{ padding: '5px', borderBottom: '1px solid #eee' }}>{b.casa} vs {b.fora} @ {b.odd}</div>)}
            {bets.length > 0 && <button onClick={finalizeBet} style={{ width: '100%', marginTop: '10px', background: '#28a745', color: '#fff', padding: '10px', border: 'none' }}>FINALIZAR APOSTA</button>}
          </div>

          <div style={{ background: '#fff', padding: '10px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Histórico</h4>
            {history.map(h => (
              <div key={h.id} style={{ padding: '8px', fontSize: '11px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{h.desc}</span>
                <span style={{ color: h.status === 'ganho' ? 'green' : 'red' }}>{h.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* MODAL DE DEPÓSITO (ESTILO ENTERPRISE) */}
      {isDepositing && (
        <div style={{ position: 'fixed', top: '20%', left: '30%', width: '40%', background: '#fff', padding: '20px', border: '2px solid #007d62', zIndex: 10 }}>
          <h3>Formas de Depósito</h3>
          <p>PIX, Cartão, Cripto.</p>
          <button onClick={() => { setBalance(balance + 100); setIsDepositing(false); }}>Adicionar R$ 100,00</button>
        </div>
      )}
    </div>
  );
}
