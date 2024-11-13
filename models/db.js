const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.RENDER_DB_URL,
});

module.exports = pool;
