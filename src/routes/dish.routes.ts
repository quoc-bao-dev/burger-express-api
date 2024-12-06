import { Router } from 'express';
import dishController from '../controllers/dish.controller';
import wrapAsync from '../middlewares/requestHandler';
import validateMiddleware from '../middlewares/validator.middleware';
import {
    validateCreateDishInput,
    validateUpdateDishInput,
} from '../validators/dish.validator';

const dishRoutes = Router();

dishRoutes.get('/', wrapAsync(dishController.getAll));
dishRoutes.get('/:slug', wrapAsync(dishController.getDishDetail));
dishRoutes.post(
    '/',
    validateMiddleware(validateCreateDishInput),
    wrapAsync(dishController.create)
);
dishRoutes.patch(
    '/:id',
    validateMiddleware(validateUpdateDishInput),
    wrapAsync(dishController.update)
);
dishRoutes.patch('/:id/change-order', wrapAsync(dishController.changeOrder));
dishRoutes.delete('/:id', wrapAsync(dishController.delete));

export default dishRoutes;
