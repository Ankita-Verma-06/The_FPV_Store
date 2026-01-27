
const pool = require('../dbConfig.js');

const getTutorials = async (req, res) => {
    try {
        const [tutorials] = await pool.execute(
            'SELECT * FROM tutorials ORDER BY created_at DESC'
        );
        res.status(200).json(tutorials);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const getTutorial = async (req, res) => {
    try {
        const { id } = req.params;
        const [tutorials] = await pool.execute(
            'SELECT * FROM tutorials WHERE id = ?',
            [parseInt(id)]
        );

        if (tutorials.length === 0) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }

        res.status(200).json(tutorials[0]);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const createTutorial = async (req, res) => {
    try {
        const { title, content, videoUrl, author } = req.body;

        const [result] = await pool.execute(
            'INSERT INTO tutorials (title, content, video_url, author) VALUES (?, ?, ?, ?)',
            [title, content, videoUrl, author]
        );

        const [newTutorial] = await pool.execute(
            'SELECT * FROM tutorials WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json(newTutorial[0]);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const updateTutorial = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, videoUrl, author } = req.body;

        await pool.execute(
            'UPDATE tutorials SET title = ?, content = ?, video_url = ?, author = ? WHERE id = ?',
            [title, content, videoUrl, author, parseInt(id)]
        );

        const [updatedTutorial] = await pool.execute(
            'SELECT * FROM tutorials WHERE id = ?',
            [parseInt(id)]
        );

        res.status(200).json(updatedTutorial[0]);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const deleteTutorial = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute(
            'DELETE FROM tutorials WHERE id = ?',
            [parseInt(id)]
        );

        res.status(200).json({ message: 'Tutorial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

module.exports = { getTutorials, getTutorial, createTutorial, updateTutorial, deleteTutorial };
