const { Router } = require('express');
const Workout = require('../models/Workout');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const workout = await Workout.insert(req.body);
    res.json(workout);
  } catch (e) {
    next(e);
  }
});
