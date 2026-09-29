const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const inventory = [
  { id: 1, name: 'Laptop', price: 999.99, stock: 12 },
  { id: 2, name: 'Mouse', price: 29.99, stock: 50 },
  { id: 3, name: 'Keyboard', price: 79.99, stock: 20 },
];

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'inventory-service' });
});

app.get('/items', (_req, res) => {
  res.json(inventory);
});

app.get('/items/:id', (req, res) => {
  const item = inventory.find((entry) => entry.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
});

app.listen(port, () => {
  console.log(`Inventory service listening on port ${port}`);
});
