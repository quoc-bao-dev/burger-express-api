import {
    CreateComboPromotionInput,
    CreateDishPromotionInput,
    CreatePromotionInput,
} from '../models/interfaces/promotion.interface';

import Dish from '../models/dish.schema';
import Promotion from '../models/promotion.schema';
import ApiError from '../core/ApiError';

const PromotionService = {
    createDishPromotion: async (payload: CreateDishPromotionInput) => {
        if (payload.typeDiscount === 'fixed' && !payload.discountValue) {
            throw ApiError.badRequest('Not have discount value in type fixed');
        }

        if (
            payload.typeDiscount === 'percentage' &&
            !payload.discountPercentage
        ) {
            throw ApiError.badRequest(
                'Not have discount percent in type percentage'
            );
        }

        if (payload.targetDishs?.length === 0 || !payload.targetDishs) {
            throw ApiError.badRequest('Not have dish in promotion!');
        }

        if (payload.typeDiscount === 'fixed') {
            delete payload.discountPercentage;
        }

        if (payload.typeDiscount === 'percentage') {
            delete payload.discountValue;
        }

        const { targetDishs, ...promotionInput } = payload;

        const promotion = await Promotion.create(promotionInput);

        if (payload.targetDishs) {
            await Promise.all(
                payload.targetDishs.map(async (_item) => {
                    const findDish = await Dish.findById(_item);

                    if (!findDish) {
                        return;
                    }

                    promotion.targetDishs = [
                        ...(promotion.targetDishs || []),
                        findDish.id,
                    ];

                    if (!findDish.promotion) {
                        findDish.promotion = promotion.id;
                    }

                    findDish.listPromotion = [
                        ...(findDish.listPromotion || []),
                        promotion.id,
                    ];
                    await findDish.save();
                })
            );
        }

        await promotion.save();

        return promotion;
    },
};

export default PromotionService;
