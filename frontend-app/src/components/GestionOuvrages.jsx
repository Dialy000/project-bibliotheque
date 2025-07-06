import React, { useEffect, useState } from 'react';

function GestionOuvrages() {
  const [ouvrages, setOuvrages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/ouvrages')
      .then(res => res.json())
      .then(data => setOuvrages(data));
  }, []);

  // Fonction pour demander un emprunt
  const demanderEmprunt = async (ouvrageId) => {
    setMessage('');
    // Récupère l'utilisateur connecté (ex: depuis le token ou localStorage)
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage("Vous devez être connecté pour emprunter.");
      return;
    }
    // Optionnel: demander la date de retour
    const date_retour = prompt("Date de retour (YYYY-MM-DD) ?");
    if (!date_retour) return;

    const utilisateur_id = localStorage.getItem('userId');

    const res = await fetch('http://localhost:5000/api/emprunts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        utilisateur_id,
        ouvrage_id: ouvrageId,
        date_retour
      })
    });
    if (res.ok) {
      setMessage("Demande d'emprunt envoyée. En attente de validation.");
      // Recharge la liste des ouvrages
      fetch('http://localhost:5000/api/ouvrages')
        .then(res => res.json())
        .then(data => setOuvrages(data));
    } else {
      const data = await res.json();
      setMessage(data.error || "Erreur lors de la demande d'emprunt.");
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: 'auto', padding: 20 }}>
      <h1>Liste des ouvrages</h1>
      {message && (
        <div style={{
          background: '#ffe0e0',
          color: '#c00',
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        marginBottom: 40
      }}>
        {ouvrages.filter(o => o.disponible !== false).map((o) => (
          <div key={o._id} style={{
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 4px 16px rgba(51,102,204,0.08)',
            width: 250,
            padding: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <img
              src={o.image}
              alt={o.titre}
              style={{ width: '100%', height: 140, objectFit: 'cover' }}
            />
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 6 }}>{o.titre}</div>
              <div style={{ color: '#555', marginBottom: 4 }}>Auteur : {o.auteur}</div>
              <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Année : {o.annee || 'N/A'}</div>
              <div style={{ fontSize: 15, marginBottom: 10 }}>
                {o.description}
              </div>
              <button
                onClick={() => demanderEmprunt(o._id)}
                style={{
                  background: '#3366cc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  padding: '8px 16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Emprunter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GestionOuvrages;