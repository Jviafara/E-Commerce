const router = require('express').Router();

const orderCTRL = require('../controllers/ordersCTRL');

router.post('/create', orderCTRL);
router.get('/fetch-order/:id', orderCTRL);
router.get('/fetch-orders', orderCTRL);

module.exports = router;
