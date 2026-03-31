const router = require('express').Router();
const { getProjects, getProject, createProject, updateProject, deleteProject, getCategories } = require('../controllers/projectController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', getProjects);
router.get('/categories', getCategories);
router.get('/:id', getProject);
router.post('/', auth, adminOnly, createProject);
router.put('/:id', auth, adminOnly, updateProject);
router.delete('/:id', auth, adminOnly, deleteProject);

module.exports = router;
