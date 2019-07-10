import * as express from 'express';

const app = express();

const orders = require('./data/orders.json');

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('');
});

/**
 * Fetches a list of orders, paginated.
 * Parameters: page (number) the current page, starting at 1.
 */
app.get('/orders', (req, res) => {
  const page = req.query.page ? Math.max(1, req.query.page) : 1;

  const items = orders.slice(100 * (page - 1), 100 * page);

  res.send({
    page: page,
    pageSize: 100,
    total: orders.length,
    count: items.length,
    items
  });
});

/**
 * Fetches a single order.
 * Parameters: id (number) the order id.
 */
app.get('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const orderItem = orders.filter(order => order.id === id);

  res.send(orderItem.length ? orderItem[0] : 404);
});

app.listen(4300, () => console.log('Server active on port 4300!'));
