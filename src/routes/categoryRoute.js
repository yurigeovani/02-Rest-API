import {Router} from 'express';
import {get, getById, post, put, del} from '../controllers/categoriesControllers.js'

const categoryRoute = Router();

categoryRoute.get('/', get);
categoryRoute.get('/:id', getById);
categoryRoute.post('/', post);
categoryRoute.put('/:id', put);
categoryRoute.delete('/:id', del);

export {
    categoryRoute
}