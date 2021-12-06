import {Router} from 'express';
import {get, getById, post, put, del} from '../controllers/productsController.js';

const productRoute = Router();

productRoute.get('/', get);
productRoute.get('/:id', getById);
productRoute.post('/', post);
productRoute.put('/:id', put);
productRoute.delete('/:id', del);

export {
    productRoute
}