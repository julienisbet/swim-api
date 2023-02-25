const { Router } = require('express');
const Part = require('../models/Part');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const workout = await Part.insert(req.body);
      res.json(workout);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await Part.delete(req.params.id);
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
