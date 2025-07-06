import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Bibliothecaire() {
  const history = useHistory();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'bibliothecaire') {
      history.push('/login');
    }
  }, [role, history]);

  const [emprunts, setEmprunts] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [ouvrages, setOuvrages] = useState([]);
  const [titre, setTitre] = useState('');
  const [auteur, setAuteur] = useState('');
  const [annee, setAnnee] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  // Charger les données
  useEffect(() => {
    fetch('http://localhost:5000/api/emprunts?etat=attente')
      .then(res => res.json())
      .then(setEmprunts);

    fetch('http://localhost:5000/api/reservations?etat=attente')
      .then(res => res.json())
      .then(setReservations);

    fetch('http://localhost:5000/api/ouvrages')
      .then(res => res.json())
      .then(setOuvrages);
  }, []);

  // Approuver un emprunt
  const approuverEmprunt = async (id) => {
    await fetch(`http://localhost:5000/api/emprunts/${id}/approuver`, { method: 'PUT' });
    fetch('http://localhost:5000/api/emprunts?etat=attente')
      .then(res => res.json())
      .then(setEmprunts);
    alert("L'emprunt a été approuvé et est maintenant visible par l'utilisateur");
  };

  // Approuver une réservation
  const approuverReservation = async (id) => {
    await fetch(`http://localhost:5000/api/reservations/${id}/approuver`, { method: 'PUT' });
    setReservations(reservations.filter(r => r._id !== id));
  };

  // Ajouter un ouvrage
  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/ouvrages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titre, auteur, annee, image, description })
    });
    if (res.ok) {
      const newOuvrage = await res.json();
      setOuvrages([...ouvrages, newOuvrage]);
      setTitre('');
      setAuteur('');
      setAnnee('');
      setImage('');
      setDescription('');
    }
  };

  // Supprimer un ouvrage
  const supprimerOuvrage = async (id) => {
    await fetch(`http://localhost:5000/api/ouvrages/${id}`, { method: 'DELETE' });
    setOuvrages(ouvrages.filter(o => o._id !== id));
  };

  // Style pour les cards
  const cardStyle = {
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 16px rgba(51,102,204,0.08)',
    width: 250,
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    margin: 12
  };

  const userId = localStorage.getItem('userId');

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 30 }}>
      <h2>Demandes d'emprunt à approuver</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 30 }}>
        {emprunts.filter(e => e.statut === 'attente').length === 0 && (
          <div style={{ color: '#888' }}>Aucune demande en attente.</div>
        )}
        {emprunts
          .filter(e => e.statut === 'attente' && e.utilisateur_id?._id !== userId)
          .map((e) => (
            <div key={e._id} style={cardStyle}>
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {e.ouvrage_id?.titre || 'Ouvrage'}
                </div>
                <div style={{ color: '#555', marginBottom: 8 }}>
                  Par {e.utilisateur_id?.prenom} {e.utilisateur_id?.nom}
                </div>
                {e.statut === 'attente' && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => approuverEmprunt(e._id)}
                      style={{
                        background: '#27ae60', color: '#fff', border: 'none', borderRadius: 4,
                        padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer'
                      }}
                    >
                      Valider
                    </button>
                    <button
                      onClick={async () => {
                        await fetch(`http://localhost:5000/api/emprunts/${e._id}/refuser`, { method: 'PUT' });
                        fetch('http://localhost:5000/api/emprunts?etat=attente')
                          .then(res => res.json())
                          .then(setEmprunts);
                      }}
                      style={{
                        background: '#c0392b', color: '#fff', border: 'none', borderRadius: 4,
                        padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer'
                      }}
                    >
                      Refuser
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <h2>Réservations à approuver</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 30 }}>
        {reservations.length === 0 && <div style={{ color: '#888' }}>Aucune réservation en attente.</div>}
        {reservations.map((r, idx) => (
          <div key={r._id} style={cardStyle}>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 'bold', fontSize: 18 }}>{r.titreOuvrage || 'Ouvrage'}</div>
              <div style={{ color: '#555', marginBottom: 8 }}>Par {r.utilisateur || 'Utilisateur'}</div>
              <button onClick={() => approuverReservation(r._id)} style={{
                background: '#3366cc', color: '#fff', border: 'none', borderRadius: 4,
                padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer'
              }}>
                Approuver
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2>Ajouter un ouvrage</h2>
      <form onSubmit={handleAdd} style={{
        display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 30
      }}>
        <input
          placeholder="Titre"
          value={titre}
          onChange={e => setTitre(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          placeholder="Auteur"
          value={auteur}
          onChange={e => setAuteur(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          placeholder="Année"
          value={annee}
          onChange={e => setAnnee(e.target.value)}
          required
          type="number"
          min="0"
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: 100 }}
        />
        <input
          placeholder="URL de l'image"
          value={image}
          onChange={e => setImage(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: 220 }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: 220 }}
        />
        <button type="submit" style={{
          background: '#3366cc', color: '#fff', border: 'none', borderRadius: 4,
          padding: '8px 20px', fontWeight: 'bold', cursor: 'pointer'
        }}>
          Ajouter
        </button>
      </form>

      <h2>Ouvrages</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        marginBottom: 40
      }}>
        {ouvrages.length === 0 && <div style={{ color: '#888' }}>Aucun ouvrage.</div>}
        {ouvrages.map((o) => (
          <div key={o._id} style={cardStyle}>
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
              <button onClick={() => supprimerOuvrage(o._id)} style={{
                background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4,
                padding: '6px 14px', fontWeight: 'bold', cursor: 'pointer'
              }}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bibliothecaire;