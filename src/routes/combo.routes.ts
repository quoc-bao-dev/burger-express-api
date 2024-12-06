import { Router } from 'express';
import comboController from '../controllers/combo.controller';
import wrapAsync from '../middlewares/requestHandler';
import validateMiddleware from '../middlewares/validator.middleware';
import {
    validateCreateComboInput,
    validateUpdateComboInput,
} from '../validators/combo.validator';

const comboRoutes = Router();

comboRoutes.get('/', wrapAsync(comboController.getAll));
comboRoutes.get('/:slug', wrapAsync(comboController.getComboDetail));
comboRoutes.post(
    '/',
    validateMiddleware(validateCreateComboInput),
    wrapAsync(comboController.create)
);
comboRoutes.patch(
    '/:id',
    validateMiddleware(validateUpdateComboInput),
    wrapAsync(comboController.update)
);
comboRoutes.post('/:comboId/add-dish', wrapAsync(comboController.addDish));
comboRoutes.delete(
    '/:comboId/remove-dish/:dishId',
    wrapAsync(comboController.removeDish)
);
comboRoutes.delete('/:id', wrapAsync(comboController.delete));

export default comboRoutes;
