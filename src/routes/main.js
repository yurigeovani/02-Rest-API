const {Router} = require('express');
const router = Router();

const {getProducts, createProduct, getProductById, deleteProduct, updateProduct} = require('../controllers/productsController');

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);






const categories = require('../controllers/categoriesControllers');

router.get('/categories', categories.get);
router.get('/categories/:id', categories.getById);
router.post('/categories', categories.post);
router.put('/categories/:id', categories.put);
router.delete('/categories/:id', categories.del);


module.exports = router;