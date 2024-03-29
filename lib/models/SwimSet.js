const pool = require('../../sql/pool');
const Part = require('./Part');

module.exports = class SwimSet {
  id;
  workoutId;
  repeat;
  description;
  constructor(row) {
    this.id = row.id;
    this.workoutId = row.workout_id;
    this.repeat = row.repeat;
    this.description = row.description;
    this.parts = row.parts ? row.parts.map((detail) => new Part(detail)) : [];
  }

  static async insert(workoutId, { description, repeat }) {
    const { rows } = await pool.query(
      `
        INSERT INTO swim_sets (workout_id, description, repeat)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [workoutId, description, repeat]
    );
    return new SwimSet(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM swim_sets CASCADE WHERE id=($1) RETURNING *',
      [id]
    );
    if (!rows.length) return null;
    return new SwimSet(rows[0]);
  }
};
