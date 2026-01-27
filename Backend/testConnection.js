const pool = require('./dbConfig');

async function testConnection() {
    try {
        console.log('Testing database connection...');
        const [rows] = await pool.execute('SELECT 1 + 1 AS result');
        console.log('✅ Database connection successful!');
        console.log('Test query result:', rows[0].result);

        const [tables] = await pool.execute('SHOW TABLES');
        console.log('\n📋 Tables in database:');
        tables.forEach(table => {
            console.log('  -', Object.values(table)[0]);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed!');
        console.error('Error:', error.message);
        console.error('\nCommon issues:');
        console.error('  1. Check DATABASE_URL format: mysql://user:pass@host:port/db');
        console.error('  2. Make sure MySQL server is running');
        console.error('  3. Verify username and password are correct');
        console.error('  4. Check if database exists');
        console.error('  5. URL encode special characters in password');
        process.exit(1);
    }
}

testConnection();
