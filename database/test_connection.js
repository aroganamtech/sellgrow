const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const { pool } = require('./mysql_client');

async function testConnection() {
  console.log('\n=============================================================');
  console.log('Testing MySQL Database Connection from database/ folder...');
  console.log(`Target Host: ${process.env.MYSQL_HOST || '127.0.0.1'}:${process.env.MYSQL_PORT || '3306'}`);
  console.log(`Database Name: ${process.env.MYSQL_DATABASE || 'sellgrow'}`);
  console.log('-------------------------------------------------------------');

  try {
    const [rows] = await pool.execute('SHOW TABLES;');
    console.log('✔ Connection Successful!');
    console.log(`✔ Found ${rows.length} active tables in '${process.env.MYSQL_DATABASE || 'sellgrow'}':\n`);
    rows.forEach((r, idx) => console.log(`  ${idx + 1}. ${Object.values(r)[0]}`));
    console.log('\n=============================================================\n');
    await pool.end();
  } catch (err) {
    console.error('❌ MySQL Connection Error:', err.message);
    process.exit(1);
  }
}

testConnection();
