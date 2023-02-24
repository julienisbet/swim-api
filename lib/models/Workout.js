const pool = require('../../sql/pool');

module.exports = class Workout {
  id;
  name;
  description;
  sets;

  constructor({ id, name, description, sets }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sets = sets;
  }

  static async get(id) {
    const { rows } = await pool.query(
      `
        SELECT workouts.*, 
        COALESCE(
          json_agg(to_jsonb(swim_sets))
          FILTER (WHERE swim_sets.id IS NOT NULL), '[]'
      ) as sets FROM workouts INNER JOIN swim_sets on swim_sets.workout_id = workouts.id
        WHERE workouts.id = $1
        GROUP BY workouts.id
      `,
      [id]
    );
    if (!rows.length) return null;
    return new Workout(rows[0]);
  }
  static async insert({ name, description }) {
    const { rows } = await pool.query(
      `
        INSERT INTO workouts (name, description)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name, description]
    );
    return new Workout(rows[0]);
  }
};
