const router = require('express').Router();
const { uploadMedia, getMedia, deleteMedia } = require('../controllers/mediaController');
const { auth, adminOnly } = require('../middleware/auth');
const { upload } = require('../services/cloudinary');

router.get('/', auth, adminOnly, getMedia);
router.post('/upload', auth, adminOnly, upload.single('file'), uploadMedia);
router.delete('/:id', auth, adminOnly, deleteMedia);

module.exports = router;
