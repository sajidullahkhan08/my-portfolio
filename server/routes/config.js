const router = require('express').Router();
const { getConfig, getConfigByKey, updateConfig, updateMultipleConfigs } = require('../controllers/configController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', getConfig);
router.get('/:key', getConfigByKey);
router.put('/', auth, adminOnly, updateConfig);
router.put('/bulk', auth, adminOnly, updateMultipleConfigs);

module.exports = router;
