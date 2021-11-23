const {Router} = require('express');
const router = Router();

const {getProducts} = require('../controllers/productsController');

router.get('/products', getProducts);

module.exports = router;