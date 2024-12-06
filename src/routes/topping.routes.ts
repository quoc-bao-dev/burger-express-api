import { Router } from 'express';
import wrapAsync from '../middlewares/requestHandler';
import toppingController from '../controllers/topping.controller';

const toppingRoutes = Router();

toppingRoutes.get('/', wrapAsync(toppingController.getAll));
toppingRoutes.post('/', wrapAsync(toppingController.create));

toppingRoutes.post(
    '/:toppingId/applicable-to',
    wrapAsync(toppingController.addDish)
);
toppingRoutes.delete(
    '/:toppingId/applicable-to/:dishId',
    wrapAsync(toppingController.removeDish)
);

export default toppingRoutes;
