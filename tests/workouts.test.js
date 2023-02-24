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
      expect(resp.body).toMatchInlineSnapshot(`
        Object {
          "description": "Mostly free - short distances",
          "id": "1",
          "name": "Ravioli Starfish",
          "sets": Array [
            Object {
              "description": "Warm Up",
              "id": 1,
              "parts": Array [
                Object {
                  "base": null,
                  "detail": "Kick",
                  "distance": 50,
                  "id": 1,
                  "qty": 3,
                  "swimSetId": 1,
                },
                Object {
                  "base": null,
                  "detail": "Drill",
                  "distance": 50,
                  "id": 2,
                  "qty": 1,
                  "swimSetId": 1,
                },
                Object {
                  "base": null,
                  "detail": "Swim",
                  "distance": 100,
                  "id": 3,
                  "qty": 1,
                  "swimSetId": 1,
                },
              ],
              "repeat": 1,
              "workoutId": 1,
            },
            Object {
              "description": "Main Set",
              "id": 2,
              "parts": Array [
                Object {
                  "base": "Kick Base",
                  "detail": "kick descend 1-3, 4-6",
                  "distance": 100,
                  "id": 4,
                  "qty": 6,
                  "swimSetId": 2,
                },
                Object {
                  "base": "Base + 20",
                  "detail": "2x through: buildup, build down, easy, fast",
                  "distance": 50,
                  "id": 5,
                  "qty": 8,
                  "swimSetId": 2,
                },
              ],
              "repeat": 2,
              "workoutId": 1,
            },
            Object {
              "description": "Warm Down",
              "id": 3,
              "parts": Array [],
              "repeat": 1,
              "workoutId": 1,
            },
          ],
        }
      `);
    });
  });

  describe('POST /workouts/:id/sets', () => {
    it('should add a new associated set to the workout', async () => {
      const resp = await request(app).post('/api/v1/workouts/1/sets').send({
        description: 'Another Set',
        repeat: 1,
      });
      expect(resp.status).toBe(200);
      const {
        body: { sets },
      } = await request(app).get('/api/v1/workouts/1');
      expect(sets.length).toBe(4);
    });
  });
});
