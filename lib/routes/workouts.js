const { Router } = require('express');

module.exports = Router().get('/', (req, res) => {
  res.json({ hello: 'world' });
});
