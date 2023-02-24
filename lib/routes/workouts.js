const { Router } = require('express');
const Workout = require('../models/Workout');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const workout = await Workout.get(req.params.id);
      if (!workout) return next();
      res.json(workout);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const workout = await Workout.insert(req.body);
      res.json(workout);
    } catch (e) {
      next(e);
    }
  });
