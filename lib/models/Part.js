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
    this.orderNum = row.order_num;
  }

  static async insert({
    swimSetId,
    qty,
    distance,
    base,
    stroke,
    detail,
    orderNum,
  }) {
    const { rows } = await pool.query(
      `
        INSERT INTO parts (swim_set_id, qty, distance, base, stroke, detail, order_num)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [swimSetId, qty, distance, base, stroke, detail, orderNum]
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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from parts where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Part(rows[0]);
  }

  static async update(id, newAttrs) {
    const part = await Part.getById(id);
    if (!part) return null;

    const updatedData = { ...part, ...newAttrs };
    const { rows } = await pool.query(
      `
    UPDATE parts 
    SET order_num = $2
    WHERE id = $1
    RETURNING *
    `,
      [id, updatedData.orderNum]
    );
    return new Part(rows[0]);
  }

  static async count() {
    const { rows } = await pool.query('select COUNT(*) as count from parts');
    return rows[0].count;
  }
};
