const {Router} = require('express');
const router = Router();

const {getProducts, createProduct, getProductById, deleteProduct, updateProduct} = require('../controllers/productsController');

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;