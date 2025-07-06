import React, { useState } from 'react';

function Register({ onRegister, onShowLogin }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:5000/api/utilisateurs/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        mot_de_passe: motDePasse, // <-- bien souligné !
        nom,
        prenom
      })
    });
    if (res.ok) {
      onRegister();
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
        <h2 style={{ textAlign: 'center', color: '#3366cc' }}>Inscription</h2>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
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
          S'inscrire
        </button>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span>Déjà un compte ? </span>
          <button
            type="button"
            onClick={onShowLogin}
            style={{
              background: 'none',
              border: 'none',
              color: '#3366cc',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: 0
            }}
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;