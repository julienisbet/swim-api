const { pool, createDB } = require('./lib/utils/pool');
const setup = require('./data/setup');

async function setupDB() {
  try {
    await createDB();
    setup(pool)
      .catch((err) => console.error(err))
      .finally(() => process.exit());
  } catch (e) {
    console.error(e);
  }
}

setupDB();
