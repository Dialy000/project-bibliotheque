const express = require('express');
const router = express.Router();
const Abonnement = require('../models/Abonnement');

// CREATE Abonnement
router.post('/', async (req, res) => {
  try {
    const data = await Abonnement.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const list = await Abonnement.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const item = await Abonnement.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Abonnement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Abonnement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.json({ message: 'Abonnement supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
