const router = require('express').Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', getExperiences);
router.post('/', auth, adminOnly, createExperience);
router.put('/:id', auth, adminOnly, updateExperience);
router.delete('/:id', auth, adminOnly, deleteExperience);

module.exports = router;
