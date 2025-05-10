const express = require('express');
const app = express();
const cors = require('cors');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const db = require('./db');

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

////////////////////////////////////////////////////////////////////
// ✅ Segment creation API
app.post('/api/segments', async (req, res) => {
  const { name, rules } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO segments (name, rules) VALUES (?, ?)',
      [name, JSON.stringify(rules)]
    );
    res.json({ message: 'Segment saved!', segment_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Segment preview (audience size) API
app.post('/api/segments/preview', async (req, res) => {
  const { rules } = req.body;
  let whereClause = rules.map(rule =>
    `${rule.field} ${rule.operator} ${db.escape(rule.value)}`
  ).join(' AND ');
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) as count FROM customers WHERE ${whereClause}`
    );
    res.json({ audience_size: rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Campaign creation API
app.post('/api/campaigns', async (req, res) => {
  const { segment_id, message } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO campaigns (segment_id, message) VALUES (?, ?)',
      [segment_id, message]
    );
    res.json({ message: 'Campaign created!', campaign_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Campaign history fetch API
app.get('/api/campaigns', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT campaigns.*, segments.name AS segment_name
      FROM campaigns
      JOIN segments ON campaigns.segment_id = segments.id
      ORDER BY campaigns.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//////////////////////////////////////////////////////////

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
