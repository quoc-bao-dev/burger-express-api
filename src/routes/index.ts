import { Router } from 'express';
import authenRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import comboRoutes from './combo.routes';
import dishRoutes from './dish.routes';
import promotionRoutes from './promotion.routes';
import subCategoryRoutes from './subCategory.routes';
import toppingRoutes from './topping.routes';
import testRoutes from './test.routes';

const Routes = Router();

Routes.use('/auth', authenRoutes);
Routes.use('/category', categoryRoutes);
Routes.use('/sub-category', subCategoryRoutes);
Routes.use('/dish', dishRoutes);
Routes.use('/topping', toppingRoutes);
Routes.use('/combo', comboRoutes);
Routes.use('/promotion', promotionRoutes);

Routes.use('/test', testRoutes);

export default Routes;
