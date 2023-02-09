const express = require('express');
const path = require('path');

const workoutRoutes = require('./routes/workouts');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/workouts', workoutRoutes);

// serve the front end
if (process.env.NODE_ENV === 'production') {
  // set the client build as static for express
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  // send anything thats NOT an api route to the react index.html
  app.get(/\/(?!api)*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
