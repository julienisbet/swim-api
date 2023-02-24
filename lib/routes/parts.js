const { Router } = require('express');
const Part = require('../models/Part');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const workout = await Part.insert(req.body);
    res.json(workout);
  } catch (e) {
    next(e);
  }
});
