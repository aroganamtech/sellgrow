const mysql = require('mysql2/promise');
const path = require('path');

// Safe fallback for standalone CLI scripts without causing bundler warnings
if (typeof process !== 'undefined' && !process.env.NEXT_RUNTIME) {
  try {
    const dotenvMod = 'dotenv';
    require(dotenvMod).config({ path: path.join(__dirname, '..', '.env.local') });
  } catch (e) { }
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'sellgrow',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  dateStrings: true,
});

async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('MySQL Query Error:', error.message, 'SQL:', sql);
    throw error;
  }
}

async function execute(sql, params = []) {
  try {
    const [result] = await pool.execute(sql, params);
    return result;
  } catch (error) {
    console.error('MySQL Execute Error:', error.message, 'SQL:', sql);
    throw error;
  }
}

function getPool() {
  return pool;
}

module.exports = {
  pool,
  query,
  execute,
  getPool,
};
