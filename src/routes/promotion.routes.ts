import { Router } from 'express';
import promotionController from '../controllers/promotion.controller';
import wrapAsync from '../middlewares/requestHandler';
const promotionRoutes = Router();

promotionRoutes.post('/', wrapAsync(promotionController.create));

export default promotionRoutes;
