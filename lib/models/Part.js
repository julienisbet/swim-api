const pool = require('../../sql/pool');

module.exports = class Part {
  id;
  swimSetId;
  qty;
  distance;
  base;
  detail;
  stroke;

  constructor(row) {
    this.id = row.id;
    this.swimSetId = row.swim_set_id;
    this.qty = row.qty;
    this.distance = row.distance;
    this.base = row.base;
    this.detail = row.detail;
    this.stroke = row.stroke;
  }

  static async insert({ swimSetId, qty, distance, base, stroke, detail }) {
    const { rows } = await pool.query(
      `
        INSERT INTO parts (swim_set_id, qty, distance, base, stroke, detail)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [swimSetId, qty, distance, base, stroke, detail]
    );
    return new Part(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM parts WHERE id=($1) RETURNING *',
      [id]
    );
    if (!rows.length) return null;
    return new Part(rows[0]);
  }

  static async count() {
    const { rows } = await pool.query('select COUNT(*) as count from parts');
    return rows[0].count;
  }
};
