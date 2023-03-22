const pool = require('../../sql/pool');
const SwimSet = require('./SwimSet');

module.exports = class Workout {
  id;
  name;
  description;
  sets;

  constructor({ id, name, description, sets }) {
    this.id = id;
    this.name = name;
    this.description = description;
    if (sets) {
      this.sets = sets.map((detail) => new SwimSet(detail));
    }
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * from workouts LIMIT 10;
    `);
    return rows.map((row) => new Workout(row));
  }
  static async get(id) {
    const { rows } = await pool.query(
      `
        SELECT workouts.*, 
        COALESCE(
          json_agg(to_jsonb(swim_sets))
          FILTER (WHERE swim_sets.id IS NOT NULL), '[]'
      ) as sets FROM workouts LEFT JOIN (
        SELECT swim_sets.*, 
        COALESCE(
          json_agg(to_jsonb(parts))
            FILTER (WHERE parts.id IS NOT NULL), '[]'
          ) as parts FROM swim_sets           
          LEFT JOIN parts on swim_sets.id = parts.swim_set_id
          GROUP BY swim_sets.id
      ) as swim_sets on swim_sets.workout_id = workouts.id
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
