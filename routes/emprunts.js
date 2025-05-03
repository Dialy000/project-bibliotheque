const express = require('express');
const router = express.Router();
const Emprunt = require('../models/Emprunt');

// CREATE Emprunt
router.post('/', async (req, res) => {
  try {
    const data = await Emprunt.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const list = await Emprunt.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const item = await Emprunt.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Emprunt non trouvé' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Emprunt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Emprunt non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Emprunt.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Emprunt non trouvé' });
    res.json({ message: 'Emprunt supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
