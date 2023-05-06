const router = require('express').Router();

const productsCTRL = require('../controllers/productsCTRL');

router.get('/', productsCTRL);
router.get('/slug/:slug', productsCTRL);
router.get('/:id', productsCTRL);
router.post('/save', productsCTRL);

module.exports = router;
