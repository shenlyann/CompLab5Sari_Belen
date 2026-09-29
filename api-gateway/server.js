const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const services = {
  inventory: process.env.INVENTORY_SERVICE_URL || 'http://inventory-service:3001',
  order: process.env.ORDER_SERVICE_URL || 'http://order-service:3002',
  payment: process.env.PAYMENT_SERVICE_URL || 'http://payment-service:3003',
  notification: process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3004',
};

async function callService(serviceName, path, method = 'GET', body = null) {
  const baseUrl = services[serviceName];
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get('content-type') || '';
  const rawText = await response.text();
  const data = contentType.includes('application/json') && rawText ? JSON.parse(rawText) : rawText;

  return {
    status: response.status,
    data,
  };
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

app.get('/api/inventory', async (_req, res) => {
  try {
    const result = await callService('inventory', '/items');
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Inventory service unavailable', error: error.message });
  }
});

app.get('/api/orders', async (_req, res) => {
  try {
    const result = await callService('order', '/orders');
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Order service unavailable', error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const result = await callService('order', '/orders', 'POST', req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Order service unavailable', error: error.message });
  }
});

app.post('/api/payments', async (req, res) => {
  try {
    const result = await callService('payment', '/payments', 'POST', req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Payment service unavailable', error: error.message });
  }
});

app.post('/api/notifications', async (req, res) => {
  try {
    const result = await callService('notification', '/notifications', 'POST', req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Notification service unavailable', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
