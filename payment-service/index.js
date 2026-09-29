const express = require('express');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'payment-service' });
});

app.post('/payments', (req, res) => {
  const { customer, amount } = req.body || {};

  res.json({
    success: true,
    paymentId: `pay_${Date.now()}`,
    customer: customer || 'guest',
    amount: amount || 0,
    status: 'approved',
  });
});

app.listen(port, () => {
  console.log(`Payment service listening on port ${port}`);
});
