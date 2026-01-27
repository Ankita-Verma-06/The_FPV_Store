require('dotenv').config();

console.log('=== Environment Variables Debug ===\n');

console.log('DATABASE_URL value:');
console.log(JSON.stringify(process.env.DATABASE_URL));
console.log('\nLength:', process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 'undefined');
console.log('First char:', process.env.DATABASE_URL ? process.env.DATABASE_URL[0] : 'undefined');
console.log('Last char:', process.env.DATABASE_URL ? process.env.DATABASE_URL[process.env.DATABASE_URL.length - 1] : 'undefined');

console.log('\n=== Other variables ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '(set)' : '(not set)');
console.log('PORT:', process.env.PORT);

console.log('\n=== Fix Instructions ===');
if (process.env.DATABASE_URL) {
    const url = process.env.DATABASE_URL;
    if (url.startsWith('"') || url.endsWith('"')) {
        console.log('❌ DATABASE_URL has quote characters in the value!');
        console.log('   The .env file should have:');
        console.log('   DATABASE_URL=mysql://root:newton123@localhost:3306/fpv_store');
        console.log('   (no quotes in .env file)');
    } else if (!url.startsWith('mysql://')) {
        console.log('❌ DATABASE_URL does not start with mysql://');
    } else {
        console.log('✅ DATABASE_URL format looks correct!');
    }
} else {
    console.log('ℹ️  DATABASE_URL is not set, will use individual variables');
}
