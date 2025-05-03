require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/utilisateurs', require('./routes/utilisateurs'));
app.use('/api/ouvrages', require('./routes/ouvrages'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/emprunts', require('./routes/emprunts'));
app.use('/api/abonnements', require('./routes/abonnements'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/biblio';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .then(() => console.log('Lien BD: mongodb://localhost:27017/biblio'))
  .catch(err => console.error('Erreur connexion MongoDB', err));

app.get('/', (req,res)=> res.send('Backend Bibliothèque Universitaire opérationnel'));

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
