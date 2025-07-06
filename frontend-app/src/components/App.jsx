import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Accueil from './Accueil';
import GestionOuvrages from './GestionOuvrages';
import Reservation from './Reservation';
import Emprunt from './Emprunt';
import Abonnement from './Abonnement';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import Bibliothecaire from './Bibliothecaire';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  const handleLogin = () => {
    setIsAuth(true);
    setShowRegister(false); // Cache l'inscription après connexion
  };

  if (!isAuth) {
    if (showRegister) {
      return <Register onRegister={() => setShowRegister(false)} onShowLogin={() => setShowRegister(false)} />;
    }
    return <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />;
  }

  return (
    <div>
      <nav style={{ padding: 20, background: '#eee', marginBottom: 30, display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ marginRight: 20 }}>Accueil</Link>
        <Link to="/ouvrages" style={{ marginRight: 20 }}>Ouvrages</Link>
        <Link to="/abonnements" style={{ marginRight: 20 }}>Abonnements</Link>
        <Link to="/reservations" style={{ marginRight: 20 }}>Réservations</Link>
        <Link to="/emprunts" style={{ marginRight: 20 }}>Emprunts</Link>
        {isAuth && (
          <button onClick={handleLogout} style={{
            marginLeft: 'auto', background: '#3366cc', color: '#fff', border: 'none',
            borderRadius: 4, padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold'
          }}>
            Déconnexion
          </button>
        )}
      </nav>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/ouvrages" component={GestionOuvrages} />
        <Route path="/abonnements" render={() =>
          <PrivateRoute isAuth={isAuth} onLogin={handleLogin}>
            <Abonnement />
          </PrivateRoute>
        } />
        <Route path="/reservations" render={() =>
          <PrivateRoute isAuth={isAuth} onLogin={handleLogin}>
            <Reservation />
          </PrivateRoute>
        } />
        <Route path="/emprunts" render={() =>
          <PrivateRoute isAuth={isAuth} onLogin={handleLogin}>
            <Emprunt />
          </PrivateRoute>
        } />
        <Route path="/biblio" render={() =>
          <PrivateRoute isAuth={isAuth} onLogin={handleLogin} requiredRole="bibliothecaire">
            <Bibliothecaire />
          </PrivateRoute>
        } />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;