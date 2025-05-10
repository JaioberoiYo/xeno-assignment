const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { customer_id, order_date, amount, product_name, category, status } = req.body;

  try {
    const orderSql = `
      INSERT INTO orders (customer_id, order_date, amount, product_name, category, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const orderValues = [customer_id, order_date, amount, product_name, category, status];
    await db.query(orderSql, orderValues);

    const updateCustomerSql = `
      UPDATE customers
      SET total_spend = total_spend + ?, num_orders = num_orders + 1, last_active_date = ?
      WHERE id = ?
    `;
    const updateValues = [amount, order_date, customer_id];
    await db.query(updateCustomerSql, updateValues);

    res.status(201).json({ message: 'Order created and customer updated!' });
  } catch (err) {
    console.error('Error inserting order:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
