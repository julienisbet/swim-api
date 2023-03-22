const { Router } = require('express');
const Workout = require('../models/Workout');
const SwimSet = require('../models/SwimSet');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const workouts = await Workout.getAll();
      res.json(workouts);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const workout = await Workout.get(req.params.id);
      if (!workout) return next();
      res.json(workout);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/sets', async (req, res, next) => {
    try {
      const swimSet = await SwimSet.insert(req.params.id, req.body);
      res.json(swimSet);
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
  })
  .delete('/:id/sets/:setId', async (req, res, next) => {
    try {
      const swimSet = await SwimSet.delete(req.params.setId);
      if (!swimSet) next();
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
