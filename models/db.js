const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.RENDER_DB_URL,
});

module.exports = pool;
