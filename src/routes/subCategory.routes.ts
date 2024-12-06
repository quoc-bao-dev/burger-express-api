import { Router } from 'express';
import subCategoryController from '../controllers/subCategory.controller';
import wrapAsync from '../middlewares/requestHandler';

const subCategoryRoutes = Router();

subCategoryRoutes.get('/', wrapAsync(subCategoryController.getAll));
subCategoryRoutes.post('/', wrapAsync(subCategoryController.create));
subCategoryRoutes.patch('/:id', wrapAsync(subCategoryController.update));
subCategoryRoutes.delete('/:id', wrapAsync(subCategoryController.delete));

export default subCategoryRoutes;
