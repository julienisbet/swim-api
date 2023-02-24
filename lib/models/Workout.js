const pool = require('../../sql/pool');

module.exports = class Workout {
  id;
  name;
  description;

  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
    this.description = description;
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