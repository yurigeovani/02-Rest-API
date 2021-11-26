const {Router} = require('express');
const router = Router();

const {getProducts, createProduct, getProductById, deleteProduct, updateProduct} = require('../controllers/productsController');

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);





const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoriesControllers');

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);




module.exports = router;