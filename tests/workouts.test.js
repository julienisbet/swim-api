const { setupDb } = require('./utils');
const request = require('supertest');
const app = require('../lib/app');

describe('workout routes', () => {
  beforeEach(setupDb);

  describe('POST /workouts', () => {
    it('should create a new workout', async () => {
      const resp = await request(app)
        .post('/api/v1/workouts')
        .send({ name: 'New Workout', description: 'Workout description' });
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual({
        id: expect.any(String),
        name: 'New Workout',
        description: 'Workout description',
      });
    });
  });

  describe('GET /workouts/:id', () => {
    it('should return workout details', async () => {
      const resp = await request(app).get('/api/v1/workouts/1');
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual({
        id: '1',
        name: 'Ravioli Starfish',
        description: 'Mostly free - short distances',
      });
    });
  });
});
