const { setupDb } = require('./utils');
const request = require('supertest');
const app = require('../lib/app');

describe('parts routes', () => {
  beforeEach(setupDb);

  describe('POST /parts', () => {
    it('should create a new part', async () => {
      const resp = await request(app).post('/api/v1/parts').send({
        qty: 4,
        distance: '200',
        base: 'base + 10',
        swimSetId: 2,
        orderNum: 3,
      });
      expect(resp.status).toBe(200);
      expect(resp.body).toMatchInlineSnapshot(`
        Object {
          "base": "base + 10",
          "detail": null,
          "distance": 200,
          "id": "6",
          "orderNum": 3,
          "qty": 4,
          "stroke": null,
          "swimSetId": "2",
        }
      `);
    });
  });

  describe('DELETE /parts/:id', () => {
    it('should delete a part', async () => {
      const resp = await request(app).delete('/api/v1/parts/1');
      expect(resp.status).toBe(204);
    });
  });
});
