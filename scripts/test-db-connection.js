const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('Testing MySQL database connection...');
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'sellgrow',
    });

    const [rows] = await pool.execute('SHOW TABLES;');
    console.log('\n==========================================');
    console.log('SUCCESS! MySQL Connection Established!');
    console.log('Tables found in sellgrow database:');
    rows.forEach(r => console.log(' - ' + Object.values(r)[0]));
    console.log('==========================================\n');
    await pool.end();
  } catch (err) {
    console.error('MySQL Test Connection Error:', err.message);
    process.exit(1);
  }
}

testConnection();
