import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Ajoutez ce style global pour l'animation (à placer tout en haut du fichier ou dans votre CSS globale)
const cardAnim = {
  transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s cubic-bezier(.4,2,.6,1)',
  cursor: 'pointer'
};

function Accueil() {
  const [nbEmprunts, setNbEmprunts] = useState(0);
  const [nbVisites, setNbVisites] = useState(0);
  const [ouvrages, setOuvrages] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Récupérer le nombre d'emprunts
  useEffect(() => {
    fetch('http://localhost:5000/api/emprunts')
      .then(res => res.json())
      .then(data => setNbEmprunts(Array.isArray(data) ? data.length : 0));
  }, []);

  // Gérer le compteur de visites (localStorage)
  useEffect(() => {
    let visites = parseInt(localStorage.getItem('nbVisites') || '0', 10);
    visites += 1;
    localStorage.setItem('nbVisites', visites);
    setNbVisites(visites);
  }, []);

  // Charger les ouvrages
  useEffect(() => {
    fetch('http://localhost:5000/api/ouvrages')
      .then(res => res.json())
      .then(data => {
        setOuvrages(data);
        setFiltered(data);
      });
  }, []);

  // Filtrer les ouvrages selon la recherche
  useEffect(() => {
    setFiltered(
      ouvrages.filter(o =>
        o.titre.toLowerCase().includes(search.toLowerCase()) ||
        o.auteur.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, ouvrages]);

  // Pour savoir si l'utilisateur est connecté
  const isAuth = !!localStorage.getItem('token');

  // Style pour les cards de livres
  const livreCard = {
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 16px rgba(51,102,204,0.08)',
    padding: 18,
    width: 240,
    margin: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  };

  const cardStyle = {
    background: '#fff',
    boxShadow: '0 4px 16px rgba(51,102,204,0.08)',
    borderRadius: 8,
    padding: 24,
    width: 260,
    textAlign: 'center',
    textDecoration: 'none',
    color: '#3366cc',
    fontWeight: 'bold',
    transition: 'box-shadow 0.2s',
    margin: 10
  };

  // Exemple de livres à afficher en cards (remplace ou complète selon besoin)
  const livresExemple = [
    {
      titre: "Le Petit Prince",
      auteur: "Antoine de Saint-Exupéry",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
    },
    {
      titre: "L'Étranger",
      auteur: "Albert Camus",
      image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=600&q=80"
    },
    {
      titre: "Harry Potter à l'école des sorciers",
      auteur: "J.K. Rowling",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80"
    },
   
    {
      titre: "Cinquante nuances de Grey",
      auteur: "E. L. James",
      image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Bandeau de recherche */}
      <div style={{
        background: 'linear-gradient(120deg, #3366cc 60%, #5f9ea0 100%)',
        padding: '60px 0 100px 0',
        position: 'relative',
        color: '#fff',
        textAlign: 'center'
      }}>
        <form
          style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Rechercher un ouvrage"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '65%',
              padding: 12,
              fontSize: 18,
              border: 'none',
              borderRadius: 4,
              marginRight: 8,
              outline: 'none'
            }}
          />
          <button type="submit" style={{
            padding: '12px 28px',
            fontSize: 16,
            background: '#fff',
            color: '#3366cc',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(51,102,204,0.08)'
          }}>
            Rechercher
          </button>
        </form>
        <h1 style={{
          fontWeight: 'bold',
          fontSize: 40,
          marginTop: 40,
          textShadow: '0 2px 8px #333'
        }}>
           La bibliothèque<br />offre un large choix
        </h1>
        <p style={{
          fontSize: 20,
          marginTop: 10,
          textShadow: '0 1px 4px #333'
        }}>
           de livres, magazines, ressources numériques et espaces de lecture adaptés à tous les âges.
        </p>
      </div>

      {/* Statistiques */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        margin: '-60px 0 40px 0',
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: 32,
          minWidth: 220,
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(51,102,204,0.08)',
          margin: 10
        }}>
          <div style={{ fontSize: 38, color: '#3366cc', marginBottom: 8 }}>📖</div>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: '#3366cc' }}>{nbEmprunts}</div>
          <div style={{ fontSize: 17 }}>Livres empruntés</div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: 32,
          minWidth: 220,
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(51,102,204,0.08)',
          margin: 10
        }}>
          <div style={{ fontSize: 38, color: '#3366cc', marginBottom: 8 }}>👁️</div>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: '#3366cc' }}>{nbVisites}</div>
          <div style={{ fontSize: 17 }}>Nombre de visites</div>
        </div>
      </div>



     <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 0' }}>
        <h2 style={{ textAlign: 'center', color: '#3366cc', marginBottom: 30 }}>
          <span style={{ borderBottom: '2px solid #3366cc', paddingBottom: 4 }}>Livres Les Plus Lus</span>
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 30,
          flexWrap: 'wrap'
        }}></div>
     
      {/* Cards de livres */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 30,
        flexWrap: 'wrap',
        margin: '40px 0'
      }}>
        {livresExemple.map((livre, idx) => (
          <div
            key={idx}
            style={{
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 4px 16px rgba(51,102,204,0.08)',
              width: 220,
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              ...cardAnim
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(51,102,204,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(51,102,204,0.08)';
            }}
          >
            <img
              src={livre.image}
              alt={livre.titre}
              style={{ width: '100%', height: 140, objectFit: 'cover', transition: 'filter 0.3s' }}
            />
            <div style={{ padding: 16, width: '100%' }}>
              <div style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 6 }}>{livre.titre}</div>
              <div style={{ color: '#555', fontSize: 15 }}>Auteur : {livre.auteur}</div>
            </div>
          </div>
        ))}
      </div>
