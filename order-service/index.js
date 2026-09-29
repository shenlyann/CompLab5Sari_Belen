const express = require('express');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

const orders = [
  { id: 1, customer: 'alice', total: 99.99, status: 'created' },
  { id: 2, customer: 'bob', total: 49.99, status: 'paid' },
];

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'order-service' });
});

app.get('/orders', (_req, res) => {
  res.json(orders);
});

app.post('/orders', (req, res) => {
  const order = {
    id: orders.length + 1,
    customer: req.body.customer || 'guest',
    total: req.body.total || 0,
    status: 'created',
    items: req.body.items || [],
  };

  orders.push(order);
  res.status(201).json(order);
});

app.listen(port, () => {
  console.log(`Order service listening on port ${port}`);
});
