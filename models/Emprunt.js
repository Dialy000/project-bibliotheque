const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema({
  utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  ouvrage_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ouvrage', required: true },
  date_emprunt: { type: Date, default: Date.now },
  date_retour: { type: Date, required: true },
  approuve: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Emprunt', empruntSchema);
