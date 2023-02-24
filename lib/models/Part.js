const pool = require('../../sql/pool');

module.exports = class Part {
  id;
  swimSetId;
  qty;
  distance;
  base;
  detail;

  constructor(row) {
    this.id = row.id;
    this.swimSetId = row.swim_set_id;
    this.qty = row.qty;
    this.distance = row.distance;
    this.base = row.base;
    this.detail = row.detail;
  }

  static async insert({ swimSetId, qty, distance, base }) {
    const { rows } = await pool.query(
      `
        INSERT INTO parts (swim_set_id, qty, distance, base)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [swimSetId, qty, distance, base]
    );
    return new Part(rows[0]);
  }
};
