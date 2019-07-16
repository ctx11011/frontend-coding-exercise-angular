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
  const sort = req.query.sort ? req.query.sort : 'id';
  const direction = req.query.direction ? req.query.direction : 'desc';
  const type = req.query.type ? req.query.type : 'string';

  const items = orders
    .sort((a, b) => sortFn(a, b, type, sort, direction))
    .slice(100 * (page - 1), 100 * page);

  res.send({
    page: page,
    pageSize: 100,
    total: orders.length,
    count: items.length,
    items
  });
});


app.listen(4300, () => console.log('Server active on port 4300!'));

function sortFn(a, b, type, prop, direction) {
  switch (type) {
    case 'string':
      a = getProp(a, prop);
      b = getProp(b, prop);
      if (!a) {
        return 1;
      }
      if (!b) {
        return -1;
      }
      if (a.toLowerCase() === b.toLowerCase()) {
        return 0;
      }
      return direction === 'asc'
        ? a.toLowerCase() < b.toLowerCase() ? -1 : 1
        : a.toLowerCase() > b.toLowerCase() ? -1 : 1;
    case 'number':
        a = getProp(a, prop);
        b = getProp(b, prop);
      return direction === 'asc' ? a - b : b - a;
    case 'date':
      a = new Date(getProp(a, prop));
      b = new Date(getProp(b, prop));
      return direction === 'asc' ? a - b : b - a;
  }
}

function getProp(object, field) {
  const properties = field.split('.');
  return properties.reduce((acc, val) => {
    return acc && acc[val] || null;
  }, object);
}
