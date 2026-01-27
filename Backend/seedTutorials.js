
const pool = require('./dbConfig');

const seedTutorials = async () => {
    try {
        console.log('Seeding tutorials...');

        // Ensure table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tutorials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                video_url VARCHAR(500),
                author VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Check if tutorials exist
        const [rows] = await pool.query('SELECT count(*) as count FROM tutorials');
        if (rows[0].count > 0) {
            console.log('Tutorials already exist. Cleaning up old data to add new links...');
            await pool.query('DELETE FROM tutorials');
        }

        const tutorials = [
            {
                title: "Complete FPV Drone Build Guide - 2024",
                content: "Step-by-step guide to building a 5-inch freestyle drone. From frame assembly to flight controller wiring, this is the ultimate resource for beginners.",
                video_url: "https://www.youtube.com/watch?v=L8_3o6gM3mE",
                author: "Joshua Bardwell"
            },
            {
                title: "Betaflight 4.5 Setup & Tuning",
                content: "Get your drone in the air with this comprehensive Betaflight configuration tutorial. Learn about PID tuning, rates, and bi-directional DSHOT.",
                video_url: "https://www.youtube.com/watch?v=O1S1O3Z8eEw",
                author: "Chris Rosser"
            },
            {
                title: "Mastering Soldering for FPV",
                content: "Soldering is the #1 skill you need. Learn how to solder XT60s, tiny FC pads, and motor wires without burning components.",
                video_url: "https://www.youtube.com/watch?v=I_NU2ruzyc4",
                author: "Rotor Riot"
            },
            {
                title: "Cinematic FPV Freestyle Tricks",
                content: "Take your flying to the next level. Learn power loops, split-S, and orbit maneuvers to capture cinematic footage.",
                video_url: "https://www.youtube.com/watch?v=Vl0C1o_yTyg",
                author: "Mr Steele"
            },
            {
                title: "Digital FPV: DJI O3 Installation",
                content: "Installing the DJI O3 Air Unit into your frame. Wiring diagrams, heat management, and activation process explained.",
                video_url: "https://www.youtube.com/watch?v=PrXy42Qj1v4",
                author: "Botgrinder"
            }
        ];

        for (const t of tutorials) {
            await pool.query(
                'INSERT INTO tutorials (title, content, video_url, author) VALUES (?, ?, ?, ?)',
                [t.title, t.content, t.video_url, t.author]
            );
        }

        console.log('Tutorials seeded successfully with video links!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedTutorials();
