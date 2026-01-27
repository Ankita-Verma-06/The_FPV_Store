const express = require('express');
const router = express.Router();
const { getTutorials, createTutorial, updateTutorial, deleteTutorial } = require('../controllers/tutorialController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getTutorials);
router.post('/', protect, admin, createTutorial);
router.patch('/:id', protect, admin, updateTutorial);
router.delete('/:id', protect, admin, deleteTutorial);

module.exports = router;
