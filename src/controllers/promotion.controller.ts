import { Request, Response } from 'express';
import ApiError from '../core/ApiError';
import {
    CreateDishPromotionInput,
    CreatePromotionInput,
} from '../models/interfaces/promotion.interface';
import PromotionService from '../services/promotion.service';
import { createResponse } from '../utils/response';

class PromotionController {
    async create(req: Request, res: Response) {
        const {
            type,
            name,
            timeEnd,
            timeStart,
            typeDiscount,
            description,
            discountPercentage,
            discountValue,
        }: CreatePromotionInput = req.body;
        const { targetDishs }: CreateDishPromotionInput = req.body;

        if (!type) {
            throw ApiError.badRequest('Type is require!');
        }

        let result: any = null;
        if (type === 'dish') {
            const promotion = await PromotionService.createDishPromotion({
                type,
                name,
                timeEnd,
                timeStart,
                typeDiscount,
                description,
                discountValue,
                discountPercentage,
                targetDishs,
            });

            result = promotion;
        }

        const respone = createResponse({
            statusCode: 201,
            message: 'Create promotion for dish successfuly!',
            data: result,
        });

        res.status(respone.statusCode).json(respone);
    }
}

export default new PromotionController();
