const express = require('express');
const knex = require('../db/connection'); // Adjust the path to your Knex setup
const authenticate = require('../middleware/authenticate'); // Your JWT middleware

const router = express.Router();

// Create a new phone
router.post('/', authenticate, async (req, res) => {
  const phoneData = req.body;

  try {
    const result = await knex.raw(`
      INSERT INTO phones (brand, model, year, condition, color, storage, price, description, is_available, trade_in) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`, 
      [phoneData.brand, phoneData.model, phoneData.year, phoneData.condition, phoneData.color, phoneData.storage, phoneData.price, phoneData.description, phoneData.is_available, phoneData.trade_in]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create phone.' });
  }
});

// Update a phone
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await knex.raw(`
      UPDATE phones SET brand = ?, model = ?, year = ?, condition = ?, color = ?, storage = ?, price = ?, description = ?, is_available = ?, trade_in = ? 
      WHERE id = ? RETURNING *`, 
      [req.body.brand, req.body.model, req.body.year, req.body.condition, req.body.color, req.body.storage, req.body.price, req.body.description, req.body.is_available, req.body.trade_in, id]);
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update phone.' });
  }
});

// Delete a phone
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    await knex.raw(`DELETE FROM phones WHERE id = ?`, [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete phone.' });
  }
});

// Get all phones
router.get('/', async (req, res) => {
  try {
    const result = await knex.raw(`SELECT * FROM phones`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve phones.' });
  }
});

// Add phone to favorites
router.post('/:id/favorite', authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Assuming you have user info from authentication

  try {
    const result = await knex.raw(`
      INSERT INTO favorites (user_id, phone_id) 
      VALUES (?, ?) RETURNING *`, [userId, id]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to favorites.' });
  }
});

module.exports = router;
