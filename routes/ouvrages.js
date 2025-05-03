const express = require('express');
const router = express.Router();
const Ouvrage = require('../models/Ouvrage');

// CREATE Ouvrage
router.post('/', async (req, res) => {
  try {
    const data = await Ouvrage.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const list = await Ouvrage.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const item = await Ouvrage.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Ouvrage non trouvé' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Ouvrage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Ouvrage non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Ouvrage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Ouvrage non trouvé' });
    res.json({ message: 'Ouvrage supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
