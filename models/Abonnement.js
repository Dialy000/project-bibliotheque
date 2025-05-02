const mongoose = require('mongoose');

const abonnementSchema = new mongoose.Schema({
  utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  type_paiement: { type: String, enum: ['Wave', 'OM'], required: true },
  date_souscription: { type: Date, default: Date.now },
  date_expiration: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Abonnement', abonnementSchema);
