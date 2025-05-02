const mongoose = require('mongoose');

const ouvrageSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  categorie: { type: String, required: true },
  disponible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Ouvrage', ouvrageSchema);
