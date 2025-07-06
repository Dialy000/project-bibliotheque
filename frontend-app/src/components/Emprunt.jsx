import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Emprunt() {
  const [emprunts, setEmprunts] = useState([]);
  const userId = localStorage.getItem('userId');
  const history = useHistory();

  useEffect(() => {
    if (!userId) {
      history.push('/login');
      return;
    }
    fetch(`http://localhost:5000/api/emprunts/mes-emprunts/${userId}`)
      .then(res => res.json())
      .then(data => setEmprunts(data));
  }, [userId, history]);

  const empruntsEnAttente = emprunts.filter(e => e.statut === 'attente');
  const empruntsEnCours = emprunts.filter(e => e.statut === 'valide');
  const empruntsHistorique = emprunts.filter(e => e.statut === 'refuse' || e.statut === 'rendu');

  return (
    <div style={{ padding: 40 }}>
      <h1>Mes emprunts</h1>

      <h2>En attente de validation</h2>
      {empruntsEnAttente.length === 0 && <div>Aucun emprunt en attente.</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
        {empruntsEnAttente.map(e => (
          <EmpruntCard key={e._id} emprunt={e} />
        ))}
      </div>

      <h2>Emprunts en cours</h2>
      {empruntsEnCours.length === 0 && <div>Aucun emprunt en cours.</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
        {empruntsEnCours.map(e => (
          <EmpruntCard key={e._id} emprunt={e} />
        ))}
      </div>

      <h2>Historique des emprunts</h2>
      {empruntsHistorique.length === 0 && <div>Aucun emprunt dans l'historique.</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {empruntsHistorique.map(e => (
          <EmpruntCard key={e._id} emprunt={e} />
        ))}
      </div>
    </div>
  );
}

// Composant réutilisable pour afficher une carte d'emprunt
function EmpruntCard({ emprunt }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 10,
      boxShadow: '0 4px 16px rgba(51,102,204,0.08)',
      width: 250,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 20
    }}>
      <img
        src={emprunt.ouvrage_id?.image}
        alt={emprunt.ouvrage_id?.titre}
        style={{ width: '100%', height: 140, objectFit: 'cover' }}
      />
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 6 }}>
          {emprunt.ouvrage_id?.titre}
        </div>
        <div style={{ color: '#555', marginBottom: 4 }}>Auteur: {emprunt.ouvrage_id?.auteur}</div>
        <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
          Date de retour: {new Date(emprunt.date_retour).toLocaleDateString()}
        </div>
        
        <div style={{
          marginTop: 10,
          background: emprunt.statut === 'attente' ? '#f1c40f'
            : emprunt.statut === 'valide' ? '#3498db'
            : '#e74c3c',
          color: '#fff',
          borderRadius: 4,
          padding: '6px 0',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {emprunt.statut === 'attente' && "En attente de validation"}
          {emprunt.statut === 'valide' && "Validé"}
          {emprunt.statut === 'refuse' && "Refusé"}
        </div>
      </div>
    </div>
  );
}

export default Emprunt;