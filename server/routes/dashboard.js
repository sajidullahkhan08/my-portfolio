const router = require('express').Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/stats', auth, adminOnly, getDashboardStats);

module.exports = router;
