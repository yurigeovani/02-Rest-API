const {Router} = require('express');
const router = Router();

const products = require('../controllers/productsController');

router.get('/products', products.get);
router.get('/products/:id', products.getById);
router.post('/products', products.post);
router.put('/products/:id', products.put);
router.delete('/products/:id', products.del);




const categories = require('../controllers/categoriesControllers');

router.get('/categories', categories.get);
router.get('/categories/:id', categories.getById);
router.post('/categories', categories.post);
router.put('/categories/:id', categories.put);
router.delete('/categories/:id', categories.del);


module.exports = router;