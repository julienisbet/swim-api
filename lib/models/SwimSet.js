const pool = require('../../sql/pool');

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
};
