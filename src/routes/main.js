import {Router} from 'express';
const router = Router();

import { categoryRoute } from './categoryRoute.js'
import { productRoute } from './productRoute.js';

router.use('/categories', categoryRoute);
router.use('/products', productRoute);

export {router};