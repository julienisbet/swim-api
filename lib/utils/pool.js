const { Pool } = require('pg');

const { exec } = require('child_process');

const connectionString =
  process.env.DATABASE_URL ||
  `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PW}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`;

function createDB() {
  const setupCmd = `psql ${connectionString}/${process.env.DATABASE_DEFAULT} -tc "SELECT 1 FROM pg_database WHERE datname = '${process.env.DATABASE_NAME}'" | grep -q 1 || psql ${connectionString}/${process.env.DATABASE_DEFAULT} -c "CREATE DATABASE ${process.env.DATABASE_NAME}"`;
  return new Promise((resolve, reject) => {
    exec(setupCmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

const pool = new Pool({
  connectionString: `${connectionString}/${process.env.DATABASE_NAME}`,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

// eslint-disable-next-line no-console
pool.on('connect', () => console.log('🐘 Postgres connected'));

module.exports = { pool, createDB };
