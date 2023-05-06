const router = require('express').Router();

const usersCTRL = require('../controllers/usersCTRL');

router.post('/register', usersCTRL);
router.get('/profile', usersCTRL);
router.put('/update', usersCTRL);
router.post('/login', usersCTRL);

module.exports = router;
