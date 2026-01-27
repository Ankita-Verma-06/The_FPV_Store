const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../dbConfig');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [existingUsers] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const [result] = await pool.execute(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, hashedPassword, name]
        );

        const [newUser] = await pool.execute(
            'SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ?',
            [result.insertId]
        );

        const user = newUser[0];

        const token = jwt.sign(
            { email: user.email, id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({ result: user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        const existingUser = users[0];

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser.id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.execute(
            'SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC'
        );
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { register, login, getAllUsers };