</div>
   
      {/* Accès rapide */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 30,
        marginBottom: 40,
        flexWrap: 'wrap'
      }}>
        <Link to="/ouvrages" style={cardStyle}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📚</div>
          Ouvrages
        </Link>
        <Link to="/abonnements" style={cardStyle}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💳</div>
          Abonnements
        </Link>
        <Link to="/reservations" style={cardStyle}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
          Réservations
        </Link>
        <Link to="/emprunts" style={cardStyle}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📖</div>
          Emprunts
        </Link>
      </div>

      {/* Actualités */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 0' }}>
        <h2 style={{ textAlign: 'center', color: '#3366cc', marginBottom: 30 }}>
          <span style={{ borderBottom: '2px solid #3366cc', paddingBottom: 4 }}>ACTUALITÉS</span>
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 30,
          flexWrap: 'wrap'
        }}>
          {/* Carte actualité 1 */}
          <div
            style={{
              background: '#fff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              borderRadius: 8,
              width: 340,
              overflow: 'hidden',
              margin: 10,
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(51,102,204,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
            }}
          >
            <img src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=600&q=80"
              alt="Actualité livre"
              style={{ width: '100%', height: 140, objectFit: 'cover', transition: 'filter 0.3s' }}
            />
            <div style={{ padding: 18 }}>
              <h4>Découverte de « 1984 » de George Orwell</h4>
              <small>10 Juillet 2025</small>
              <p style={{ fontSize: 15, marginTop: 8 }}>
                Plongez dans l’univers dystopique de <b>1984</b>, un roman visionnaire qui questionne la liberté et la surveillance. Disponible dès maintenant à la bibliothèque.
              </p>
            </div>
          </div>
          {/* Carte actualité 2 */}
          <div
            style={{
              background: '#fff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              borderRadius: 8,
              width: 340,
              overflow: 'hidden',
              margin: 10,
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(51,102,204,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
            }}
          >
            <img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80"
              alt="Actualité livre"
              style={{ width: '100%', height: 140, objectFit: 'cover', transition: 'filter 0.3s' }}
            />
            <div style={{ padding: 18 }}>
              <h4>À l’honneur : « La Peste » d’Albert Camus</h4>
              <small>5 Juillet 2025</small>
              <p style={{ fontSize: 15, marginTop: 8 }}>
                Redécouvrez <b>La Peste</b>, chef-d’œuvre intemporel sur la solidarité humaine face à l’adversité. Un incontournable à emprunter cet été.
              </p>
            </div>
          </div>
          {/* Carte actualité 3 */}
          <div
            style={{
              background: '#fff',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              borderRadius: 8,
              width: 340,
              overflow: 'hidden',
              margin: 10,
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(51,102,204,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
            }}
          >
            <img src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=600&q=80"
              alt="Actualité livre"
              style={{ width: '100%', height: 140, objectFit: 'cover', transition: 'filter 0.3s' }}
            />
            <div style={{ padding: 18 }}>
              <h4>Nouvel arrivage : « Le Seigneur des Anneaux »</h4>
              <small>1 Juillet 2025</small>
              <p style={{ fontSize: 15, marginTop: 8 }}>
                La trilogie <b>Le Seigneur des Anneaux</b> de J.R.R. Tolkien est désormais disponible ! Partez à l’aventure en Terre du Milieu avec Frodon et ses compagnons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;