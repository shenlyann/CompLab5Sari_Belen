const express = require('express');

const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'notification-service' });
});

app.post('/notifications', (req, res) => {
  const { customer, message } = req.body || {};

  res.json({
    success: true,
    message: `Notification sent to ${customer || 'customer'}: ${message || 'Order status update'}`,
  });
});

app.listen(port, () => {
  console.log(`Notification service listening on port ${port}`);
});
