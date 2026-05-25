'use client';
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login'); // 'login' ou 'register'

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* HEADER */}
      <header style={{ backgroundColor: '#005a42', padding: '15px 20px', borderBottom: '3px solid #ffdf1b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900' }}>REAL<span style={{ color: '#ffdf1b' }}>BETS</span></h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => openModal('login')} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '8px 15px', cursor: 'pointer' }}>Login</button>
          <button onClick={() => openModal('register')} style={{ backgroundColor: '#ffdf1b', color: '#003b2b', border: 'none', padding: '8px 15px', fontWeight: 'bold', cursor: 'pointer' }}>Registre-se</button>
        </div>
      </header>

      {/* MODAL DE LOGIN/REGISTRO */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#222', padding: '30px', borderRadius: '8px', width: '300px', border: '1px solid #444' }}>
            <h2 style={{ color: '#ffdf1b', textAlign: 'center' }}>{modalType === 'login' ? 'LOGIN' : 'CADASTRO'}</h2>
            <input type="text" placeholder="Usuário" style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#111', border: '1px solid #444', color: '#fff' }} />
            <input type="password" placeholder="Senha" style={{ width: '100%', padding: '10px', marginBottom: '20px', background: '#111', border: '1px solid #444', color: '#fff' }} />
            <button onClick={() => { alert(modalType === 'login' ? 'Login realizado!' : 'Conta criada!'); setShowModal(false); }} style={{ width: '100%', padding: '10px', background: '#12c156', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
              {modalType === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
            </button>
            <button onClick={() => setShowModal(false)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#888', marginTop: '10px', cursor: 'pointer' }}>Fechar</button>
          </div>
        </div>
      )}

      {/* RESTANTE DO SITE... (Aqui você mantém o layout de colunas que fizemos antes) */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Bem-vindo ao RealBets. Clique em Registre-se para começar.</p>
      </div>
    </div>
  );
}
