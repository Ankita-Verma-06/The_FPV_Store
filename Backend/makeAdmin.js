const pool = require('./dbConfig');

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.log('Please provide an email address.');
        console.log('Usage: node makeAdmin.js <email>');
        process.exit(1);
    }

    try {
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        await pool.execute(
            'UPDATE users SET role = ? WHERE email = ?',
            ['admin', email]
        );

        console.log(`Success! User ${email} is now an admin.`);
        console.log('Please log out and log back in to see the changes.');
    } catch (e) {
        console.error('Error updating user:', e.message);
    } finally {
        await pool.end();
    }
}

main();
