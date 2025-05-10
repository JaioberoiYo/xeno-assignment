const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const {
    name, email, phone, gender, age, city,
    joined_date, last_active_date,
    total_spend, num_orders, preferred_category, email_verified
  } = req.body;

  try {
    const sql = `
      INSERT INTO customers (
        name, email, phone, gender, age, city,
        joined_date, last_active_date,
        total_spend, num_orders, preferred_category, email_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name, email, phone, gender, age, city,
      joined_date, last_active_date,
      total_spend, num_orders, preferred_category, email_verified
    ];

    await db.query(sql, values);
    res.status(201).json({ message: 'Customer created successfully!' });
  } catch (err) {
    console.error('Error inserting customer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
