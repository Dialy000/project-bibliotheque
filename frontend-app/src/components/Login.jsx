import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    // Exemple d'appel API (à adapter selon ton backend)
    const res = await fetch('http://localhost:5000/api/utilisateurs/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, motDePasse })
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId); // <-- AJOUTE CETTE LIGNE
      localStorage.setItem('role', data.role);
      onLogin();
      // Redirection selon le rôle
      if (data.role === 'bibliothecaire') {
        history.push('/biblio');
      } else {
        history.push('/');
      }
    } else {
      const data = await res.json();
      setError(data.error || 'Erreur');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(120deg, #3366cc 60%, #5f9ea0 100%)'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 16px rgba(51,102,204,0.08)', minWidth: 320
      }}>
        <h2 style={{ textAlign: 'center', color: '#3366cc' }}>Connexion</h2>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={e => setMotDePasse(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{
          width: '100%', padding: 12, background: '#3366cc', color: '#fff',
          border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 16
        }}>
          Se connecter
        </button>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span>Pas de compte ? </span>
          <button
            type="button"
            onClick={onShowRegister}
            style={{
              background: 'none',
              border: 'none',
              color: '#3366cc',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: 0
            }}
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;