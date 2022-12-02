const { Pool } = require('pg');

const { DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DB_USER } = process.env;
const connectionString =
  process.env.DATABASE_URL || process.env.NODE_ENV === 'test'
    ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}_test`;

const pool = new Pool({
  connectionString: `${connectionString}/${process.env.DATABASE_NAME}`,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

// eslint-disable-next-line no-console
pool.on('connect', () => console.log('🐘 Postgres connected'));

module.exports = { pool };
