import { Router } from 'express';
import categoryController from '../controllers/category.controller';
import wrapAsync from '../middlewares/requestHandler';

const categoryRoutes = Router();

categoryRoutes.get('/', wrapAsync(categoryController.getAll));
categoryRoutes.post('/', wrapAsync(categoryController.create));
categoryRoutes.patch('/:id', wrapAsync(categoryController.update));
categoryRoutes.delete('/:id', wrapAsync(categoryController.delete));

export default categoryRoutes;
