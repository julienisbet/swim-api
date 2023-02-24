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
});
