const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  ouvrage_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ouvrage', required: true },
  date_reservation: { type: Date, default: Date.now },
  approuve: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
